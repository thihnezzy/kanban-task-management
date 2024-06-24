import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Board } from '@/@types/Board';

export interface BoardState {
  boards: Board[] | null;
}

const initialState: BoardState = {
  boards: null,
};

const boardSlice = createSlice({
  name: 'board/state',
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<Board[] | null>) => ({
      ...state,
      boards: action.payload,
    }),
  },
});

export const {
  setBoards,
} = boardSlice.actions;

export default boardSlice.reducer;

export const persistedBoardKey = [
];
