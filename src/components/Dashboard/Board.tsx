/* eslint-disable react/jsx-props-no-spreading */
import {
  DragDropContext, Draggable, Droppable, DropResult,
} from '@hello-pangea/dnd';
import {
  Box, Button, Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { memo } from 'react';

import { useBoard } from '@/contexts/KanbanContext';
import { moveTaskToAnotherColumnApi, reorderColumns, reorderTasksInColumn } from '@/services/boardService';

import ModalEditBoard from '../modals/ModalEditBoard/ModalEditBoard';

import Column from './Column';
import ColumnSkeleton from './ColumnSkeleton';

function EmptyState({
  onClickNewColumn,
  className,
}: {
  onClickNewColumn?: () => void;
  className?: string;
}) {
  return (
    <Box className={`${className} flex-1 flex flex-col items-center justify-center gap-4`}>
      <Text className="text-medium-grey font-bold text-center">
        This board is empty. Create a new column to get started.
      </Text>
      <Button
        className="bg-purple-primary hover:bg-purple-secondary rounded-full duration-100 font-bold text-white text-sm"
        onClick={onClickNewColumn}
      >
        + Add New Column
      </Button>
    </Box>
  );
}

function AddNewColumnPlaceholder({
  onClick,
}: {
  onClick?: () => void;
}): React.ReactElement {
  return (
    <Box
      className="w-[280px] flex flex-col items-center justify-center bg-[#E9EFFA] dark:bg-[#2B2C37] my-12 rounded-lg cursor-pointer group"
      onClick={onClick}
    >
      <Text
        className="text-medium-grey font-bold text-xl group-hover:text-purple-primary duration-200"
      >
        + New Column
      </Text>
    </Box>
  );
}

function SprintBoard({
  className,
}: {
  className?: string;
}): React.ReactElement {
  const { board, boardId, isLoadingBoardData } = useBoard();
  const [openedEditBoardModal, { open: openEditBoardModal, close: closeEditBoardModal }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const reorderTasks = useMutation({
    mutationFn: reorderTasksInColumn,
    onSuccess: async () => {
      if (!boardId) return;
      await queryClient.invalidateQueries({
        queryKey: ['board', boardId],
      });
    },
  });

  const reorderColumnsInBoard = useMutation({
    mutationFn: reorderColumns,
    onSuccess: async () => {
      if (!boardId) return;
      await queryClient.invalidateQueries({
        queryKey: ['board', boardId],
      });
    },
  });

  const moveTaskToAnotherColumn = useMutation({
    mutationFn: moveTaskToAnotherColumnApi,
    onSuccess: async () => {
      if (!boardId) return;
      await queryClient.invalidateQueries({
        queryKey: ['board', boardId],
      });
    },
  });

  const onClickNewColumn = () => {
    openEditBoardModal();
  };
  const onDragEnd = (result: DropResult) => {
    const {
      destination, source,
    } = result;
    if (!destination || !source || !board) return;
    if (destination.droppableId === source.droppableId && destination.droppableId !== 'board') {
      // Reorder tasks in a column
      reorderTasks.mutate({
        columnId: source.droppableId,
        boardId: board.id,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });
    }
    // Reorder columns
    if (destination.droppableId === source.droppableId && source.droppableId === 'board') {
      reorderColumnsInBoard.mutate({
        boardId: board.id,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });
    }
    // Move task to another column
    if (destination.droppableId !== source.droppableId && source.droppableId !== 'board') {
      const sourceColumnIndex = board.columns.findIndex((column) => column.id === source.droppableId);
      const sourceColumn = board.columns[sourceColumnIndex];
      moveTaskToAnotherColumn.mutate({
        taskId: sourceColumn.tasks[source.index].id,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });
    }
  };
  return (
    <div className={className}>
      {
        board && board.columns.length === 0 && (
          <EmptyState onClickNewColumn={onClickNewColumn} />
        )
      }
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <Droppable
          droppableId="board"
          direction="horizontal"
          type="COLUMN"
        >
          {(dropProvided) => (
            <Box
              ref={dropProvided.innerRef}
              {...dropProvided.droppableProps}
              className="flex h-full space-x-4 mr-8"
            >
              {board && board.columns.map((column, index) => (
                <Draggable
                  draggableId={column.id}
                  index={index}
                  key={column.id}
                >
                  {(dragProvided) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      <Column
                        className="py-4"
                        column={column}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {dropProvided.placeholder}
              { isLoadingBoardData && <ColumnSkeleton /> }
              { !isLoadingBoardData && <AddNewColumnPlaceholder onClick={onClickNewColumn} /> }
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <ModalEditBoard
        opened={openedEditBoardModal}
        onClose={closeEditBoardModal}
        board={board || null}
      />
    </div>
  );
}

export default memo(SprintBoard);
