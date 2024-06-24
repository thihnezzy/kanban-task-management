import {
  Checkbox,
  Modal,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

import type { Task } from '@/@types/Task';

import ModalConfirmation from '../ModalConfirmation/ModalConfirmation';
import ModalEditTask from '../ModalEditTask/ModalEditTask';

import DropdownMenu from './DropdownMenu/DropdownMenu';

interface ModalTaskViewProps {
  item: Task;
  opened: boolean;
  onClose: () => void;
}

const checkboxClassNames = {
  body: 'items-center w-full h-full',
  input: 'checked:bg-purple-primary checked:border-purple-primary',
  checkboxWrapper: 'border border-solid border-light-grey dark:border-dark-grey',
};

// TODO: Status base on the title's column
const statusOptions = [
  { value: 'Todo', label: 'To Do' },
  { value: 'Doing', label: 'In Progress' },
  { value: 'Done', label: 'Done' },
];

function ModalTaskView(props: Readonly<ModalTaskViewProps>): React.ReactElement {
  const { item, opened, onClose } = props;
  const [modalEditTaskOpened, { open: openModalEditTask, close: closeModalEditTask }] = useDisclosure(false);
  const [modalDeleteTaskOpened, { open: openModalDeleteTask, close: closeModalDeleteTask }] = useDisclosure(false);
  const [task, setTask] = React.useState<Task>(() => item);
  const completedSubtasks = useMemo(() => task.subtasks.filter((subtask) => subtask.isCompleted).length, [task.subtasks]);
  const handleStatusChange = (isChecked: boolean, subtaskId: string) => {
    // TODO: BACKEND - Update subtask status
    const newSubtasks = task.subtasks.map((subtask) => (
      subtask.id === subtaskId ? { ...subtask, isCompleted: Boolean(!isChecked) } : { ...subtask }
    ));
    setTask((current) => ({
      ...current,
      subtasks: [...newSubtasks],
    }));
  };
  const onChangeStatus = (value: string | null) => {
    // TODO: BACKEND - Update task status
    console.log(value);
    setTask((current) => ({
      ...current,
      status: value || 'Todo',
    }));
  };
  return (
    <>
      <Modal
        withCloseButton={false}
        closeOnClickOutside
        opened={opened}
        onClose={onClose}
        size="md"
        radius={6}
        centered
      >
        <Modal.Header className="space-x-4">
          <Title order={2} className="text-xl text-black dark:text-white">
            {task.title}
          </Title>
          <DropdownMenu
            onClickDeleteTask={openModalDeleteTask}
            onClickEditTask={openModalEditTask}
          />
        </Modal.Header>
        <Modal.Body>
          <Text size="sm" className="font-normal text-medium-grey">
            {task.description || 'No description'}
          </Text>
          <Title order={6} className="text-medium-grey dark:text-white font-bold my-4">
            Subtasks (
            {completedSubtasks}
            {' '}
            of
            {' '}
            {task.subtasks.length}
            )
          </Title>
          <Stack mah={500} className="overflow-y-auto gap-2">
            {task.subtasks.map((subtask) => (
              <Checkbox
                key={subtask.id}
                label={subtask.title}
                radius={2}
                checked={subtask.isCompleted}
                className={clsx(
                  'p-4 font-bold rounded-md duration-100',
                  'dark:bg-very-dark-grey',
                  'bg-light-grey hover:bg-purple-primary hover:bg-opacity-25',
                  {
                    'line-through text-medium-grey': subtask.isCompleted,
                    'text-black dark:text-white': !subtask.isCompleted,
                  },
                )}
                classNames={checkboxClassNames}
                onClick={() => handleStatusChange(subtask.isCompleted, subtask.id)}
                onChange={() => handleStatusChange(subtask.isCompleted, subtask.id)}
              />
            ))}
          </Stack>
          <Title order={6} className="text-medium-grey dark:text-white font-bold mt-4">
            Current Status
          </Title>
          <Select
            data={statusOptions}
            value={task.status}
            placeholder="Select status"
            className="mt-2"
            classNames={{
              input: 'bg-transparent text-black dark:text-white focus:border-purple-primary',
            }}
            rightSection={<HiOutlineChevronDown className="text-purple-primary" />}
            onChange={onChangeStatus}
          />
        </Modal.Body>
      </Modal>
      <ModalEditTask
        onClose={closeModalEditTask}
        opened={modalEditTaskOpened}
        // item={task}
      />
      <ModalConfirmation
        type="danger"
        onConfirm={closeModalDeleteTask}
        title="Delete this task"
        description={`Are you sure you want to delete the ${'\u2019'}Build settings UI& ${'\u0060'} task and its subtasks? This action cannot be reversed.`}
        onClose={closeModalDeleteTask}
        opened={modalDeleteTaskOpened}
      />
    </>
  );
}

export default ModalTaskView;
