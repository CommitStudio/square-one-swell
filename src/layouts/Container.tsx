import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  classes?: string;
};

const Container = ({ children, classes }: Props) => {
  return (
    <section className="mx-auto max-w-[500px]">
      <div className={`${classes ? classes : ''}`}>{children}</div>
    </section>
  );
};

export default Container;
