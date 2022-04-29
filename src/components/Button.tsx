import { FC, ReactNode } from 'react';

interface Props {
  state: 'primary' | 'danger';
  type: 'submit' | 'button';
  children?: ReactNode;
  onClick?: () => void;
}

const Button: FC<Props> = ({ state, type, children, onClick }) => {
  return (
    <button type={type} className={state} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
