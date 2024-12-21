import {
  ActionIcon,
  Button,
  Modal, Select, Stack, Textarea, TextInput, Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { HiOutlineChevronDown, HiOutlineX } from 'react-icons/hi';

import { SubTask, Task } from '@/@types/Task';
import { useBoard } from '@/contexts/KanbanContext';
import { updateTask } from '@/services/boardService';

interface ModalAddNewTaskProps {
  item: Task;
  opened: boolean;
  statusOptions: { value: string; label: string }[];
  onClose: () => void;
}

interface FormValues {
  title: string;
  description: string;
  subtasks: SubTask[];
  column: string;
}

const inputClassNames = {
  root: 'relative',
  wrapper: 'relative',
  label: 'text-medium-grey dark:text-white font-bold mb-1',
  input: 'bg-transparent text-black dark:text-white focus:border-purple-primary',
  error: 'absolute right-2 top-1/2 transform -translate-y-1/2 pb-1',
};

function ModalEditTask(props: Readonly<ModalAddNewTaskProps>): React.ReactElement {
  const {
    opened, onClose, item, statusOptions,
  } = props;
  const { boardId } = useBoard();
  const queryClient = useQueryClient();
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
  const form = useForm<FormValues>({
    initialValues: {
      title: item?.title,
      description: '',
      subtasks: [],
      column: item.column,
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
      subtasks: (value: SubTask[]) => {
        if (value.some((subtask) => subtask.title.trim() === '')) {
          return 'Can\'t be empty';
        }
        return null;
      },
    },
  });
  useEffect(() => {
    if (item) {
      form.setValues({
        title: item.title || '',
        description: item.description || '',
        subtasks: item.subtasks || [],
        column: item.column || '',
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

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
          Edit Task
        </Title>
      </Modal.Header>
      <Modal.Body>
        <form
          className="space-y-4"
          onSubmit={form.onSubmit((values) => {
            if (!form.isValid() || updateCurrentTask.isPending) return;
            updateCurrentTask.mutate({
              taskId: item.id,
              data: {
                title: values.title,
                description: values.description,
                subtasks: values.subtasks,
                columnId: values.column,
              },
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
                form.values.subtasks.map((subtask: SubTask, index: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className="flex items-center" key={index}>
                    <TextInput
                      placeholder="Subtask"
                      value={subtask.title}
                      onChange={(event) => {
                        form.setFieldValue('subtasks', form.values.subtasks.map((value, i) => (i === index ? { ...value, title: event.currentTarget.value } : value)));
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
                  form.setFieldValue('subtasks', [...form.values.subtasks, {
                    id: '',
                    title: '',
                    isCompleted: false,
                  }]);
                }}
                variant="filled"
                className="text-sm bg-purple-secondary bg-opacity-10 hover:bg-opacity-25 hover:bg-purple-primary rounded-full duration-100 font-bold text-purple-primary hover:text-purple-primary text-sm"
              >
                + Add New Subtask
              </Button>
            </Stack>
          </div>
          <Select
            data={statusOptions}
            value={form.values.column}
            onChange={(value) => {
              if (!value) return;
              form.setFieldValue('column', value);
            }}
            label="Status"
            className="mt-2"
            classNames={inputClassNames}
            rightSection={<HiOutlineChevronDown className="text-purple-primary" />}
          />
          <Button
            type="submit"
            variant="filled"
            className="w-full bg-purple-primary hover:bg-purple-secondary rounded-full duration-100 font-bold text-white text-sm"
            loading={updateCurrentTask.isPending}
          >
            Update Task
          </Button>
        </form>
      </Modal.Body>

    </Modal>
  );
}

export default ModalEditTask;
