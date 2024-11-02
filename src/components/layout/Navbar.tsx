import { Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import clsx from 'clsx';
import React from 'react';
import { IoIosEyeOff } from 'react-icons/io';

import type { Board } from '@/@types/Board';

import ColorsSchemeToggle from '../ColorsSchemeToggle/ColorsSchemeToggle';
import ModalAddNewBoard from '../modals/ModalAddNewBoard/ModalAddNewBoard';

import BoardLinks from './BoardLinks';

interface NavbarProps {
  boards: Board[] | undefined;
  id: string | undefined;
  toggle: () => void;
}

function Navbar(props: NavbarProps): React.ReactElement {
  const { boards, id, toggle } = props;
  const [opened, { open, close }] = useDisclosure();
  return (
    <>
      <Group className="h-full flex flex-col items-start justify-between">
        <div className="w-full">
          <div className="w-full flex flex-col max-h-[800px] overflow-y-auto">
            <BoardLinks
              boards={boards}
              id={id}
              open={open}
            />
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center relative mb-12">
          <div className="w-full px-6">
            <ColorsSchemeToggle />
          </div>
          <div className="w-full">
            <Button
              classNames={{
                inner: 'justify-start',
              }}
              className={clsx(
                'font-semibold text-medium-grey w-11/12 py-2 pl-6  duration-200 rounded-r-full',
                'hover:bg-purple-primary hover:bg-opacity-10 hover:text-purple-primary dark:hover:bg-white',
              )}
              variant="transparent"
              onClick={toggle}
              leftSection={(
                <IoIosEyeOff />
                )}
            >
              Hide Sidebar
            </Button>
          </div>
        </div>
      </Group>
      <ModalAddNewBoard opened={opened} onClose={close} />
    </>
  );
}

export default Navbar;
