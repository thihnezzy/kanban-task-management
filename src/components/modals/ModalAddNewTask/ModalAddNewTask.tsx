import {
  ActionIcon,
  Button,
  Modal, Select, Stack, Textarea, TextInput, Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useMemo } from 'react';
import { HiOutlineChevronDown, HiOutlineX } from 'react-icons/hi';

import { useBoard } from '@/contexts/KanbanContext';
import { createTask } from '@/services/boardService';

interface ModalAddNewTaskProps {
  opened: boolean;
  onClose: () => void;
}

const inputClassNames = {
  root: 'relative',
  wrapper: 'relative',
  label: 'text-medium-grey dark:text-white font-bold mb-1',
  input: 'bg-transparent text-black dark:text-white focus:border-purple-primary',
  error: 'absolute right-2 top-1/2 transform -translate-y-1/2 pb-1',
};

function ModalAddNewTask(props: Readonly<ModalAddNewTaskProps>): React.ReactElement {
  const {
    board, boardId,
  } = useBoard();
  const queryClient = useQueryClient();
  const { opened, onClose } = props;
  const addNewTask = useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['board', boardId],
      });
      await queryClient.refetchQueries({
        queryKey: ['board', boardId],
      });
      onClose();
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
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      subtasks: [''],
      status: '',
    },

    validate: {
      title: (value: string) => {
        if (value.trim() === '') {
          return 'Can\'t be empty';
        }
        if (value.length > 80) {
          return 'Can\'t be longer than 80 characters';
        }
        if (value.length < 5) {
          return 'Can\'t be shorter than 5 characters';
        }
        return null;
      },
      subtasks: (value: string[]) => {
        if (value.some((subtask) => subtask.trim() === '')) {
          return 'Can\'t be empty';
        }
        return null;
      },
    },
  });
  useEffect(() => {
    form.setFieldValue('status', statusOptions[0]?.value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusOptions]);
  return (
    <Modal
      withCloseButton={false}
      closeOnClickOutside
      opened={opened}
      onClose={onClose}
      size="md"
      radius={6}
      centered
    >
      <Modal.Header>
        <Title order={2} className="text-xl text-black dark:text-white">
          Add New Task
        </Title>
      </Modal.Header>
      <Modal.Body>
        <form
          className="space-y-4"
          onSubmit={form.onSubmit(async (values) => {
            if (!boardId || addNewTask.isPending) return;
            addNewTask.mutate({
              columnId: values.status, // columnId
              title: values.title,
              description: values.description,
              subtasks: values.subtasks,
            });
          })}
        >
          <TextInput
            placeholder="Task title"
            withAsterisk
            label="Title"
            className="mt-2"
            classNames={{
              ...inputClassNames,
              error: 'absolute bottom-0 right-2 transform -translate-y-1/2 pb-[2px]',
            }}
            onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
            value={form.values.title}
            error={form.errors.title}
          />
          <Textarea
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            label="Description"
            className="mt-2"
            rows={4}
            maxRows={6}
            classNames={{ ...inputClassNames }}
            onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
            value={form.values.description}
          />
          <div>
            <Title className="text-sm text-medium-grey dark:text-white mb-1">
              Subtasks
            </Title>
            <Stack className="max-h-[300px] overflow-y-auto py-2">
              {
                form.values.subtasks.map((subtask: string, index: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className="flex items-center" key={index}>
                    <TextInput
                      placeholder="Subtask"
                      value={subtask}
                      onChange={(event) => {
                        form.setFieldValue('subtasks', form.values.subtasks.map((value, i) => (i === index ? event.currentTarget.value : value)));
                      }}
                      className="flex-1"
                      classNames={inputClassNames}
                      error={form.errors.subtasks}
                    />
                    <ActionIcon
                      variant="transparent"
                      onClick={() => {
                        form.setFieldValue('subtasks', form.values.subtasks.filter((_, i) => i !== index));
                      }}
                    >
                      <HiOutlineX strokeWidth={3} size={24} className="text-medium-grey active:text-red-primary" />
                    </ActionIcon>
                  </div>
                ))
              }
              <Button
                onClick={() => {
                  form.setFieldValue('subtasks', [...form.values.subtasks, '']);
                }}
                variant="filled"
                className="text-sm bg-purple-secondary dark:bg-white bg-opacity-10 dark:bg-opacity-100
                hover:bg-opacity-25 hover:bg-purple-primary rounded-full duration-100
                font-bold text-purple-primary hover:text-purple-primary"
              >
                + Add New Subtask
              </Button>
            </Stack>
          </div>
          <Select
            data={statusOptions}
            value={form.values.status}
            onChange={(value) => {
              form.setFieldValue('status', value ?? 'Todo');
            }}
            label="Status"
            className="mt-2"
            classNames={inputClassNames}
            rightSection={<HiOutlineChevronDown className="text-purple-primary" />}
          />
          <Button
            type="submit"
            variant="filled"
            className="w-full bg-purple-primary hover:bg-purple-secondary rounded-full duration-100 font-bold text-white text-sm focus:outline-none"
            loading={addNewTask.isPending}
          >
            Create Task
          </Button>
        </form>
      </Modal.Body>

    </Modal>
  );
}

export default ModalAddNewTask;
