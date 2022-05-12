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
  required = true,
}: Props) => {
  return (
    <input
      className={`${
        className ? className : ''
      } input input--${width} input--${type}`}
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
