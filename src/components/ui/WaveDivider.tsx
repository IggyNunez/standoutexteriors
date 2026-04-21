// Wave divider, animated SVG waves between sections
export function WaveBottom({ fill = "#ffffff", className = "" }: { fill?: string; className?: string }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 pointer-events-none z-10 ${className}`}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" style={{ display: "block", marginBottom: "-1px" }}>
        <path d="M0,30 C360,55 720,5 1080,30 C1260,42 1380,15 1440,25 L1440,60 L0,60 Z" fill={fill} />
      </svg>
    </div>
  );
}

export function WaveTop({ fill = "#ffffff", className = "" }: { fill?: string; className?: string }) {
  return (
    <div className={`absolute top-0 left-0 right-0 pointer-events-none z-10 ${className}`}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" style={{ display: "block", marginTop: "-1px" }}>
        <path d="M0,35 C360,10 720,55 1080,30 C1260,18 1380,45 1440,35 L1440,0 L0,0 Z" fill={fill} />
      </svg>
    </div>
  );
}
