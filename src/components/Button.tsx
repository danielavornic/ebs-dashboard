import { FC, ReactNode } from 'react';

import '../styles/Button.scss';

interface Props {
  buttonType: 'primary' | 'danger';
  type: 'submit' | 'button';
  children?: ReactNode;
}

const Button: FC<Props> = ({ buttonType, type, children }) => {
  return (
    <button type={type} className={buttonType}>
      {children}
    </button>
  );
};

export default Button;
