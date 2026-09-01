import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { getPortfolioData } from '@/lib/portfolioData';

const SYSTEM_PROMPT = `Anda adalah asisten AI resmi untuk portofolio Akhmad Febriyo Febriyansyah (Febrio).
Tugas Anda adalah menjawab pertanyaan pengunjung website mengenai latar belakang, keahlian, pengalaman kerja, proyek, layanan, serta kontak Akhmad Febriyo berdasarkan data portofolio di bawah ini.

Petunjuk respon:
1. Jawablah dengan ramah, profesional, ringkas, dan jelas menggunakan bahasa yang sama dengan pengguna (bahasa Indonesia atau bahasa Inggris).
2. Gunakan informasi yang ada pada [PORTFOLIO_DATA].
3. Jika pengguna menanyakan hal di luar konteks portofolio atau informasi tidak tersedia di data, jelaskan dengan sopan bahwa Anda adalah asisten portofolio Febriyo, dan arahkan mereka untuk menghubungi Febriyo langsung melalui email (fahirfebrio18@gmail.com) atau WhatsApp (+6285896192273).
4. ATURAN FORMAT PENTING: DILARANG menggunakan tanda bintang ganda (**) ataupun teks tebal (bold). Jangan gunakan format **teks**. Tulis seluruh teks secara biasa/polos tanpa tanda **.
5. Gunakan poin-poin sederhana dengan tanda "-" pada awal baris untuk daftar, jangan meletakkan tanda bullet sendirian di satu baris.`;

export async function POST(req: Request) {
  const apiKey =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    '';

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: 'Gemini API Key tidak ditemukan. Pastikan GOOGLE_GENERATIVE_AI_API_KEY atau GEMINI_API_KEY telah disetel pada Environment Variables Vercel atau .env.local.',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  try {
    const body = await req.json();
    messages = body.messages;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Format pesan tidak valid' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch {
    return new Response(
      JSON.stringify({ error: 'Request body tidak valid' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const google = createGoogleGenerativeAI({ apiKey });
  const portfolioInformation = getPortfolioData();
  const fullSystemPrompt = `${SYSTEM_PROMPT}\n\n[PORTFOLIO_DATA]\n${portfolioInformation}\n[END_PORTFOLIO_DATA]`;

  const modelsToTry = [
    process.env.GEMINI_MODEL || 'gemini-flash-lite-latest',
    'gemini-flash-latest',
    'gemini-2.5-flash',
  ];

  let replyText = '';
  let lastErrorMessage = '';

  for (const modelName of modelsToTry) {
    try {
      const result = await generateText({
        model: google(modelName),
        system: fullSystemPrompt,
        messages,
        maxRetries: 0,
      });

      if (result.text && result.text.trim()) {
        replyText = result.text;
        break;
      }
    } catch (error) {
      const err = error as Error;
      console.warn(`[Chat] Model ${modelName} error:`, err.message);
      lastErrorMessage = err.message || '';
    }
  }

  if (replyText) {
    // Strip any double asterisks (**) completely as requested
    const cleanReply = replyText.replace(/\*\*/g, '').trim();

    return new Response(
      JSON.stringify({ reply: cleanReply }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const isQuota =
    lastErrorMessage.includes('quota') ||
    lastErrorMessage.includes('429') ||
    lastErrorMessage.includes('RESOURCE_EXHAUSTED');

  const errorMessage = isQuota
    ? 'Asisten AI saat ini sedang mencapai batas kuota API harian. Silakan hubungi Febrio secara langsung via WhatsApp (+6285896192273) atau Email (fahirfebrio18@gmail.com).'
    : 'Maaf, asisten AI sedang mengalami kendala teknis. Silakan coba lagi beberapa saat lagi.';

  return new Response(
    JSON.stringify({ error: errorMessage, details: lastErrorMessage }),
    {
      status: isQuota ? 429 : 500,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
