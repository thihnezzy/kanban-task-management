import {
  ActionIcon, Button, Image, Text, Title, Tooltip, useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import clsx from 'clsx';
import React, { Suspense, useMemo } from 'react';
import { HiOutlineDotsVertical, HiOutlinePlus } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

import { Board } from '@/@types/Board';
import logoDark from '@/assets/logo-dark.svg';
import logoLight from '@/assets/logo-light.svg';
import logoMobile from '@/assets/logo-mobile.svg';
// import { deleteBoard } from '@/services/boardService';
import useIsOverflow from '@/useIsOverflow';

import MobileDropdown from './MobileDropdown';
// import { useMutation } from '@tanstack/react-query';

const ModalAddNewBoard = React.lazy(() => import('../modals/ModalAddNewBoard/ModalAddNewBoard'));
const ModalAddNewTask = React.lazy(() => import('../modals/ModalAddNewTask/ModalAddNewTask'));
const ModalDeleteBoard = React.lazy(() => import('../modals/ModalDeleteBoard/ModalDeleteBoard'));

interface HeaderProps {
  board: Board | null | undefined;
  boards: Board[] | null;
}

function Header(props: Readonly<HeaderProps>): React.ReactElement {
  const { board, boards } = props;
  const navigate = useNavigate();
  // const deleteBoardMutation = useMutation({
  //   mutationFn: deleteBoard,
  // })
  const [opened, { open: openAddNewTaskModal, close: closeAddNewTaskModal }] = useDisclosure(false);
  const [openedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [openedAddNewBoardModal, { open: openAddNewBoardModal, close: closeAddNewBoardModal }] = useDisclosure(false);

  const { textRef, isOverflow } = useIsOverflow();

  const { colorScheme } = useMantineColorScheme();
  const matches = useMediaQuery('(max-width: 475px)');
  const logo = useMemo(() => {
    if (matches) {
      return logoMobile;
    }
    return colorScheme === 'dark' ? logoLight : logoDark;
  }, [colorScheme, matches]);
  const onConfirmDeleteBoard = async () => {
    if (!board?.id) return;
    // await deleteBoardMutation.mutate(board?.id);
    if (!boards || boards.length === 0) {
      navigate('/');
    } else {
      navigate(`/${boards[0].id}`);
    }
    closeDeleteModal();
  };
  return (
    <>
      <div className={clsx('h-[60px] py-4 px-6 flex items-center justify-start', {
        'w-fit': matches,
        'w-[260px]': !matches,
      })}
      >
        <Link
          to="/"
          className="flex items-center"
        >
          <Image
            src={logo}
            alt="Logo"
            fit="contain"
            w="auto"
          />
        </Link>
      </div>
      <div className={clsx('grow h-full flex justify-between items-center border-solid border-l-[1px] border-lines-light dark:border-lines-dark px-4', {
        'border-l-0 pl-0': matches,
      })}
      >
        <div className="flex items-center">
          <Tooltip
            disabled={!isOverflow}
            label={board?.name}
            position="bottom"
            multiline
            w={220}
          >
            <Title ref={textRef} order={2} className="text-xl text-black dark:text-white truncate max-w-[150px] xs:max-w-[170px] sm:max-w-[200px] md:max-w-[400px] lg:max-w-full ml-2">
              {board?.name ?? ''}
            </Title>
          </Tooltip>
          <MobileDropdown
            matches={matches}
            boards={boards}
            id={board?.id}
            open={openAddNewBoardModal}
          />
        </div>
        <div className="flex items-center gap-1">
          <Button
            className={clsx('rounded-full bg-purple-primary hover:bg-purple-secondary text-white bg-opacity-90 duration-100 hover:text-white')}
            onClick={openAddNewTaskModal}
          >
            <Text className="hidden sm:inline-block text-sm" fw={700}>+ Add New Task</Text>
            <HiOutlinePlus className="block sm:hidden" />
          </Button>
          <ActionIcon
            variant="transparent"
            className="rounded-full text-medium-grey"
            onClick={openDeleteModal}
          >
            <HiOutlineDotsVertical />
          </ActionIcon>
        </div>
      </div>
      <Suspense fallback={null}>
        <ModalAddNewTask
          opened={opened}
          onClose={closeAddNewTaskModal}
        />
        <ModalDeleteBoard
          onConfirm={onConfirmDeleteBoard}
          opened={openedDeleteModal}
          onClose={closeDeleteModal}
          boardTitle={board?.name}
        />
        <ModalAddNewBoard
          opened={openedAddNewBoardModal}
          onClose={closeAddNewBoardModal}
        />
      </Suspense>
    </>
  );
}

export default Header;
