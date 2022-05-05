import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

const Input = ({
  type = 'text',
  name,
  id,
  placeholder,
  value,
  onChange,
  width = 'width-auto',
}: Props) => {
  return (
    <input
      className={`input input--${width} input--${type}`}
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

export default Input;
