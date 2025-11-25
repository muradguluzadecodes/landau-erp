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
