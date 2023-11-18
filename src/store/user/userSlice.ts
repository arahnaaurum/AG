import { RootState } from '..';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserResponse } from '../../types/user';
import { fetchAllUsers, fetchUserById } from '../../features/userAPI';

type UserState = {
  user: User | undefined;
  userList: User[];
  totalPages: number;
}

export const initialState: UserState = {
  user: undefined,
  userList: [],
  totalPages: 0,
};

export const fetchUsersWithThunk = createAsyncThunk(
  'user/fetchUsers',
  async (pageNumber?: number) => {
    const response = await fetchAllUsers(pageNumber);
    return response;
  }
);

export const fetchMoreUsersWithThunk = createAsyncThunk(
  'user/fetchMoreUsers',
  async (pageNumber?: number) => {
    const response = await fetchAllUsers(pageNumber);
    return response;
  }
);

export const fetchUserByIdWithThunk = createAsyncThunk(
  'user/fetchUserById',
  async (id: number) => {
    const response = await fetchUserById(id);
    return response;
  }
);


export const UserSlice = createSlice({
  name: "user",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUsersWithThunk.fulfilled,
        (
          state: UserState,
          action: PayloadAction<UserResponse | undefined>
        ) => {
          if (action.payload) {
            state.userList = [...action.payload.data];
            state.totalPages = action.payload.total_pages;
          }
        }
      )
      .addCase(
        fetchMoreUsersWithThunk.fulfilled,
        (
          state: UserState,
          action: PayloadAction<UserResponse | undefined>
        ) => {
          if (action.payload) {
            state.userList = [...state.userList, ...action.payload.data];
          }
        }
      )
      .addCase(
        fetchUserByIdWithThunk.fulfilled,
        (
          state: UserState,
          action: PayloadAction<User | undefined>
        ) => {
          if (action.payload) {
            state.user = action.payload;
          }
        }
      )
  },
});

export default UserSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
export const selectUsers = (state: RootState) => state.user.userList;
export const selectTotalPages = (state: RootState) => state.user.totalPages;