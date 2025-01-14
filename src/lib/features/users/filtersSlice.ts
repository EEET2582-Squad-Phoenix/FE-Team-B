// "@/lib/features/users/filtersSlice.ts"
import { UserRoleType } from "@/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  search: string;
  role: UserRoleType[]; // Ensure this exists
}

const initialState: FiltersState = {
  search: "",
  role: ["DONOR", "CHARITY"], // Default roles
};

export const userFiltersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setRole: (state, action: PayloadAction<UserRoleType[]>) => {
      state.role = action.payload;
    },
  },
});

export const { setSearch, setRole } = userFiltersSlice.actions;

export default userFiltersSlice.reducer;
