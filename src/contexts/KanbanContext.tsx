/**
 * React.ReactElement vs React.ReactNode
 * source: https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement
 */
import { useQuery } from '@tanstack/react-query';
import React, {
  createContext, useContext, useEffect, useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';

import { Board } from '@/@types/Board';
import queryFunctions from '@/services/queryFunctions';

interface KanbanContextProps {
  board: Board | null;
  setBoard: (board: Board) => void;
  boards: Board[] | [];
  setBoards: (boards: Board[]) => void;
  boardId: string | undefined;
}

const initialValues: KanbanContextProps = {
  board: null,
  setBoard: () => {},
  boards: [],
  setBoards: () => {},
  boardId: undefined,
};

const KanbanContext = createContext<KanbanContextProps>(initialValues);

export const useBoard = () => {
  const context = useContext(KanbanContext);
  if (!context) throw new Error('useKanban must be used within a KanbanProvider');
  return context;
};

function KanbanProvider({ children }: {
  children: React.ReactNode;
}): React.ReactElement {
  const location = useLocation();
  const id = location.pathname.split('/')[1];
  const { data: boards } = useQuery<Board[], Error>({
    queryKey: ['boards'],
    queryFn: () => queryFunctions({ url: '/boards' }),
  });
  const { data: board } = useQuery<Board, Error>({
    queryKey: ['board', id],
    queryFn: () => queryFunctions({ url: `/boards/${id}` }),
    enabled: !!id,
  });
  console.log('board', board);
  
  const values = useMemo(() => ({
    board,
    boards,
    boardId: id,
  }), [board, boards, id]);

  return (
    <KanbanContext.Provider value={values}>
      {children}
    </KanbanContext.Provider>
  );
}

export default KanbanProvider;
