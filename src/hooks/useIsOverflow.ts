import { useEffect, useRef, useState } from 'react';

const useIsOverflow = () => {
  const [isOverflow, setIsOverflow] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const { scrollWidth, clientWidth } = textRef.current;
        setIsOverflow(scrollWidth > clientWidth);
      }
    };

    const observer = new MutationObserver(checkOverflow);

    if (textRef.current) {
      observer.observe(textRef.current, { childList: true, subtree: true });
    }

    window.addEventListener('resize', checkOverflow);
    checkOverflow(); // Initial check

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  return { isOverflow, textRef };
};

export default useIsOverflow;
