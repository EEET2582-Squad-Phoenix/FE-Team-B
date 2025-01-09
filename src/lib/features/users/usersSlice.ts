import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/User";
import {
  DONOR_ALL_URL,
  DONOR_CREATE_URL,
  DONOR_UPDATE_URL,
  DONOR_DELETE_URL,
  CHARITY_ALL_URL,
  CHARITY_CREATE_URL,
  CHARITY_UPDATE_URL,
  CHARITY_DELETE_URL,
} from "@/constants/service-url/user-url-config";

const initialState: User[] = [];

interface UsersState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  users: User[];
}

export const usersSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      return state.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<Omit<User, "updatedAt">>) => {
      const index = state.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = {
          ...state[index], // Preserve existing fields
          ...action.payload, // Apply changes from the payload
          updatedAt: new Date().toISOString(), // Set updatedAt to the current time
        };
      }
    },
    // highlightUser: (state, action: PayloadAction<string>) => {
    //   const user = state.find((user) => user.id === action.payload);
    //   if (user) {
    //     user.isHighlighted = !user.isHighlighted;
    //   }
    // },
  },
});

export const { addUser, deleteUser, updateUser } =
  usersSlice.actions;

export default usersSlice.reducer;
