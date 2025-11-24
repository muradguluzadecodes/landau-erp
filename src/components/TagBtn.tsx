import clsx from 'clsx';

export const TagBtn = ({
  isActive,
  text,
  onClick,
}: {
  isActive: boolean;
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-[140px] h-[30px]  rounded-full flex-center',
        isActive ? 'bg-primary text-white' : 'bg-gray-ef text-black',
      )}
    >
      {text}
    </button>
  );
};
