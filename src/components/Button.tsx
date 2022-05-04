import { PropsWithChildren } from 'react';

interface Props {
  state: 'primary' | 'danger';
  type: 'submit' | 'button';
  onClick?: () => void;
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
