/* eslint-disable react/jsx-props-no-spreading */
import { DraggableProvided } from '@hello-pangea/dnd';
import {
  Box, LoadingOverlay, Text, Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';

import type { Task } from '@/@types/Task';

interface TaskItemProps {
  item: Task;
  dragProvided: DraggableProvided;
}

const ModalTaskView = React.lazy(() => import('../modals/ModalTaskView/ModalTaskView'));

function TaskItem(props: TaskItemProps): React.ReactElement {
  const { dragProvided, item } = props;
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <div
        ref={dragProvided.innerRef}
        className="cursor-pointer"
        {...dragProvided.draggableProps}
        {...dragProvided.dragHandleProps}
      >
        <Box
          className="border-solid border-[1px] border-transparent hover:border-lines-light hover:dark:border-lines-dark
          bg-white dark:bg-dark-grey rounded-md p-4 mb-2 shadow-md hover:shadow-lg duration-100"
          onClick={open}
        >
          <Title order={6} className="font-bold line-clamp-3">
            {item.title}
          </Title>
          <Text size="xs" c="dimmed" className="font-bold">
            {item.subtasks.length}
            {' '}
            subtasks
          </Text>
        </Box>
      </div>
      <React.Suspense fallback={<LoadingOverlay />}>
        <ModalTaskView item={item} opened={opened} onClose={close} />
      </React.Suspense>
    </>
  );
}

export default TaskItem;
