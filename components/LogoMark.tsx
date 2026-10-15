/** Terracotta badge with a roof ridge over a course of tile ends. */
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-[#C84B11] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_4px_12px_-4px_rgba(200,75,17,0.6)] ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] text-white" fill="none">
        <path d="M2.5 12.5 12 4.5l9.5 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M6 15.5a2 2 0 0 0 4 0M10 15.5a2 2 0 0 0 4 0M14 15.5a2 2 0 0 0 4 0"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
