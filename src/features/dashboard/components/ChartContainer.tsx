import { PropsWithChildren } from 'react';

const ChartContainer = ({
  title,
  children: chart,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <div className='chart'>
      <h3 className='mb-36'>{title}</h3>
      {chart}
    </div>
  );
};

export default ChartContainer;
