'use client';

import { Input, Select } from 'antd';
import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';
import { ChangeEventHandler, useState } from 'react';

interface FloatInputProps {
  label: string;
  type: 'email' | 'text' | 'number' | 'password' | 'select';
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onSelectChange?: (value: string) => void;
  options?: { label: string; value: string }[];
  placeholder?: string;
  required?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorMessage?: string | null;
  isError?: boolean;
  disabled?: boolean;
}

const FloatInput = ({
  placeholder = '',
  label,
  type,
  value,
  onChange = () => {},
  onSelectChange = () => {},
  required = false,
  inputClassName,
  labelClassName,
  containerClassName,
  errorMessage = null,
  isError = false,
  disabled = false,
  options = [],
}: FloatInputProps) => {
  const [focus, setFocus] = useState(false);

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (!!value && value.length > 0);
  const labelClass = isOccupied ? 'label as-label' : 'label as-placeholder';
  const requiredMark = required ? <span className="text-error">*</span> : null;

  const sharedInputClasses = clsx(
    'placeholder:text-black! outline-none! focus:outline-none! focus:shadow-none! shadow-none! peer w-full rounded-full! pl-6! py-[16.5px]! bg-transparent! text-black border border-input-border',
    inputClassName,
  );

  // 🔥 FIX DISABLED INPUT COLOR
  const disabledStyle = disabled
    ? {
        opacity: 1,
        WebkitTextFillColor: 'black',
        color: 'black',
        cursor: 'not-allowed',
      }
    : {};

  return (
    <div
      className={clsx('float-label w-full', containerClassName)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {/** SELECT */}
      {type === 'select' ? (
        <Select
          onChange={(val: string) => onSelectChange(val)}
          options={options}
          disabled={disabled}
          style={{
            width: '100%',
            ...disabledStyle,
          }}
          className="rounded-full"
        />
      ) : type === 'password' ? (
        /** PASSWORD */
        <Input.Password
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          className={sharedInputClasses}
          rootClassName={clsx('rounded-full!', isError && 'border-error!')}
          iconRender={(visible) =>
            visible ? (
              <EyeOff className="w-4 h-4 opacity-90!" />
            ) : (
              <Eye className="w-4 h-4 opacity-90!" />
            )
          }
          disabled={disabled}
          style={disabledStyle}
        />
      ) : (
        /** TEXT / EMAIL / NUMBER */
        <Input
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          type={type}
          className={sharedInputClasses}
          rootClassName={clsx(isError && 'border-error!')}
          disabled={disabled}
          style={disabledStyle}
        />
      )}

      <label className={clsx(labelClass, labelClassName)}>
        {isOccupied ? label : placeholder} {requiredMark}
      </label>

      {errorMessage && (
        <p
          className={clsx(
            'text-[12px] mt-2 text-left text-error',
            type === 'select' && 'translate-y-3',
          )}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FloatInput;
