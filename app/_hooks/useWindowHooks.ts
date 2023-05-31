import { useState, useEffect } from 'react';

export const useHasScrolled = (offset = 10) => {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const scrollAction = () => {
      const scrolled = document?.scrollingElement?.scrollTop as number;
      scrolled >= offset ? setHasScroll(true) : setHasScroll(false);
    };

    window.addEventListener('scroll', scrollAction);

    return () => {
      window.removeEventListener('scroll', scrollAction);
    };
  }, [offset]);

  return hasScroll;
};

export const useViewportWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return windowWidth;
};
