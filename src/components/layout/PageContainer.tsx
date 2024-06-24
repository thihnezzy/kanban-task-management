import {
  ActionIcon,
  AppShell,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { IoIosEye } from 'react-icons/io';
import { useParams } from 'react-router-dom';

import type { Board } from '@/@types/Board';
import { fetchBoards } from '@/data/data';

import Header from './Header';
import Navbar from './Navbar';

function PageContainer({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode {
  const [opened, { toggle }] = useDisclosure();
  const [boards, setBoards] = React.useState<Board[] | null>(null);
  const matches = useMediaQuery('(max-width: 475px)');
  const { id } = useParams<{ id: string }>();
  const board = useMemo(() => (
    boards?.find((_board) => _board.id === id)
  ), [boards, id]);

  React.useEffect(() => {
    fetchBoards().then((data) => {
      setBoards(data);
      console.log(data);
    });
  }, []);
  return (
    <AppShell
      p={0}
      m={0}
      className=""
      navbar={{
        width: '260px',
        breakpoint: 'md',
        collapsed: {
          mobile: matches,
          desktop: opened,
        },
      }}
      header={{
        height: 60,
      }}
    >
      <AppShell.Header className="border-b-0 w-full bg-white dark:bg-dark-grey flex items-center justify-between border-solid border-b-[1px] border-lines-light dark:border-lines-dark">
        <Header
          boards={boards}
          board={board}
        />
      </AppShell.Header>
      <AppShell.Navbar
        className="bg-white dark:bg-dark-grey border-lines-light dark:border-lines-dark pt-6 box-content"
      >
        <Navbar
          boards={boards}
          id={id}
          toggle={toggle}
        />
      </AppShell.Navbar>
      <AppShell.Main className="bg-[#F4F7FD] dark:bg-[#20212C] py-0 mt-0 flex flex-col relative overflow-x-auto">
        {children}
        <ActionIcon
          radius={0}
          h={38}
          w={42}
          variant="filled"
          className={clsx('bg-purple-primary hover:bg-purple-secondary absolute bottom-12 rounded-r-full duration-200', {
            hidden: !opened || matches,
          })}
          onClick={toggle}
        >
          <IoIosEye size={18} />
        </ActionIcon>
      </AppShell.Main>
    </AppShell>
  );
}

export default PageContainer;
