import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/User";
import {
  ACCOUNT_ALL_URL
} from "@/constants/service-url/user-url-config";
import sendHttpRequest from "@/utils/http-call/HttpRequest";

const initialState: User[] = [];

interface UserListState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  users: User[];
}

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    try {
      const response = await sendHttpRequest<User[]>(ACCOUNT_ALL_URL);
      if (response.status === 200) {
        console.log("Fetch users called", response.json);
        return response.json as User[];
      }
      throw new Error(`Failed to fetch users: ${response.status}`);
    } catch (error) {
      throw error;
    }
  }
);


export const usersSlice = createSlice({
  name: "userList",
  initialState: {
    status: "idle",
    error: null,
    users: initialState,
  } as UserListState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
          state.users.push(action.payload);
    },
    // highlightUser: (state, action: PayloadAction<string>) => {
    //   const user = state.find((user) => user.id === action.payload);
    //   if (user) {
    //     user.isHighlighted = !user.isHighlighted;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      // FETCH PROJECTS
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.status = "succeeded";
          state.users = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch users";
      });
  }
});

export const {
  // addUser,
  // deleteProject,
  // updateProject,
  // highlightProject,
  // approveProject,
} = usersSlice.actions;

export default usersSlice.reducer;
