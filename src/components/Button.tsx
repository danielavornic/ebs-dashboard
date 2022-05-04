import { ButtonHTMLAttributes } from 'react';
import { PropsWithChildren } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  state: 'primary' | 'danger';
  type: 'submit' | 'button';
}

const Button = ({
  state,
  type,
  children,
  onClick,
}: PropsWithChildren<Props>) => {
  return (
    <button type={type} className={state} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
