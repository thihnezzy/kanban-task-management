/* eslint-disable react/jsx-props-no-spreading */
import {
  Draggable, Droppable, DroppableProvided, DroppableStateSnapshot,
} from '@hello-pangea/dnd';
import {
  Box, ColorSwatch, Text,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import React, { memo } from 'react';

import type { Column } from '@/@types/Column';
import queryFunctions from '@/services/queryFunctions';

import TaskItem from './TaskItem';

interface ColumnHeaderProps {
  title: string;
  color: string;
  totalItems: number;
}

function ColumnHeader(props: ColumnHeaderProps): React.ReactElement {
  const { title, totalItems, color } = props;
  return (
    <div className="flex items-center gap-2 px-4">
      <ColorSwatch color={color ?? 'blue'} size={8} />
      <Text className="uppercase tracking-wider text-medium-grey font-semibold text-sm">
        {title}
        {' '}
        (
        {totalItems}
        )
      </Text>
    </div>
  );
}
const InnerList = memo(({ items } : { items: Column['tasks'] }) => (
  <div className="w-[280px] text-wrap space-y-4 max-h-[calc(100dvh-170px)] overflow-y-auto">
    {items.map((item, index) => (
      <Draggable
        key={item.id}
        draggableId={item.id}
        index={index}
      >
        {(dragProvided) => (
          <TaskItem
            item={item}
            dragProvided={dragProvided}
          />
        )}
      </Draggable>
    ))}
  </div>
));

function SprintColumn({
  className,
  // column,
  columnId,
}: {
  className?: string;
  // column: Column;
  columnId: string;
}): React.ReactElement {
  const { data: column } = useQuery<Column, Error>({
    queryKey: ['column', columnId],
    queryFn: () => queryFunctions({ url: `/columns/${columnId}` }),
    enabled: !!columnId,
  });
  if (!column) return <div />;
  return (
    <div className={`${className} space-y-4`}>
      <ColumnHeader
        title={column.name}
        color="blue"
        totalItems={column.tasks.length}
      />
      <Droppable droppableId={column.id}>
        {(
          dropProvided : DroppableProvided,
          dropSnapshot: DroppableStateSnapshot,
        ) => (
          <Box
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
            className={clsx(
              'rounded-lg p-4',
              'border-solid border-[1px] border-transparent hover:border-lines-light hover:dark:border-lines-dark',
              {
                'bg-slate-300 dark:bg-gray-500': dropSnapshot.isDraggingOver,
                'bg-slate-200 dark:bg-gray-400': dropSnapshot.draggingFromThisWith,
              },
            )}
          >
            <InnerList
              items={column.tasks || []}
            />
            {dropProvided.placeholder}
          </Box>
        )}
      </Droppable>
    </div>
  );
}

export default SprintColumn;
