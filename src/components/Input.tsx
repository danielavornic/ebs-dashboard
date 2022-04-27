import { FC } from 'react';

import '../styles/Input.scss';

interface Props {
  type: 'text' | 'email' | 'checkbox' | 'password';
  id: string;
  placeholder?: string;
}

const Input: FC<Props> = ({ type, id, placeholder }) => {
  return <input type={type} id={id} placeholder={placeholder} />;
};

export default Input;
