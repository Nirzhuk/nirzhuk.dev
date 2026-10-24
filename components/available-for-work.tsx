const AvailableForWork = () => {
  return (
    <a
      href="mailto:me@nirzhuk.dev?subject=Work%20Opportunity%20Inquiry"
      className="inline-flex items-center gap-2 rounded-full border border-terminal/30 bg-terminal/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-terminal transition-colors hover:border-terminal/60 hover:bg-terminal/15"
    >
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-terminal opacity-70" />
        <span className="relative inline-flex size-1.5 rounded-full bg-terminal" />
      </span>
      available for work
    </a>
  );
};

export default AvailableForWork;
