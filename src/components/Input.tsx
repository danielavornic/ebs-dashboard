import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

export const Input = ({
  type = 'text',
  name,
  id,
  placeholder,
  value,
  onChange,
  className,
  width = 'width-auto',
}: Props) => {
  return (
    <input
      className={`${className} input input--${width} input--${type}`}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required
      minLength={type === 'password' ? 8 : 0}
    />
  );
};
