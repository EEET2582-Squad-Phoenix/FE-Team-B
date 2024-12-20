import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/User";

const initialState: User[] = [
  // {
  //   id: "PRJ01",
  //   email: "User 1",
  //   country: "Country 1",
  //   category: "Food",
  //   goal: 10000,
  //   status: "Pending",
  //   isHighlighted: false,
  // },
  // {
  //   id: "PRJ02",
  //   name: "User 2",
  //   country: "Country 2",
  //   category: "Food",
  //   goal: 25000,
  //   status: "Approved",
  //   isHighlighted: true,
  // },
  // {
  //   id: "PRJ03",
  //   name: "User 3",
  //   country: "Country 3",
  //   category: "Education",
  //   goal: 15000,
  //   status: "Halted",
  //   isHighlighted: false,
  // },
  // {
  //   id: "PRJ04",
  //   name: "User 4",
  //   country: "Country 4",
  //   category: "Health",
  //   goal: 30000,
  //   status: "Pending",
  //   isHighlighted: false,
  // },
  // {
  //   id: "PRJ05",
  //   name: "User 5",
  //   country: "Country 5",
  //   category: "Education",
  //   goal: 20000,
  //   status: "Deleted",
  //   isHighlighted: false,
  // },
];

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
