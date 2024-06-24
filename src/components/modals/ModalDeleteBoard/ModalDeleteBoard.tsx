import { Button, Modal, Text } from '@mantine/core';
import React from 'react';

interface ModalDeleteBoardProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  boardTitle: string | undefined;
}

function ModalDeleteBoard(props: ModalDeleteBoardProps): React.ReactElement {
  const {
    boardTitle, onClose, onConfirm, opened,
  } = props;
  return (
    <Modal
      title="Delete this board?"
      radius={6}
      classNames={{
        root: 'bg-white dark:bg-dark-grey',
        title: 'text-red-primary font-bold text-lg',
      }}
      onClose={onClose}
      withCloseButton={false}
      opened={opened}
      size="lg"
      centered
    >
      <Modal.Body>
        <Text className="text-medium-grey mb-6">
          Are you sure you want to delete the
          &lsquo;
          {boardTitle ?? ''}
          &rsquo;
          board? This action will remove all columns and tasks and cannot be reversed.
        </Text>
        <div className="flex items-center gap-4">
          <Button
            variant="filled"
            className="w-full text-sm bg-red-primary rounded-full duration-100 hover:bg-red-primary hover:bg-opacity-80
                font-bold text-white"
            onClick={onConfirm}
          >
            Delete
          </Button>
          <Button
            variant="filled"
            className="w-full text-sm bg-purple-primary bg-opacity-10 dark:bg-white dark:bg-opacity-100
                rounded-full duration-100 dark:hover:bg-slate-200 hover:bg-purple-primary hover:bg-opacity-25
                font-bold text-purple-primary hover:text-purple-primary"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDeleteBoard;
