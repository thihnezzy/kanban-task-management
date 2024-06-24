import {
  Box, Button, Modal, Text,
} from '@mantine/core';
import React from 'react';

interface ModalConfirmationProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  type: 'danger'
}

function ModalConfirmation(props: Readonly<ModalConfirmationProps>): React.ReactElement {
  const {
    opened,
    onClose,
    onConfirm,
    title,
    description,
  } = props;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
    >
      <Box>
        <Text>
          {description}
        </Text>
      </Box>
      <Box
        className="w-full flex items-center gap-2"
      >
        <Button
          className=""
          onClick={onConfirm}
        >
          Delete
        </Button>
        <Button
          className="ml"
          onClick={onClose}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}

export default ModalConfirmation;
