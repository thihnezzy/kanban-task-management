import {
  Box, Button, Group, Modal, Text,
} from '@mantine/core';
import clsx from 'clsx';
import React from 'react';

interface ModalConfirmationProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  type: 'danger' | 'success';
  loading?: boolean;
}

function ModalConfirmation(props: Readonly<ModalConfirmationProps>): React.ReactElement {
  const {
    opened,
    onClose,
    onConfirm,
    title,
    description,
    loading,
    type,
  } = props;
  const confirmButton = (type === 'danger') ? 'Delete' : 'Confirm';
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      radius={8}
      centered
      classNames={{
        title: 'font-bold text-lg text-red-primary',
      }}
    >
      <Group className="mb-4">
        <Box>
          <Text className={clsx('text-medium-grey text-sm')}>
            {description}
          </Text>
        </Box>
        <Box
          className="w-full flex items-center justify-end gap-4 *:font-bold mt-2"
        >
          <Button
            className={clsx('basis-1/2 rounded-full text-white duration-200 fade-in-out hover:opacity-80', {
              'bg-red-primary hover:bg-red-primary': type === 'danger',
              'bg-green-primary': type === 'success',
            })}
            loading={loading}
            onClick={onConfirm}
          >
            {confirmButton}
          </Button>
          <Button
            className={clsx('duration-200 basis-1/2 rounded-full dark:bg-white dark:text-purple-primary bg-purple-primary hover:bg-purple-primary bg-opacity-10 hover:bg-opacity-25 text-purple-primary hover:text-purple-primary')}
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Group>
    </Modal>
  );
}

export default ModalConfirmation;
