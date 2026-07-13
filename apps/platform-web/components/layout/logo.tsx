type CharityQueryLogoProps = {
  className?: string;
  showText?: boolean;
  charityColor?: string;
};

export function CharityQueryLogo({
  className,
  showText = true,
  charityColor = "#3C3C43"
}: CharityQueryLogoProps) {
  return (
    <svg
      viewBox={showText ? "0 0 560 120" : "0 0 120 120"}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="CharityQuery logo"
      className={className}
      fill={charityColor}
    >
      <defs>
        <linearGradient id="cq-heart" x1="18" y1="18" x2="94" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFB02E" />
          <stop offset="55%" stopColor="#FF7A1A" />
          <stop offset="100%" stopColor="#F04D23" />
        </linearGradient>

        <linearGradient id="cq-query" x1="350" y1="30" x2="520" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F28A1A" />
          <stop offset="100%" stopColor="#F05A22" />
        </linearGradient>

        <linearGradient id="cq-lens-core" x1="44" y1="40" x2="72" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE8AE" />
          <stop offset="100%" stopColor="#FFC24B" />
        </linearGradient>
      </defs>

      {/* Icon */}
      <g transform="translate(8 10)">
        {/* Heart */}
        <path
          d="M60.4 92.2c-2.5 0-4.8-.9-6.8-2.7C33.8 72.1 22 58.8 16.5 47.9c-6.2-12.4-4.1-26.8 5.3-35.8 8.8-8.5 23-8.8 32.2-.6L60 17.1l6-5.6c9.2-8.2 23.4-7.9 32.2.6 9.4 9 11.5 23.4 5.3 35.8-5.5 10.9-17.3 24.2-37.1 41.6-2 1.8-4.3 2.7-6.8 2.7Z"
          fill="url(#cq-heart)"
        />

        {/* Magnifying glass */}
        <g transform="translate(36 38)">
          <circle cx="24" cy="24" r="21" fill="white" fillOpacity="0.92" />
          <circle cx="24" cy="24" r="15" fill="url(#cq-lens-core)" fillOpacity="0.95" />
          <circle cx="24" cy="24" r="21" stroke="white" strokeWidth="5" />
          <path
            d="M39.5 39.5 53 53"
            stroke="url(#cq-heart)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* sparkle */}
          <path
            d="M24 14.5c1 4.1 2.4 5.5 6.5 6.5-4.1 1-5.5 2.4-6.5 6.5-1-4.1-2.4-5.5-6.5-6.5 4.1-1 5.5-2.4 6.5-6.5Z"
            fill="#F28A1A"
          />
        </g>
      </g>

      {showText && (
        <g>
          {/* Charity */}
          <text
            x="135"
            y="78"
            fontSize="56"
            fontWeight="700"
            letterSpacing="-0.04em"
            fill="#666666"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Helvetica Neue", sans-serif',
            }}
          >
            Charity
          </text>

          {/* Query */}
          <text
            x="330"
            y="78"
            fontSize="56"
            fontWeight="700"
            letterSpacing="-0.04em"
            fill="url(#cq-query)"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Helvetica Neue", sans-serif',
            }}
          >
            Query
          </text>
        </g>
      )}
    </svg>
  );
}