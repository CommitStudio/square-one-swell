import React from 'react';

type Props = {
  toggle: () => void;
};

const Hamburger = ({ toggle }: Props) => {
  return (
    <div id="hamburger-menu" className="lg:hidden" role="button">
      <input
        type="checkbox"
        id="menu_checkbox"
        onClick={toggle}
        data-collapse-toggle="navbar-sticky"
        aria-controls="navbar-sticky"
        aria-expanded="false"
      />
      <label htmlFor="menu_checkbox">
        <div className="bg-primary"></div>
        <div className="bg-primary"></div>
        <div className="bg-primary"></div>
      </label>
    </div>
  );
};

export default Hamburger;
