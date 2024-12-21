/**
 * React.ReactElement vs React.ReactNode
 * source: https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement
 */
import { useQuery } from '@tanstack/react-query';
import React, {
  createContext, useContext, useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';

import { Board } from '@/@types/Board';
import queryFunctions from '@/services/queryFunctions';

interface KanbanContextProps {
  board: Board | undefined;
  boards: Board[] | undefined;
  boardId: string | undefined;
  isLoadingBoardData?: boolean;
}

const initialValues: KanbanContextProps = {
  board: undefined,
  boards: undefined,
  boardId: undefined,
  isLoadingBoardData: false,
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
  const { data: board, isLoading: isLoadingBoardData } = useQuery<Board, Error>({
    queryKey: ['board', id],
    queryFn: async () => {
      const res = await queryFunctions({ url: `/boards/${id}` });
      return (res as { board: Board }).board;
    },
    enabled: !!id,
  });
  const values = useMemo(() => ({
    board,
    boards,
    boardId: id,
    isLoadingBoardData,
  }), [board, boards, id, isLoadingBoardData]);

  return (
    <KanbanContext.Provider value={values}>
      {children}
    </KanbanContext.Provider>
  );
}

export default KanbanProvider;
