import type { Board } from '@/@types/Board';

import data from './data.json';

export async function fetchBoards() {
  return data.boards as Board[];
}

export async function fetchBoardById(id: string) {
  return data.boards.find((board) => board.id === id) as Board;
}

export async function createBoard(board: Board) {
  data.boards.push(board);
  return board;
}

export async function updateBoard(board: Board) {
  const index = data.boards.findIndex((b) => b.id === board.id);
  if (index === -1) throw new Error('Board not found');
  data.boards[index] = board;
  return board;
}

export async function deleteBoard(id: string) {
  const index = data.boards.findIndex((board) => board.id === id);
  if (index === -1) throw new Error('Board not found');
  return data.boards.splice(index, 1);
}
