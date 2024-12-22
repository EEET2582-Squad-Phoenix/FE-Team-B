import { ProjectCategory, ProjectStatus } from "@/types/Project";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<ProjectCategory[]>) => {
      state.category = action.payload;
    },
    setStatus: (state, action: PayloadAction<ProjectStatus[]>) => {
      state.status = action.payload;
    },
  },
});

export const { setSearch, setCategory, setStatus } = filtersSlice.actions;
export default filtersSlice.reducer;