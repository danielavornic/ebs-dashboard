import { PropsWithChildren } from 'react';

interface Props {
  spacing: number;
  cols: number;
}

export const Grid = ({ children, spacing, cols }: PropsWithChildren<Props>) => {
  return (
    <div className={`grid grid--spacing-${spacing} grid--cols-${cols}`}>
      {children}
    </div>
  );
};
