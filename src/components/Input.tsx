import { FC } from 'react';

interface Props {
  type: 'text' | 'email' | 'checkbox' | 'password';
  name: string;
  id: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<Props> = ({ type, name, id, placeholder, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      required
      minLength={type === 'password' ? 8 : 0}
    />
  );
};

export default Input;
