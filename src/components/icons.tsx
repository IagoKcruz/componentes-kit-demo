function iconProps() {
  return {
    xmlns: "http://www.w3.org/2000/svg" as const,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5 shrink-0",
    "aria-hidden": true,
  };
}

export function Page1Icon() {
  return (
    <svg {...iconProps()}>
      <path d="m21 8-9-5-9 5 9 5 9-5Z" />
      <path d="M3 8v8l9 5 9-5V8M12 13v8" />
    </svg>
  );
}

export function Page2Icon() {
  return (
    <svg {...iconProps()}>
      <path d="M9 11h6M9 15h6M9 7h6" />
      <rect x="5" y="3" width="14" height="18" rx="2" />
    </svg>
  );
}

export function Page3Icon() {
  return (
    <svg {...iconProps()}>
      <path d="M3 3v18h18" />
      <path d="M18 17V9M13 17v-5M8 17v-3" />
    </svg>
  );
}
