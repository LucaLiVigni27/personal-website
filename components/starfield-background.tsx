export function StarfieldBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-black"
      style={{
        backgroundImage: `
          radial-gradient(circle at 72% 54%, rgba(16, 185, 129, 0.09), transparent 42%),
          radial-gradient(circle at 86% 80%, rgba(16, 185, 129, 0.05), transparent 36%),
          radial-gradient(1px 1px at 10% 15%, rgba(255, 255, 255, 0.55), transparent),
          radial-gradient(1px 1px at 25% 55%, rgba(255, 255, 255, 0.35), transparent),
          radial-gradient(1px 1px at 48% 28%, rgba(255, 255, 255, 0.4), transparent),
          radial-gradient(1px 1px at 62% 68%, rgba(255, 255, 255, 0.32), transparent),
          radial-gradient(1px 1px at 78% 38%, rgba(255, 255, 255, 0.38), transparent),
          radial-gradient(1px 1px at 88% 72%, rgba(255, 255, 255, 0.3), transparent),
          linear-gradient(180deg, #010101 0%, #000000 100%)
        `,
        backgroundSize:
          "100% 100%, 100% 100%, 280px 280px, 280px 280px, 280px 280px, 280px 280px, 280px 280px, 280px 280px, 100% 100%",
        backgroundRepeat:
          "no-repeat, no-repeat, repeat, repeat, repeat, repeat, repeat, repeat, no-repeat",
      }}
    />
  );
}
