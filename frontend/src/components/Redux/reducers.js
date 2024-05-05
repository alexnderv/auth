import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersAction: (state, action) => {
      state.users = action.payload;
    },
    addUserAction: (state, action) => {
      state.users.push(action.payload);
    },
    editUserAction: (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      state.users[index] = action.payload;
    },
    deleteUserAction: (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload);
      state.users.splice(index, 1);
    },
  },
});

export const { setUsersAction, addUserAction, editUserAction, deleteUserAction } = userSlice.actions;
export default userSlice.reducer;