import { Button, Text } from '@mantine/core';
import clsx from 'clsx';
import React from 'react';
import { HiOutlineViewBoards } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import { Board } from '@/@types/Board';

interface BoardLinksProps {
  boards: Board[] | null;
  id: string | undefined;
  open: () => void;
}

function BoardLinks(props: BoardLinksProps): React.ReactElement {
  const { boards, id, open } = props;
  return (
    <>
      <Text className="ml-6 mb-4 text-medium-grey font-bold text-xs tracking-wider">
        ALL BOARDS (
        {boards?.length ?? 0}
        )
      </Text>
      {boards?.map((board) => (
        <Button
          key={board.id}
          radius={0}
          size="sm"
          component={Link}
          classNames={{
            inner: 'justify-start',
          }}
          className={clsx(
            'font-bold text-medium-grey w-11/12 py-2 pl-6 hover:bg-purple-primary duration-200 rounded-r-full',
            {
              'bg-purple-primary text-white hover:bg-opacity-90': id === board.id,
              'bg-white dark:bg-transparent text-medium-grey hover:bg-opacity-10 hover:text-purple-primary dark:hover:bg-white': id !== board.id,
            },
          )}
          to={`/${board.id}`}
          leftSection={(<HiOutlineViewBoards size={16} />)}
        >
          {board.name}
        </Button>
      ))}
      <Button
        classNames={{
          inner: 'justify-start',
        }}
        className="font-bold text-purple-primary w-11/12 py-2 pl-6 hover:opacity-80 hover:text-purple-primary duration-200 rounded-r-full"
        leftSection={(
          <HiOutlineViewBoards size={16} />
      )}
        onClick={open}
        variant="transparent"
      >
        + Create New Board
      </Button>
    </>
  );
}

export default BoardLinks;
