export default function FooterStatus() {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white">
        Current Status
      </h3>
      <div className="status-pulse mt-5 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-200">
        <span className="h-2.5 w-2.5 rounded-full bg-orange-400 shadow-[0_0_0_4px_rgba(249,115,22,0.12)]" />
        Available for work
      </div>
      {/* <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
        I am open to website, dashboard, and other digital solution projects.
        Please reach out if you would like to discuss an opportunity.
      </p> */}
    </div>
  );
}
