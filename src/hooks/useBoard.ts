/**
 * React.ReactElement vs React.ReactNode
 * source: https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement
 */
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { Board } from '@/@types/Board';
import queryFunctions from '@/services/queryFunctions';
import useAuthStore from '@/store';

interface useBoardProps {
  board: Board | undefined;
  boards: Board[] | undefined;
  boardId: string | undefined;
  isLoadingBoardData?: boolean;
}

const useBoard = (): useBoardProps => {
  const isAuthenticated = useAuthStore((state) => !!state.accessToken && !!state.user);
  const location = useLocation();
  const id = location.pathname.split('dashboard/')[1];
  
  const { data: boards } = useQuery<Board[], Error>({
    queryKey: ['boards'],
    queryFn: () => queryFunctions({ url: '/boards' }),
    enabled: isAuthenticated,
  });
  
  const { data: board, isLoading: isLoadingBoardData } = useQuery<Board, Error>({
    queryKey: ['board', id],
    queryFn: async () => {
      const res = await queryFunctions({ url: `/boards/${id}` });
      return (res as { board: Board }).board;
    },
    enabled: isAuthenticated && !!id,
  });

  return {
    board,
    boards,
    boardId: id,
    isLoadingBoardData,
  }
}

export default useBoard;
