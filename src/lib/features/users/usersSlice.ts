import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/User";
import {
  ACCOUNT_ALL_URL,
  CHARITY_SERVICE_URL_B,
  DONOR_SERVICE_URL_B
} from "@/constants/service-url/user-url-config";
import sendHttpRequest from "@/utils/http-call/HttpRequest";
import { Donor } from "@/types/Donor";
import { Charity } from "@/types/Charity";
import { emit } from "process";

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

export const createUser = createAsyncThunk<any, any>(
  "projects/createUser",
  async (newUser) => {
    try {
      console.log("createUser called");

      if(newUser.role === "CHARITY"){
        const response = await sendHttpRequest<Charity>(CHARITY_SERVICE_URL_B, {
          method: "POST",
          body: JSON.stringify(
          {
            email: newUser.email,
            password: newUser.password,
            name: newUser.name,
            address: newUser.address,
            taxCode: newUser.taxCode,
            logoUrl: newUser.logoUrl,
            introVidUrl: newUser.introVidUrl,
            charityType: newUser.charityType
          }),
        })

        console.log("createUser response", response);
        if (response.status === 201) {
          return response.json as User;
        } else {
          throw new Error(`Failed to create charity: ${response.status}`);
        }
      }else {
        const response = await sendHttpRequest<Donor>(DONOR_SERVICE_URL_B, {
          method: "POST",
          body: JSON.stringify({
            email: newUser.email,
            password: newUser.password,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            avatarUrl: newUser.avatarUrl,
            introVidUrl: newUser.introVidUrl,
            address: newUser.address
          }),
        });

        console.log("createUser response", response);
        if (response.status === 201) {
          return response.json as User;
        } else {
          throw new Error(`Failed to create donor: ${response.status}`);
        }
      }

     
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
      // FETCH USERS
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
      })
      // CREATE USER
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to create user";
      });
  }
});

export const {
  // addUser,
  // deleteUser,
  // updateUser,
  // highlightUser,
  // approveUser,
} = usersSlice.actions;

export default usersSlice.reducer;
