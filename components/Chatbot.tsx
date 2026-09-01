'use client';

import { useRef, useEffect, useState } from 'react';
import {
  IoChatbubbleEllipsesOutline,
  IoCloseOutline,
  IoSend,
  IoSparklesOutline,
  IoRefreshOutline,
} from 'react-icons/io5';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_SUGGESTIONS = [
  'Apa keahlian utama Febrio?',
  'Ceritakan tentang proyek IoT',
  'Pengalaman kerja Febrio',
  'Bagaimana cara menghubungi Febrio?',
];

function parseInlineFormatting(text: string): React.ReactNode[] {
  // Strip any remaining ** markers
  const cleanText = text.replace(/\*\*/g, '');

  // Matches markdown links [Text](url), raw URLs, or email addresses
  const regex = /(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s)]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const parts = cleanText.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Markdown link: [Label](url)
    const mdLinkMatch = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (mdLinkMatch) {
      const [, label, href] = mdLinkMatch;
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 underline hover:text-amber-300 break-all font-medium inline-block"
        >
          {label}
        </a>
      );
    }

    if (part.startsWith('http://') || part.startsWith('https://')) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 underline hover:text-amber-300 break-all font-medium inline-block"
        >
          {part}
        </a>
      );
    }
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
      return (
        <a
          key={index}
          href={`mailto:${part}`}
          className="text-amber-400 underline hover:text-amber-300 break-all font-medium inline-block"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

function FormattedContent({ text, isUser }: { text: string; isUser: boolean }) {
  if (isUser) {
    return <span>{text}</span>;
  }

  // Pre-process text to remove duplicate standalone bullets on preceding lines
  const lines = text
    .split('\n')
    .filter((line, idx, arr) => {
      // If this line is just a lonely bullet symbol and the next line has text, skip the standalone bullet
      const trimmed = line.trim();
      if ((trimmed === '•' || trimmed === '*' || trimmed === '-') && arr[idx + 1] && arr[idx + 1].trim()) {
        return false;
      }
      return true;
    });

  return (
    <div className="space-y-1.5 text-neutral-200">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (trimmed === '') {
          return <div key={lineIdx} className="h-1" />;
        }

        // Headings: ### ## #
        const h3Match = line.match(/^###\s*(.+)/);
        const h2Match = line.match(/^##\s*(.+)/);
        const h1Match = line.match(/^#\s*(.+)/);

        if (h3Match) {
          return (
            <div key={lineIdx} className="text-amber-400 text-xs mt-2 mb-0.5 tracking-wide">
              {parseInlineFormatting(h3Match[1])}
            </div>
          );
        }
        if (h2Match) {
          return (
            <div key={lineIdx} className="text-neutral-100 text-sm mt-2 mb-0.5">
              {parseInlineFormatting(h2Match[1])}
            </div>
          );
        }
        if (h1Match) {
          return (
            <div key={lineIdx} className="text-neutral-100 text-sm mt-2 mb-1">
              {parseInlineFormatting(h1Match[1])}
            </div>
          );
        }

        const isBullet = /^[•*-]\s*(.+)/.test(line);
        const isNumbered = /^\d+\.\s*(.+)/.test(line);

        if (isBullet) {
          const bulletContent = line.replace(/^[•*-]\s*/, '');
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-1">
              <span className="text-amber-400 text-xs mt-0.5">•</span>
              <div className="flex-1">{parseInlineFormatting(bulletContent)}</div>
            </div>
          );
        }

        if (isNumbered) {
          const numMatch = line.match(/^(\d+)\.\s*(.+)/);
          const num = numMatch ? numMatch[1] : '1';
          const content = numMatch ? numMatch[2] : line;
          return (
            <div key={lineIdx} className="flex items-start gap-1.5 pl-1">
              <span className="text-amber-400 text-xs mt-0.5">{num}.</span>
              <div className="flex-1">{parseInlineFormatting(content)}</div>
            </div>
          );
        }

        return <div key={lineIdx}>{parseInlineFormatting(line)}</div>;
      })}
    </div>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleResetChat = () => {
    setMessages([]);
    setInput('');
  };

  const sendMessage = async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || isLoading) return;

    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
      const apiUrl = `${basePath}/api/chat`;

      // Add temporary empty assistant message to show typing dots
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      const contentType = response.headers.get('content-type') || '';

      if (!response.ok) {
        let errDetail = 'Gagal menghubungi server AI. Silakan coba lagi.';
        try {
          const errJson = await response.json();
          if (errJson.error) errDetail = errJson.error;
        } catch {
          // ignore
        }
        throw new Error(errDetail);
      }

      let assistantMessage = '';

      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        assistantMessage = data.reply || '';
        
        setMessages((prev) => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = {
              role: 'assistant',
              content: assistantMessage,
            };
          }
          return updated;
        });
      } else {
        // Handle stream response
        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response stream');

        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          assistantMessage += chunk;

          setMessages((prev) => {
            const updated = [...prev];
            if (updated.length > 0) {
              updated[updated.length - 1] = {
                role: 'assistant',
                content: assistantMessage,
              };
            }
            return updated;
          });
        }
      }

      if (!assistantMessage.trim()) {
        throw new Error('Tidak ada respon yang diterima dari server AI. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Maaf, terjadi kesalahan pada asisten AI. Silakan coba lagi nanti.';

      setMessages((prev) => {
        // If last message was empty assistant message, replace it
        if (prev.length > 0 && prev[prev.length - 1].role === 'assistant' && !prev[prev.length - 1].content) {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: errorMessage };
          return updated;
        }
        return [...prev, { role: 'assistant', content: errorMessage }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={chatWindowRef}>
      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Tutup Chat' : 'Buka Asisten AI Portfolio'}
        className="relative group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full p-4 shadow-xl shadow-amber-500/25 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400"></span>
        </span>
        {isOpen ? (
          <IoCloseOutline className="w-6 h-6 text-black" />
        ) : (
          <IoChatbubbleEllipsesOutline className="w-6 h-6 text-black" />
        )}
      </button>

      {/* Chat Pop-up Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[90vw] max-w-[380px] h-[530px] max-h-[80vh] flex flex-col bg-neutral-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500/20 via-neutral-900 to-neutral-900 border-b border-white/10 p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <IoSparklesOutline className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  Febrio AI Assistant
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h2>
                <p className="text-[11px] text-neutral-400">Portfolio Knowledge Base</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={handleResetChat}
                  className="text-neutral-400 hover:text-amber-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  title="Mulai Percakapan Baru"
                  aria-label="Reset Chat"
                >
                  <IoRefreshOutline className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Tutup"
              >
                <IoCloseOutline className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-2 py-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                  <IoSparklesOutline className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">Halo! Saya Asisten AI Febrio</h3>
                <p className="text-xs text-neutral-400 mb-4 max-w-xs leading-relaxed">
                  Tanyakan apapun seputar keahlian, proyek IoT, pengalaman kerja, atau kontak Febrio.
                </p>

                {/* Quick suggestions */}
                <div className="w-full space-y-2 text-left">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-amber-400/80 px-1">
                    Saran Pertanyaan:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {QUICK_SUGGESTIONS.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(suggestion)}
                        className="text-xs text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 border border-white/5 hover:border-amber-500/30 rounded-xl px-3 py-2 text-left transition-all duration-200"
                      >
                        💡 {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-amber-500 text-black font-medium rounded-br-none shadow-md shadow-amber-500/10'
                      : 'bg-neutral-800/90 text-neutral-100 border border-white/10 rounded-bl-none shadow-sm'
                  }`}
                >
                  {message.content ? (
                    <FormattedContent text={message.content} isUser={message.role === 'user'} />
                  ) : (
                    <span className="inline-flex items-center gap-1.5 py-1 text-neutral-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="bg-neutral-800/90 border border-white/10 px-3.5 py-2.5 rounded-2xl rounded-bl-none">
                  <div className="flex items-center space-x-1.5 py-1">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="border-t border-white/10 p-3 bg-neutral-950/80">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pertanyaan tentang Febrio..."
                disabled={isLoading}
                className="flex-1 bg-neutral-900 border border-white/10 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Kirim"
                className="p-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 disabled:bg-neutral-800 disabled:text-neutral-600 disabled:cursor-not-allowed text-black rounded-xl font-medium transition-all"
              >
                <IoSend className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
