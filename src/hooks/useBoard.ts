import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Board } from '@/@types/Board';
import { fetchBoardById, fetchBoards } from '@/services/boardService';

const useBoard = () => {
  const { id: boardId } = useParams<{ id: string }>();
  const [board, setBoard] = React.useState<Board | null>(null);
  const [boards, setBoards] = React.useState<Board[]>([]);
  useEffect(() => {
    if (!boardId) return;
    fetchBoardById(boardId).then((data) => {
      setBoard(data.data as Board);
    });
  }, [boardId]);
  useEffect(() => {
    fetchBoards().then((data) => {
      setBoards(data.data as Board[]);
    });
  }, []);
  return (
    {
      boardId,
      board,
      boards,
      setBoards,
      setBoard,
    }
  );
};

export default useBoard;
