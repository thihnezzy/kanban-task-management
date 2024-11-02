import { ActionIcon, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

import { Board } from '@/@types/Board';

import ColorsSchemeToggle from '../ColorsSchemeToggle/ColorsSchemeToggle';

import BoardLinks from './BoardLinks';

interface MobileDropdownProps {
  boards: Board[] | null;
  id: string | undefined;
  matches: boolean | undefined;
  open: () => void;
}

function MobileDropdown(props: MobileDropdownProps): React.ReactElement {
  const {
    boards, matches, id, open: openAddNewBoard,
  } = props;
  const [menuOpened, { close, open: openMenu }] = useDisclosure(false);

  if (!matches) return <div />;
  return (matches && (
    <div>
      <ActionIcon
        variant="transparent"
        className="text-purple-primary hover:text-purple-secondary duration-100"
        onClick={() => {
          openMenu();
        }}
      >
        {
          menuOpened ? (
            <HiOutlineChevronUp />
          ) : (
            <HiOutlineChevronDown />
          )
        }
      </ActionIcon>
      <Modal
        opened={menuOpened}
        onClose={close}
        size="auto"
        withCloseButton={false}
        classNames={{
          root: 'w-[250px]',
          body: 'px-0 py-2 w-[250px]',
        }}
      >
        <Modal.Body>
          <BoardLinks
            boards={boards}
            id={id}
            open={() => {
              close();
              openAddNewBoard();
            }}
          />
          <div className="px-4">
            <ColorsSchemeToggle />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
  );
}

export default MobileDropdown;
