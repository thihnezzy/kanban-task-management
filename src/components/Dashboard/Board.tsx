/* eslint-disable react/jsx-props-no-spreading */
import {
  DragDropContext, Draggable, Droppable, DropResult,
} from '@hello-pangea/dnd';
import {
  Box, Button, Text,
} from '@mantine/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import type { Board } from '@/@types/Board';
import insertItemAt from '@/util/insertItemAt';
import reorder from '@/util/reorder';

import { fetchBoardById, updateBoard } from '../../data/data';

import Column from './Column';

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

function SprintBoard({
  className,
}: {
  className?: string;
}) {
  const [board, setBoard] = React.useState<Board | null>(null);
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!id) return;
    fetchBoardById(id).then((data) => {
      setBoard(data);
    });
  }, [id]);
  const onClickNewColumn = () => {
  };
  /**
v columns: Array(3)
> 0:{id: 'board-1-column-1', name: 'Todo', tasks: Array(4)}
> 1:{id: 'board-1-column-2', name: 'Doing', tasks: Array(6)}
> 2:{id: 'board-1-column-3', name: 'Done', tasks: Array(14)}
 */
  const onDragEnd = (result: DropResult) => {
    const {
      destination, source,
    } = result;
    if (!destination || !source || !board) return;
    console.log('source', source);
    console.log('destination', destination);
    if (destination.droppableId === source.droppableId && destination.droppableId !== 'board') {
      const columnIndex = board.columns.findIndex((column) => column.id === source.droppableId);
      // Reorder tasks in a column
      const newTasks = reorder(board.columns[columnIndex].tasks, source.index, destination.index);
      const newBoard = {
        ...board,
        columns: board.columns.map((column, index) => {
          if (index === columnIndex) {
            return {
              ...column,
              tasks: newTasks,
            };
          }
          return column;
        }),
      };
      setBoard(newBoard);
      updateBoard(newBoard);
    }
    // Reorder columns
    if (destination.droppableId === source.droppableId && source.droppableId === 'board') {
      const newColumns = reorder(board.columns, source.index, destination.index);
      const newBoard = {
        ...board,
        columns: newColumns,
      };
      setBoard(newBoard);
      updateBoard(newBoard);
    }
    // Move task to another column
    if (destination.droppableId !== source.droppableId && source.droppableId !== 'board') {
      const sourceColumnIndex = board.columns.findIndex((column) => column.id === source.droppableId);
      const destinationColumnIndex = board.columns.findIndex((column) => column.id === destination.droppableId);
      const sourceColumn = board.columns[sourceColumnIndex];
      const destinationColumn = board.columns[destinationColumnIndex];
      const newSourceTasks = sourceColumn.tasks.filter((_, index) => index !== source.index);
      // add new task to destination column
      const newDestinationTasks = insertItemAt(destinationColumn.tasks, destination.index, sourceColumn.tasks[source.index]);
      const newBoard = {
        ...board,
        columns: board.columns.map((column, index) => {
          if (index === sourceColumnIndex) {
            return {
              ...column,
              tasks: newSourceTasks,
            };
          }
          if (index === destinationColumnIndex) {
            return {
              ...column,
              tasks: newDestinationTasks,
            };
          }
          return column;
        }),
      };
      setBoard(newBoard);
      updateBoard(newBoard);
    }
  };

  return (
    <div className={className}>
      {
        !board && (
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
              className="flex h-full space-x-4"
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
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default SprintBoard;
