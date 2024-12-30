import {
  Box,
} from '@mantine/core';
import React, { useEffect } from 'react';

import Board from './Board';

function MainContent(): React.ReactElement {
  const containerRef = React.useRef<HTMLDivElement>(null);
  // calculate the height of the main content and translate y axis
  useEffect(() => {
    const resizeContainer = () => {
      if (containerRef.current) {
        const height = window.innerHeight - 80;
        containerRef.current.style.height = `${height}px`;
        containerRef.current.style.transform = 'translateY(80px)';
      }
    }
    window.addEventListener('resize', resizeContainer);
    resizeContainer();
    return () => {
      window.removeEventListener('resize', resizeContainer);
    }}, []);

  // mt-[60px] h-[calc(100dvh-60px)]
  return (
    <Box ref={containerRef} className="w-full flex flex-col px-4 mr-24 mr-[320px]">
      <Board className="w-full h-full flex" />
    </Box>
  );
}

export default MainContent;
