import { useLocation } from "react-router-dom";
import { PropsWithChildren, useLayoutEffect } from "react";

type ScrollToTopProps = PropsWithChildren;

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

export default ScrollToTop;
