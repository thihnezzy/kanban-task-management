import {
  Box,
} from '@mantine/core';
import React from 'react';

import Board from './Board';

function MainContent(): React.ReactElement {
  return (
    <Box className="w-full flex flex-col mt-[60px] h-[calc(100dvh-60px)] px-4 mr-24 mr-[320px]">
      <Board className="ư-full h-full flex " />
    </Box>
  );
}

export default MainContent;
