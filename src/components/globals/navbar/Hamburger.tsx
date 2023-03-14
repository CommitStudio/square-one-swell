type Props = {
  isOpen: boolean;
  toggle: () => void;
};

const Hamburger = ({ isOpen, toggle }: Props) => {
  return (
    <button
      id="hamburger-button"
      data-collapse-toggle="navbar-sticky"
      aria-controls="navbar-sticky"
      aria-expanded="false"
      onClick={toggle}
      className="self-center lg:hidden"
    >
      <div className={`${isOpen ? 'burger-animation-1' : ''} bg-black`}></div>
      <div className={`${isOpen ? 'burger-animation-2' : ''} bg-black`}></div>
      <div className={`${isOpen ? 'burger-animation-3' : ''} bg-black`}></div>
    </button>
  );
};

export default Hamburger;
