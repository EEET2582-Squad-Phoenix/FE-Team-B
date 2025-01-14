// "@/lib/features/projects/filtersSlice.ts"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {
//   ProjectCategoryType,
//   ProjectProgressType,
//   ProjectStatusType,
// } from "@/types/Project";

interface FiltersState {
  search: string;
}

const initialState: FiltersState = {
  search: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const {
  setSearch,
} = filtersSlice.actions;

export default filtersSlice.reducer;
