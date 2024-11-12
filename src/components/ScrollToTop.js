// ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();  // This hook needs to be inside RouterProvider

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to the top on every route change
  }, [location]);  // Dependency on location change

  return null;  // No visible output
};

export default ScrollToTop;
