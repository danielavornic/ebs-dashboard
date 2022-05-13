import { ButtonHTMLAttributes, ReactNode } from 'react';
import { PropsWithChildren } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  state: 'primary' | 'danger' | 'transparent';
  type: 'submit' | 'button';
  size?: 'small' | 'medium' | 'block' | 'auto';
  icon?: ReactNode;
}

export const Button = ({
  state,
  type,
  size = 'auto',
  icon,
  children,
  onClick,
  ...props
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
