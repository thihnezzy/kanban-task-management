import {
  Checkbox,
  Modal,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import React, { useEffect, useMemo } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

import type { Task } from '@/@types/Task';
import { useBoard } from '@/contexts/KanbanContext';
import { deleteTask, updateTask } from '@/services/boardService';

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

function ModalTaskView(props: Readonly<ModalTaskViewProps>): React.ReactElement {
  const { item, opened, onClose } = props;
  const { board, boardId } = useBoard();
  const queryClient = useQueryClient();
  const deleteCurrentTask = useMutation({
    mutationFn: deleteTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['board', boardId],
      });
      onClose();
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const updateCurrentTask = useMutation({
    mutationFn: updateTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['board', boardId],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const statusOptions = useMemo(() => {
    const boardStatuses = board?.columns.map((column) => ({
      value: column.id,
      label: column.name,
    })) ?? [];
    return boardStatuses;
  }, [board?.columns]);
  const [modalEditTaskOpened, { open: openModalEditTask, close: closeModalEditTask }] = useDisclosure(false);
  const [modalDeleteTaskOpened, { open: openModalDeleteTask, close: closeModalDeleteTask }] = useDisclosure(false);
  const [currentStatus, setCurrentStatus] = React.useState<string | null>(() => item.column);
  const [task, setTask] = React.useState<Task>(() => item);
  const completedSubtasks = task.subtasks.filter((subtask) => subtask.isCompleted).length;

  useEffect(() => {
    setTask(item);
  }, [item]);

  const handleStatusChange = (isChecked: boolean, subtaskId: string) => {
    if (updateCurrentTask.isPending || !currentStatus) return;
    const newSubtasks = task.subtasks.map((subtask) => (
      subtask.id === subtaskId ? { ...subtask, isCompleted: Boolean(!isChecked) } : { ...subtask }
    ));
    setTask((current) => ({
      ...current,
      subtasks: [...newSubtasks],
    }));
    updateCurrentTask.mutate({
      taskId: task.id,
      data: {
        subtasks: newSubtasks,
        columnId: currentStatus,
        description: task.description,
        title: task.title,
      },
    });
  };
  const onChangeStatus = (columnId: string | null) => {
    if (!columnId) return;
    setCurrentStatus(columnId);
    setTask((current) => ({
      ...current,
      status: columnId,
    }));
    updateCurrentTask.mutate({
      taskId: task.id,
      data: {
        columnId,
      },
    });
  };
  const onConfirmDeleteTask = async () => {
    if (deleteCurrentTask.isPending) return;
    await deleteCurrentTask.mutate(task.id);
    closeModalDeleteTask();
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
            value={currentStatus}
            placeholder="Select status"
            className="mt-2"
            classNames={{
              input: 'bg-transparent text-black dark:text-white focus:border-purple-primary',
            }}
            rightSection={<HiOutlineChevronDown className="text-purple-primary" />}
            disabled={updateCurrentTask.isPending}
            onChange={onChangeStatus}
          />
        </Modal.Body>
      </Modal>
      <ModalEditTask
        onClose={closeModalEditTask}
        opened={modalEditTaskOpened}
        item={task}
        statusOptions={statusOptions}
      />
      <ModalConfirmation
        type="danger"
        onConfirm={onConfirmDeleteTask}
        title="Delete this task"
        description={`Are you sure you want to delete the "${task.title}" task and its subtasks? This action cannot be reversed.`}
        onClose={closeModalDeleteTask}
        opened={modalDeleteTaskOpened}
        loading={deleteCurrentTask.isPending}
      />
    </>
  );
}

export default ModalTaskView;
