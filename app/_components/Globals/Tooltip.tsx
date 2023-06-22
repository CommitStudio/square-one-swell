import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface Props {
  content: string;
  children: React.ReactElement;
  className?: string;
}

const Tooltip = ({ children, content, className }: Props) => {
  return (
    <Tippy
      hideOnClick={false}
      arrow
      content={content}
      trigger="mouseenter"
      maxWidth={200}
      className={className}
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;
