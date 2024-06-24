import {
  ActionIcon, Button, Image, Text, Title, Tooltip, useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { HiOutlineDotsVertical, HiOutlinePlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { Board } from '@/@types/Board';
import logoDark from '@/assets/logo-dark.svg';
import logoLight from '@/assets/logo-light.svg';
import logoMobile from '@/assets/logo-mobile.svg';
import { deleteBoard } from '@/data/data';
import useIsOverflow from '@/useIsOverflow';

import ModalAddNewTask from '../modals/ModalAddNewTask/ModalAddNewTask';
import ModalDeleteBoard from '../modals/ModalDeleteBoard/ModalDeleteBoard';

import MobileDropdown from './MobileDropdown';

interface HeaderProps {
  board: Board | null | undefined;
  boards: Board[] | null;
}

function Header(props: Readonly<HeaderProps>): React.ReactElement {
  const { board, boards } = props;
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

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
    deleteBoard(board?.id ?? '');
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
        <Image
          src={logo}
          alt="Logo"
          fit="contain"
          w="auto"
        />
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
            <Title ref={textRef} order={2} className="text-xl text-black dark:text-white truncate max-w-[100px] xs:max-w-[170px] sm:max-w-[200px] md:max-w-[400px] lg:max-w-full">
              {board?.name ?? ''}
            </Title>
          </Tooltip>
          <MobileDropdown
            matches={matches}
            boards={boards}
            id={board?.id}
            open={open}
          />
        </div>
        <div className="flex items-center gap-1">
          <Button
            className={clsx('rounded-full bg-purple-primary hover:bg-purple-secondary text-white bg-opacity-90 duration-100 hover:text-white')}
            onClick={open}
          >
            <Text className="hidden xs:inline-block text-sm" fw={700}>+ Add New Task</Text>
            <HiOutlinePlus className="block xs:hidden" />
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
      <ModalAddNewTask opened={opened} onClose={close} />
      <ModalDeleteBoard
        onConfirm={onConfirmDeleteBoard}
        opened={openedDeleteModal}
        onClose={closeDeleteModal}
        boardTitle={board?.name}
      />
    </>
  );
}

export default Header;
