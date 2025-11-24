export const Settings = ({ color = '#0044FF' }: { color?: string }) => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
    <path
      d="M0.75 3.75L12.75 3.75M12.75 3.75C12.75 5.40686 14.0931 6.75 15.75 6.75C17.4069 6.75 18.75 5.40685 18.75 3.75C18.75 2.09315 17.4069 0.75 15.75 0.75C14.0931 0.75 12.75 2.09315 12.75 3.75ZM6.75 11.75L18.75 11.75M6.75 11.75C6.75 13.4069 5.40685 14.75 3.75 14.75C2.09315 14.75 0.75 13.4069 0.75 11.75C0.75 10.0931 2.09315 8.75 3.75 8.75C5.40685 8.75 6.75 10.0931 6.75 11.75Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowLeft = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
    <path
      d="M16.75 6.75H0.75M0.75 6.75L6.75 12.75M0.75 6.75L6.75 0.75"
      stroke="#141414"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const UploadCloud = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.33317 29.7774C5.1222 28.2974 3.6665 25.777 3.6665 22.9167C3.6665 18.6201 6.95094 15.0907 11.146 14.7022C12.0042 9.48224 16.537 5.5 21.9998 5.5C27.4627 5.5 31.9955 9.48224 32.8536 14.7022C37.0487 15.0907 40.3332 18.6201 40.3332 22.9167C40.3332 25.777 38.8775 28.2974 36.6665 29.7774M14.6665 29.3333L21.9998 22M21.9998 22L29.3332 29.3333M21.9998 22V38.5"
      stroke="#141414"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
