export function NetworkLines() {
  return (
    <svg className="about-network-lines" viewBox="0 0 1200 720" preserveAspectRatio="none" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M-30 160 210 80 430 210 650 90 880 240 1230 120" />
        <path d="M-30 500 180 390 390 570 610 410 840 560 1230 430" />
        <path d="M210 80 180 390M430 210 390 570M650 90 610 410M880 240 840 560" />
        <path d="M180 390 430 210 610 410 880 240" />
        <path d="M390 570 650 90M610 410 1230 120M840 560 1230 430" />
      </g>
      <g fill="currentColor">
        <circle cx="210" cy="80" r="2" /><circle cx="430" cy="210" r="2" /><circle cx="650" cy="90" r="2" /><circle cx="880" cy="240" r="2" />
        <circle cx="180" cy="390" r="2" /><circle cx="390" cy="570" r="2" /><circle cx="610" cy="410" r="2" /><circle cx="840" cy="560" r="2" />
      </g>
      <g fill="var(--color-accent)">
        <rect x="427" y="207" width="6" height="6" /><rect x="647" y="87" width="6" height="6" /><rect x="837" y="557" width="6" height="6" />
      </g>
    </svg>
  );
}
