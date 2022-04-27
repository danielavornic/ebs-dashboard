import { FC, ReactNode } from 'react';

import '../styles/Button.scss';

interface Props {
  state: 'primary' | 'danger';
  type: 'submit' | 'button';
  children?: ReactNode;
}

const Button: FC<Props> = ({ state, type, children }) => {
  return (
    <button type={type} className={state}>
      {children}
    </button>
  );
};

export default Button;
