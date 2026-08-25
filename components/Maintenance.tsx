export default function Maintenance() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px 20px",
        background:
          "radial-gradient(circle at top, rgba(245, 158, 11, 0.14), transparent 38%), #050505",
        color: "#ffffff",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <section
        style={{
          width: "min(100%, 620px)",
          textAlign: "center",
          padding: "clamp(32px, 8vw, 72px) clamp(24px, 6vw, 56px)",
          border: "1px solid rgba(245, 158, 11, 0.25)",
          borderRadius: "24px",
          background: "rgba(255, 255, 255, 0.045)",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: "64px",
            height: "64px",
            display: "grid",
            placeItems: "center",
            margin: "0 auto 24px",
            border: "1px solid rgba(245, 158, 11, 0.45)",
            borderRadius: "50%",
            color: "#f59e0b",
            fontSize: "28px",
          }}
        >
          \u2699
        </div>
        <p
          style={{
            margin: "0 0 12px",
            color: "#f59e0b",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          Maintenance Mode
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
      </section>
    </main>
  );
}
