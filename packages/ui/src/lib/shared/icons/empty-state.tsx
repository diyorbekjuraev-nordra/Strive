"use client";
import { useTheme } from "next-themes";

const sizeMap = {
  sm: {
    width: "242",
    height: "220",
  },
  md: {
    width: "342",
    height: "320",
  },
  lg: {
    width: "442",
    height: "420",
  },
};

type TEmptyStateProps = {
  size: "sm" | "md" | "lg";
};

export const EmptyStateSVG = ({ size = "md" }: TEmptyStateProps) => {
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  const { width, height } = sizeMap[size];

  return (
    <div>
      {!isDarkMode ? (
        <svg
          width={width}
          height={height}
          viewBox="0 0 342 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M106 18V302M38 18V302M242 18V302M310 18V302M174 18V302M0 52H342M0 95H342M0 138H342M0 181H342M0 224H342M0 266H342"
            stroke="url(#paint0_radial_507_105062)"
            strokeMiterlimit="10"
          ></path>
          <rect
            x="106"
            y="109.024"
            width="136"
            height="46.0238"
            rx="9"
            fill="#FFFFFF"
            stroke="#99A2AF"
            strokeWidth="0.75"
            strokeMiterlimit="10"
          ></rect>
          <rect
            opacity="0.4"
            x="111.479"
            y="114.503"
            width="125"
            height="35.0658"
            rx="6"
            stroke="#99A2AF"
            strokeWidth="0.75"
            strokeMiterlimit="10"
          ></rect>
          <rect
            opacity="0.1"
            x="118.054"
            y="121.078"
            width="21.9161"
            height="21.9161"
            rx="6"
            fill="#99A2AF"
          ></rect>
          <rect
            x="124.5"
            y="130.25"
            width="9"
            height="6.5"
            rx="2"
            stroke="#BCC3CE"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></rect>
          <path
            d="M127 129.75V128.75C127 127.645 127.895 126.75 129 126.75C130.105 126.75 131 127.645 131 128.75V129.75"
            stroke="#BCC3CE"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <rect
            opacity="0.2"
            x="145.449"
            y="123.269"
            width="44.928"
            height="5.47903"
            rx="2.73951"
            fill="#99A2AF"
          ></rect>
          <rect
            opacity="0.2"
            x="145.449"
            y="135.323"
            width="77.8022"
            height="5.47903"
            rx="2.73951"
            fill="#99A2AF"
          ></rect>
          <rect
            x="106"
            y="164"
            width="136"
            height="46.0238"
            rx="9"
            fill="#FFFFFF"
          ></rect>
          <g opacity="0.6">
            <rect
              x="106"
              y="164"
              width="136"
              height="46.0238"
              rx="9"
              fill="#FFFFFF"
              stroke="#99A2AF"
              strokeWidth="0.75"
              strokeMiterlimit="10"
            ></rect>
            <rect
              opacity="0.4"
              x="111.479"
              y="169.479"
              width="125"
              height="35.0658"
              rx="6"
              stroke="#99A2AF"
              strokeWidth="0.75"
              strokeMiterlimit="10"
            ></rect>
            <rect
              opacity="0.1"
              x="118.054"
              y="176.054"
              width="21.9161"
              height="21.9161"
              rx="6"
              fill="#99A2AF"
            ></rect>
            <rect
              x="124.5"
              y="185.25"
              width="9"
              height="6.5"
              rx="2"
              stroke="#BCC3CE"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></rect>
            <path
              d="M127 184.75V183.75C127 182.645 127.895 181.75 129 181.75C130.105 181.75 131 182.645 131 183.75V184.75"
              stroke="#BCC3CE"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <rect
              opacity="0.2"
              x="145.449"
              y="178.245"
              width="44.928"
              height="5.47903"
              rx="2.73951"
              fill="#99A2AF"
            ></rect>
            <rect
              opacity="0.2"
              x="145.449"
              y="190.299"
              width="77.8022"
              height="5.47903"
              rx="2.73951"
              fill="#99A2AF"
            ></rect>
          </g>
          <rect
            x="106"
            y="220"
            width="136"
            height="46.0238"
            rx="9"
            fill="#FFFFFF"
          ></rect>
          <g opacity="0.4">
            <rect
              x="106"
              y="220"
              width="136"
              height="46.0238"
              rx="9"
              fill="#FFFFFF"
              stroke="#99A2AF"
              strokeWidth="0.75"
              strokeMiterlimit="10"
            ></rect>
            <rect
              opacity="0.4"
              x="111.479"
              y="225.479"
              width="125"
              height="35.0658"
              rx="6"
              stroke="#99A2AF"
              strokeWidth="0.75"
              strokeMiterlimit="10"
            ></rect>
            <rect
              opacity="0.1"
              x="118.054"
              y="232.054"
              width="21.9161"
              height="21.9161"
              rx="6"
              fill="#99A2AF"
            ></rect>
            <rect
              x="124.5"
              y="241.25"
              width="9"
              height="6.5"
              rx="2"
              stroke="#BCC3CE"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></rect>
            <path
              d="M127 240.75V239.75C127 238.645 127.895 237.75 129 237.75C130.105 237.75 131 238.645 131 239.75V240.75"
              stroke="#BCC3CE"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <rect
              opacity="0.2"
              x="145.449"
              y="234.245"
              width="44.928"
              height="5.47903"
              rx="2.73951"
              fill="#99A2AF"
            ></rect>
            <rect
              opacity="0.2"
              x="145.449"
              y="246.299"
              width="77.8022"
              height="5.47903"
              rx="2.73951"
              fill="#99A2AF"
            ></rect>
          </g>
          <g filter="url(#filter0_dd_507_105062)">
            <path
              d="M106 67.4C106 62.3595 106 59.8393 106.981 57.9141C107.844 56.2206 109.221 54.8438 110.914 53.9809C112.839 53 115.36 53 120.4 53L230.8 53C234.72 53 236.681 53 238.178 53.763C239.495 54.4341 240.566 55.5049 241.237 56.8221C242 58.3194 242 60.2796 242 64.2V84.6238C242 89.6643 242 92.1845 241.019 94.1097C240.156 95.8032 238.779 97.18 237.086 98.0429C235.161 99.0238 232.64 99.0238 227.6 99.0238H120.4C115.36 99.0238 112.839 99.0238 110.914 98.0429C109.221 97.18 107.844 95.8032 106.981 94.1097C106 92.1845 106 89.6643 106 84.6238V67.4Z"
              fill="#FFFFFF"
            ></path>
            <path
              d="M106 67.4C106 62.3595 106 59.8393 106.981 57.9141C107.844 56.2206 109.221 54.8438 110.914 53.9809C112.839 53 115.36 53 120.4 53L230.8 53C234.72 53 236.681 53 238.178 53.763C239.495 54.4341 240.566 55.5049 241.237 56.8221C242 58.3194 242 60.2796 242 64.2V84.6238C242 89.6643 242 92.1845 241.019 94.1097C240.156 95.8032 238.779 97.18 237.086 98.0429C235.161 99.0238 232.64 99.0238 227.6 99.0238H120.4C115.36 99.0238 112.839 99.0238 110.914 98.0429C109.221 97.18 107.844 95.8032 106.981 94.1097C106 92.1845 106 89.6643 106 84.6238V67.4Z"
              stroke="#266DF0"
              strokeWidth="0.75"
            ></path>
          </g>
          <rect
            opacity="0.4"
            x="111.479"
            y="58.479"
            width="125"
            height="35.0658"
            rx="6"
            stroke="#266DF0"
            strokeWidth="0.75"
          ></rect>
          <rect
            x="118.054"
            y="65.054"
            width="21.9161"
            height="21.9161"
            rx="6"
            fill="#EBEFFE"
          ></rect>
          <rect
            x="145.449"
            y="67.2454"
            width="44.928"
            height="5.47903"
            rx="2.73951"
            fill="#EBEFFE"
          ></rect>
          <rect
            x="145.449"
            y="79.2993"
            width="77.8022"
            height="5.47903"
            rx="2.73951"
            fill="#EBEFFE"
          ></rect>
          <circle cx="242" cy="53" r="6" fill="#266DF0"></circle>
          <path
            d="M242.721 50.6364V55H241.931V51.4055H241.905L240.885 52.0575V51.3331L241.969 50.6364H242.721Z"
            fill="#FFFFFF"
          ></path>
          <rect
            x="124.5"
            y="74.25"
            width="9"
            height="6.5"
            rx="2"
            stroke="#0F6BE9"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></rect>
          <path
            d="M127 73.75V72.75C127 71.6454 127.895 70.75 129 70.75C130.105 70.75 131 71.6454 131 72.75V73.75"
            stroke="#0F6BE9"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <defs>
            <filter
              id="filter0_dd_507_105062"
              x="81.625"
              y="36.625"
              width="184.75"
              height="94.7739"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              ></feColorMatrix>
              <feOffset dy="8"></feOffset>
              <feGaussianBlur stdDeviation="12"></feGaussianBlur>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.14902 0 0 0 0 0.427451 0 0 0 0 0.941176 0 0 0 0.08 0"
              ></feColorMatrix>
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_507_105062"
              ></feBlend>
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              ></feColorMatrix>
              <feOffset dy="6"></feOffset>
              <feGaussianBlur stdDeviation="6"></feGaussianBlur>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.14902 0 0 0 0 0.427451 0 0 0 0 0.941176 0 0 0 0.12 0"
              ></feColorMatrix>
              <feBlend
                mode="normal"
                in2="effect1_dropShadow_507_105062"
                result="effect2_dropShadow_507_105062"
              ></feBlend>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect2_dropShadow_507_105062"
                result="shape"
              ></feBlend>
            </filter>
            <radialGradient
              id="paint0_radial_507_105062"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(171 160) rotate(90) scale(162 188.914)"
            >
              <stop stopColor="#BCC3CE"></stop>
              <stop offset="1" stopColor="#BCC3CE" stopOpacity="0"></stop>
            </radialGradient>
          </defs>
        </svg>
      ) : (
        <svg
          width={width}
          height={height}
          viewBox="0 0 342 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M106 18V302M38 18V302M242 18V302M310 18V302M174 18V302M0 52H342M0 95H342M0 138H342M0 181H342M0 224H342M0 266H342"
            stroke="url(#paint0_radial_507_105062)"
            strokeMiterlimit="10"
          ></path>
          <rect
            x="106"
            y="109.024"
            width="136"
            height="46.0238"
            rx="9"
            fill="#1A1D21"
            stroke="#505967"
            strokeWidth="0.75"
            strokeMiterlimit="10"
          ></rect>
          <rect
            opacity="0.4"
            x="111.479"
            y="114.503"
            width="125"
            height="35.0658"
            rx="6"
            stroke="#505967"
            strokeWidth="0.75"
            strokeMiterlimit="10"
          ></rect>
          <rect
            opacity="0.1"
            x="118.054"
            y="121.078"
            width="21.9161"
            height="21.9161"
            rx="6"
            fill="#505967"
          ></rect>
          <rect
            x="124.5"
            y="130.25"
            width="9"
            height="6.5"
            rx="2"
            stroke="#383E47"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></rect>
          <path
            d="M127 129.75V128.75C127 127.645 127.895 126.75 129 126.75C130.105 126.75 131 127.645 131 128.75V129.75"
            stroke="#383E47"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <rect
            opacity="0.2"
            x="145.449"
            y="123.269"
            width="44.928"
            height="5.47903"
            rx="2.73951"
            fill="#505967"
          ></rect>
          <rect
            opacity="0.2"
            x="145.449"
            y="135.323"
            width="77.8022"
            height="5.47903"
            rx="2.73951"
            fill="#505967"
          ></rect>
          <rect
            x="106"
            y="164"
            width="136"
            height="46.0238"
            rx="9"
            fill="#1A1D21"
          ></rect>
          <g opacity="0.6">
            <rect
              x="106"
              y="164"
              width="136"
              height="46.0238"
              rx="9"
              fill="#1A1D21"
              stroke="#505967"
              strokeWidth="0.75"
              strokeMiterlimit="10"
            ></rect>
            <rect
              opacity="0.4"
              x="111.479"
              y="169.479"
              width="125"
              height="35.0658"
              rx="6"
              stroke="#505967"
              strokeWidth="0.75"
              strokeMiterlimit="10"
            ></rect>
            <rect
              opacity="0.1"
              x="118.054"
              y="176.054"
              width="21.9161"
              height="21.9161"
              rx="6"
              fill="#505967"
            ></rect>
            <rect
              x="124.5"
              y="185.25"
              width="9"
              height="6.5"
              rx="2"
              stroke="#383E47"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></rect>
            <path
              d="M127 184.75V183.75C127 182.645 127.895 181.75 129 181.75C130.105 181.75 131 182.645 131 183.75V184.75"
              stroke="#383E47"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <rect
              opacity="0.2"
              x="145.449"
              y="178.245"
              width="44.928"
              height="5.47903"
              rx="2.73951"
              fill="#505967"
            ></rect>
            <rect
              opacity="0.2"
              x="145.449"
              y="190.299"
              width="77.8022"
              height="5.47903"
              rx="2.73951"
              fill="#505967"
            ></rect>
          </g>
          <rect
            x="106"
            y="220"
            width="136"
            height="46.0238"
            rx="9"
            fill="#1A1D21"
          ></rect>
          <g opacity="0.4">
            <rect
              x="106"
              y="220"
              width="136"
              height="46.0238"
              rx="9"
              fill="#1A1D21"
              stroke="#505967"
              strokeWidth="0.75"
              strokeMiterlimit="10"
            ></rect>
            <rect
              opacity="0.4"
              x="111.479"
              y="225.479"
              width="125"
              height="35.0658"
              rx="6"
              stroke="#505967"
              strokeWidth="0.75"
              strokeMiterlimit="10"
            ></rect>
            <rect
              opacity="0.1"
              x="118.054"
              y="232.054"
              width="21.9161"
              height="21.9161"
              rx="6"
              fill="#505967"
            ></rect>
            <rect
              x="124.5"
              y="241.25"
              width="9"
              height="6.5"
              rx="2"
              stroke="#383E47"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></rect>
            <path
              d="M127 240.75V239.75C127 238.645 127.895 237.75 129 237.75C130.105 237.75 131 238.645 131 239.75V240.75"
              stroke="#383E47"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <rect
              opacity="0.2"
              x="145.449"
              y="234.245"
              width="44.928"
              height="5.47903"
              rx="2.73951"
              fill="#505967"
            ></rect>
            <rect
              opacity="0.2"
              x="145.449"
              y="246.299"
              width="77.8022"
              height="5.47903"
              rx="2.73951"
              fill="#505967"
            ></rect>
          </g>
          <g filter="url(#filter0_dd_507_105062)">
            <path
              d="M106 67.4C106 62.3595 106 59.8393 106.981 57.9141C107.844 56.2206 109.221 54.8438 110.914 53.9809C112.839 53 115.36 53 120.4 53L230.8 53C234.72 53 236.681 53 238.178 53.763C239.495 54.4341 240.566 55.5049 241.237 56.8221C242 58.3194 242 60.2796 242 64.2V84.6238C242 89.6643 242 92.1845 241.019 94.1097C240.156 95.8032 238.779 97.18 237.086 98.0429C235.161 99.0238 232.64 99.0238 227.6 99.0238H120.4C115.36 99.0238 112.839 99.0238 110.914 98.0429C109.221 97.18 107.844 95.8032 106.981 94.1097C106 92.1845 106 89.6643 106 84.6238V67.4Z"
              fill="#1A1D21"
            ></path>
            <path
              d="M106 67.4C106 62.3595 106 59.8393 106.981 57.9141C107.844 56.2206 109.221 54.8438 110.914 53.9809C112.839 53 115.36 53 120.4 53L230.8 53C234.72 53 236.681 53 238.178 53.763C239.495 54.4341 240.566 55.5049 241.237 56.8221C242 58.3194 242 60.2796 242 64.2V84.6238C242 89.6643 242 92.1845 241.019 94.1097C240.156 95.8032 238.779 97.18 237.086 98.0429C235.161 99.0238 232.64 99.0238 227.6 99.0238H120.4C115.36 99.0238 112.839 99.0238 110.914 98.0429C109.221 97.18 107.844 95.8032 106.981 94.1097C106 92.1845 106 89.6643 106 84.6238V67.4Z"
              stroke="#266DF0"
              strokeWidth="0.75"
            ></path>
          </g>
          <rect
            opacity="0.4"
            x="111.479"
            y="58.479"
            width="125"
            height="35.0658"
            rx="6"
            stroke="#266DF0"
            strokeWidth="0.75"
          ></rect>  
          <rect
            x="118.054"
            y="65.054"
            width="21.9161"
            height="21.9161"
            rx="6"
            fill="#0F6BE9"
          ></rect>
          <rect
            x="145.449"
            y="67.2454"
            width="44.928"
            height="5.47903"
            rx="2.73951"
            fill="#0F6BE9"
          ></rect>
          <rect
            x="145.449"
            y="79.2993"
            width="77.8022"
            height="5.47903"
            rx="2.73951"
            fill="#0F6BE9"
          ></rect>
          <circle cx="242" cy="53" r="6" fill="#266DF0"></circle>
          <path
            d="M242.721 50.6364V55H241.931V51.4055H241.905L240.885 52.0575V51.3331L241.969 50.6364H242.721Z"
            fill="#1A1D21"
          ></path>
          <rect
            x="124.5"
            y="74.25"
            width="9"
            height="6.5"
            rx="2"
            stroke="#FFFFFF"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></rect>
          <path
            d="M127 73.75V72.75C127 71.6454 127.895 70.75 129 70.75C130.105 70.75 131 71.6454 131 72.75V73.75"
            stroke="#FFFFFF"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <defs>
            <filter
              id="filter0_dd_507_105062"
              x="81.625"
              y="36.625"
              width="184.75"
              height="94.7739"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              ></feColorMatrix>
              <feOffset dy="8"></feOffset>
              <feGaussianBlur stdDeviation="12"></feGaussianBlur>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.14902 0 0 0 0 0.427451 0 0 0 0 0.941176 0 0 0 0.08 0"
              ></feColorMatrix>
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_507_105062"
              ></feBlend>
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              ></feColorMatrix>
              <feOffset dy="6"></feOffset>
              <feGaussianBlur stdDeviation="6"></feGaussianBlur>
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.14902 0 0 0 0 0.427451 0 0 0 0 0.941176 0 0 0 0.12 0"
              ></feColorMatrix>
              <feBlend
                mode="normal"
                in2="effect1_dropShadow_507_105062"
                result="effect2_dropShadow_507_105062"
              ></feBlend>
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect2_dropShadow_507_105062"
                result="shape"
              ></feBlend>
            </filter>
            <radialGradient
              id="paint0_radial_507_105062"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(171 160) rotate(90) scale(162 188.914)"
            >
              <stop stopColor="#383E47"></stop>
              <stop offset="1" stopColor="#383E47" stopOpacity="0"></stop>
            </radialGradient>
          </defs>
        </svg>
      )}
    </div>
  );
};
