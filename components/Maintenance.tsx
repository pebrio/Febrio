"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "./SocialIcons";

const COUNTDOWN_KEY = "febrio-maintenance-end";
const COUNTDOWN_DURATION = 365 * 24 * 60 * 60 * 1000;

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const emptyCountdown: Countdown = { days: 365, hours: 0, minutes: 0, seconds: 0 };

function getCountdown(endTime: number): Countdown {
  const remaining = Math.max(0, endTime - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function formatValue(value: number): string {
  return value.toString().padStart(2, "0");
}

export default function Maintenance() {
  const [countdown, setCountdown] = useState<Countdown>(emptyCountdown);

  useEffect(() => {
    const storedEndTime = Number(window.localStorage.getItem(COUNTDOWN_KEY));
    const endTime = storedEndTime > Date.now() ? storedEndTime : Date.now() + COUNTDOWN_DURATION;

    window.localStorage.setItem(COUNTDOWN_KEY, endTime.toString());
    setCountdown(getCountdown(endTime));

    const timer = window.setInterval(() => {
      setCountdown(getCountdown(endTime));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const countdownItems = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "clamp(24px, 5vw, 64px) clamp(16px, 5vw, 72px)",
        background:
          "radial-gradient(circle at top, rgba(245, 158, 11, 0.14), transparent 38%), #050505",
        color: "#ffffff",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <section
        style={{
          width: "min(100%, 1040px)",
          minHeight: "min(680px, calc(100vh - 48px))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          padding: "clamp(36px, 7vw, 96px) clamp(20px, 8vw, 120px)",
          boxSizing: "border-box",
          border: "1px solid rgba(245, 158, 11, 0.25)",
          borderRadius: "24px",
          background: "rgba(255, 255, 255, 0.045)",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.35)",
        }}
      >
        <p
          style={{
            margin: "0 0 12px",
            color: "#f59e0b",
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          Maintenance Mode Lekku
        </p>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(32px, 7vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "0",
          }}
        >
          We&apos;ll be right back
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "clamp(8px, 2.5vw, 28px)",
            margin: "clamp(28px, 5vw, 56px) auto 0",
            width: "100%",
          }}
        >
          {countdownItems.map((item) => (
            <div key={item.label}>
              <div
                style={{
                  padding: "clamp(16px, 3vw, 32px) 8px",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  borderRadius: "14px",
                  background: "rgba(0, 0, 0, 0.28)",
                  color: "#ffffff",
                  fontSize: "clamp(24px, 5vw, 64px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {item.label === "Days" ? item.value : formatValue(item.value)}
              </div>
              <p
                style={{
                  margin: "10px 0 0",
                  color: "rgba(255, 255, 255, 0.55)",
                  fontSize: "clamp(9px, 1.2vw, 13px)",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            width: "min(100%, 720px)",
            margin: "clamp(24px, 4vw, 42px) auto 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              marginBottom: "10px",
              color: "rgba(255, 255, 255, 0.68)",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            <span>System update in progress</span>
            <span style={{ color: "#f59e0b" }}>Updating...</span>
          </div>
          <div
            aria-label="System update progress"
            role="progressbar"
            style={{
              position: "relative",
              height: "15px",
              overflow: "hidden",
              border: "1px solid rgba(245, 158, 11, 0.35)",
              borderRadius: "999px",
              background: "rgba(0, 0, 0, 0.45)",
              boxShadow: "inset 0 0 12px rgba(0, 0, 0, 0.35)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "1px auto 1px 1px",
                width: "42%",
                borderRadius: "999px",
                background: "linear-gradient(90deg, #b45309, #f59e0b, #fde68a)",
                boxShadow: "0 0 18px rgba(245, 158, 11, 0.55)",
                animation: "maintenance-progress 2.4s ease-in-out infinite",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "34%",
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.7), transparent)",
                transform: "translateX(-140%) skewX(-18deg)",
                animation: "maintenance-shimmer 1.8s linear infinite",
              }}
            />
          </div>
        </div>
        <p
          style={{
            maxWidth: "440px",
            margin: "20px auto 0",
            color: "rgba(255, 255, 255, 0.68)",
            fontSize: "16px",
            lineHeight: 1.8,
          }}
        >
          We are improving the system for a more efficient workflow. Thank you
          for your patience while we make things better.
        </p>
        <p
          style={{
            margin: "28px auto 0",
            color: "rgba(255, 255, 255, 0.68)",
            fontSize: "14px",
            lineHeight: 1.7,
          }}
        >
          If your request is urgent, please contact me through the social media below:
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "18px",
          }}
        >
          <a
            href="https://www.instagram.com/adapebri_/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            style={socialLinkStyle}
          >
            <InstagramIcon className="h-5 w-5" />
            Instagram
          </a>
          <a
            href="https://wa.me/6285896192273"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            style={socialLinkStyle}
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
          <a
            href="mailto:fahirfebrio18@gmail.com"
            aria-label="Email"
            style={socialLinkStyle}
          >
            <Mail size={19} aria-hidden="true" />
            Email
          </a>
        </div>
      </section>
      <style>{`
        @keyframes maintenance-progress {
          0% { transform: translateX(-105%); }
          50% { transform: translateX(125%); }
          100% { transform: translateX(250%); }
        }

        @keyframes maintenance-shimmer {
          0% { transform: translateX(-140%) skewX(-18deg); }
          100% { transform: translateX(420%) skewX(-18deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          [role="progressbar"] > div { animation: none !important; }
        }
      `}</style>
    </main>
  );
}

const socialLinkStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 14px",
  border: "1px solid rgba(245, 158, 11, 0.3)",
  borderRadius: "999px",
  background: "rgba(245, 158, 11, 0.08)",
  color: "#fbbf24",
  fontSize: "13px",
  fontWeight: 600,
  textDecoration: "none",
};
