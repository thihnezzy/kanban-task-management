import { Modal } from '@mantine/core'
import React from 'react'

interface ModalAddNewColumnProps {
    opened: boolean;
    onClose: () => void;
}

const ModalAddNewColumn = (props: Readonly<ModalAddNewColumnProps>) => {
  const { opened, onClose } = props;
  return (
    <Modal 
        opened={opened} 
        onClose={onClose}>

    </Modal>
  )
}

export default ModalAddNewColumn