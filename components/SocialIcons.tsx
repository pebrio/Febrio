type IconProps = {
  className?: string;
};

export function GithubIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 .5C5.373.5.5 5.373.5 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.725-4.033-1.415-4.033-1.415-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.419-1.305.763-1.604-2.665-.303-5.466-1.333-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.48 11.48 0 0 1 3.003-.404c1.018.004 2.044.138 3.003.404 2.292-1.552 3.299-1.23 3.299-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.625-5.475 5.921.43.371.815 1.103.815 2.222v3.293c0 .319.192.694.801.576C20.565 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12Z"
      />
    </svg>
  );
}

export function LinkedinIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.2 10.3V16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="8.2" cy="8.1" r="1" fill="currentColor" />
      <path
        d="M11.8 16v-3.1c0-1.3.8-2.2 2-2.2s1.8.8 1.8 2V16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.8 12V16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.7" cy="7.3" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 4.5c-4.1 0-7.5 3.2-7.5 7.2 0 1.4.4 2.7 1.1 3.9L5 20l4.5-1.2c.8.3 1.7.4 2.5.4 4.1 0 7.5-3.2 7.5-7.2S16.1 4.5 12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 9.3c.2-.4.4-.5.8-.5h.6c.2 0 .4.1.5.4l.7 1.8c.1.3.1.5-.1.7l-.5.5c-.1.1-.1.3 0 .5.4.8 1.1 1.5 1.9 1.9.2.1.4.1.5 0l.6-.5c.2-.2.4-.2.7-.1l1.8.7c.3.1.4.3.4.5v.6c0 .4-.1.6-.5.8-.5.3-1.2.4-1.9.2-1.6-.4-3.4-1.5-4.9-3.1s-2.7-3.3-3.1-4.9c-.2-.7-.1-1.4.2-1.9Z"
        fill="currentColor"
      />
    </svg>
  );
}
