import {
  ActionIcon,
  Menu,
} from '@mantine/core';
import React from 'react';
import {
  HiOutlineDotsVertical,
} from 'react-icons/hi';

interface DropdownMenuProps {
  onClickEditTask: () => void;
  onClickDeleteTask: () => void;
}

function DropdownMenu(props: Readonly<DropdownMenuProps>): React.ReactElement {
  const {
    onClickEditTask,
    onClickDeleteTask,
  } = props;
  return (
    <Menu
      radius={8}
      classNames={{
        dropdown: 'bg-white dark:bg-very-dark-grey',
      }}
    >
      <Menu.Target>
        <ActionIcon
          variant="transparent"
          className="text-medium-grey active:text-medium-grey hover:text-medium-grey"
          onClick={() => {}}
          fw={500}
          size={24}
        >
          <HiOutlineDotsVertical size={24} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={onClickEditTask}
          className="text-medium-grey font-semibold"
        >
          Edit Task
        </Menu.Item>
        <Menu.Item
          onClick={onClickDeleteTask}
          className="text-red-primary hover:text-red-secondary font-semibold"
        >
          Delete Task
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default DropdownMenu;
