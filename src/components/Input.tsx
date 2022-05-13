import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  width?: 'full' | 'auto';
}

export const Input = ({
  type = 'text',
  name,
  id,
  placeholder,
  value,
  onChange,
  className = '',
  width = 'auto',
  required = true,
  ...props
}: Props) => {
  return (
    <input
      className={`input input--${type} input--w-${width} ${className}`}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required={required}
      minLength={type === 'password' ? 8 : 0}
    />
  );
};
