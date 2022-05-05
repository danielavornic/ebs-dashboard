import { ButtonHTMLAttributes, ReactNode } from 'react';
import { PropsWithChildren } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  state: 'primary' | 'danger' | 'transparent';
  type: 'submit' | 'button';
  size?: string;
  icon?: ReactNode;
}

const Button = ({
  state,
  type,
  size,
  children,
  icon,
  onClick,
}: PropsWithChildren<Props>) => {
  return (
    <button
      type={type}
      className={`btn btn--${state} btn--${size}`}
      onClick={onClick}
    >
      {icon && <span className='btn__icon'>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
