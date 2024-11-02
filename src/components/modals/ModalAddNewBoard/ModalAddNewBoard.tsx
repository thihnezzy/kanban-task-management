import {
  ActionIcon,
  Button,
  Modal,
  Stack,
  TextInput, Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { HiOutlineX } from 'react-icons/hi';

// import { createBoard, fetchBoards } from '@/services/boardService';

interface ModalAddNewBoardProps {
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

function ModalAddNewBoard(props: Readonly<ModalAddNewBoardProps>): React.ReactElement {
  const { opened, onClose } = props;
  const [isLoading, setLoading] = React.useState(false);
  const form = useForm({
    initialValues: {
      title: '',
      columns: [''],
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
      columns: (value: string[]) => {
        if (value.some((column) => column.trim() === '')) {
          return 'Can\'t be empty';
        }
        return null;
      },
    },
  });
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
          Add New Board
        </Title>
      </Modal.Header>
      <Modal.Body>
        <form
          className="space-y-4"
          onSubmit={form.onSubmit(async (values) => {
            setLoading(true);
            // const newBoard = await createBoard({
            //   name: values.title,
            //   columns: values.columns,
            // });
            setLoading(false);
            form.reset();
            onClose();
          })}
        >
          <TextInput
            placeholder="e.g Web Design"
            withAsterisk
            label="Name"
            className="mt-2"
            classNames={{
              ...inputClassNames,
              error: 'absolute bottom-0 right-2 transform -translate-y-1/2 pb-[2px]',
            }}
            onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
            value={form.values.title}
            error={form.errors.title}
          />
          <div>
            <Title className="text-sm text-medium-grey dark:text-white mb-1">
              Columns
            </Title>
            <Stack className="max-h-[300px] overflow-y-auto py-2">
              {
                form.values.columns.map((column: string, index: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className="flex items-center" key={index}>
                    <TextInput
                      placeholder="Column"
                      value={column}
                      onChange={(event) => {
                        form.setFieldValue('columns', form.values.columns.map((value, i) => (i === index ? event.currentTarget.value : value)));
                      }}
                      className="flex-1"
                      classNames={inputClassNames}
                      error={form.errors.columns}
                    />
                    <ActionIcon
                      variant="transparent"
                      onClick={() => {
                        form.setFieldValue('columns', form.values.columns.filter((_, i) => i !== index));
                      }}
                    >
                      <HiOutlineX strokeWidth={3} size={24} className="text-medium-grey active:text-red-primary" />
                    </ActionIcon>
                  </div>
                ))
              }
              <Button
                onClick={() => {
                  form.setFieldValue('columns', [...form.values.columns, '']);
                }}
                variant="filled"
                className="text-sm bg-purple-secondary dark:bg-white bg-opacity-10 dark:bg-opacity-100
                hover:bg-opacity-25 hover:bg-purple-primary rounded-full duration-100
                font-bold text-purple-primary hover:text-purple-primary"
              >
                + Add New Column
              </Button>
            </Stack>
          </div>
          <Button
            type="submit"
            variant="filled"
            className="w-full bg-purple-primary hover:bg-purple-secondary rounded-full duration-100 font-bold text-white text-sm outline-none focus:outline-none"
            loading={isLoading}
            disabled={isLoading}
          >
            Create New Board
          </Button>
        </form>
      </Modal.Body>

    </Modal>
  );
}

export default ModalAddNewBoard;
