import { ProjectCategory, ProjectStatus } from "@/types/Project";
import { createSlice } from "@reduxjs/toolkit";

interface FiltersState {
  search: string;
  category: ProjectCategory[];
  status: ProjectStatus[];
}

const initialState: FiltersState = {
  search: "",
  category: [],
  status: [],
};

export const filtersSlice = createSlice({
  name: "projectList",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setSearch, setCategory, setStatus } = filtersSlice.actions;

export default filtersSlice.reducer;
