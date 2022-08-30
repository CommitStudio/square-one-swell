import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  classes?: string;
};

const Container = ({ children, classes }: Props) => {
  return (
    <section className="max-w-lg mx-auto bg-primary">
      <div className={`${classes ? classes : ''}`}>{children}</div>
    </section>
  );
};

export default Container;
