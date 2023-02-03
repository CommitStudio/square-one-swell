import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface Props {
  content: string;
  children: React.ReactElement;
}

const Tooltip = ({ children, content }: Props) => {
  return (
    <Tippy hideOnClick={false} arrow content={content} trigger="mouseenter" maxWidth={200}>
      {children}
    </Tippy>
  );
};

export default Tooltip;
