import clsx from 'clsx';

interface InputProps {
  type: 'email' | 'text' | 'number' | 'password';
  label: string;
  error?: string | null;
  id: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export const Input = ({
  type,
  error = null,
  id,
  label,
  containerClassName,
  labelClassName,
  inputClassName,
}: InputProps) => {
  return (
    <div
      className={clsx(
        'relative w-full',
        containerClassName && containerClassName,
      )}
    >
      <input
        type={type}
        id={id}
        required
        className={clsx(
          'peer w-full border rounded-full px-4 py-3 bg-section-bg! text-black placeholder-transparent focus:outline-none border-input-border',
          inputClassName,
          error && 'border-error!',
        )}
      />

      <label
        htmlFor={id}
        className={clsx(
          'absolute left-4 top-3 text-black bg-white px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-sm peer-valid:top-[-10px] peer-valid:text-sm',
          labelClassName && labelClassName,
        )}
      >
        {label}
      </label>

      {error && (
        <p className="text-[12px] mt-2 text-left text-error ">{error}</p>
      )}
    </div>
  );
};
