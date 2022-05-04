import { InputHTMLAttributes } from 'react';

const Input = ({
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
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
