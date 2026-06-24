export function StarfieldBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-black"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 15%, rgba(16, 94, 70, 0.12), transparent 28%),
          radial-gradient(circle at 80% 10%, rgba(30, 58, 95, 0.1), transparent 24%),
          radial-gradient(circle at 68% 42%, rgba(16, 185, 129, 0.06), transparent 38%),
          radial-gradient(1px 1px at 25% 25%, rgba(255, 255, 255, 0.45), transparent),
          radial-gradient(1px 1px at 75% 40%, rgba(255, 255, 255, 0.35), transparent),
          radial-gradient(1px 1px at 50% 80%, rgba(255, 255, 255, 0.3), transparent),
          linear-gradient(180deg, #010409 0%, #000000 100%)
        `,
        backgroundSize:
          "100% 100%, 100% 100%, 100% 100%, 240px 240px, 240px 240px, 240px 240px, 100% 100%",
        backgroundRepeat:
          "no-repeat, no-repeat, no-repeat, repeat, repeat, repeat, no-repeat",
      }}
    />
  );
}
