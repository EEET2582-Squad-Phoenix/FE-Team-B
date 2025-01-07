import {
  ProjectCategory,
  ProjectProgressType,
  ProjectStatus,
} from "@/types/Project";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  search: string;
  category: ProjectCategory[];
  status: ProjectStatus[];
  progress: ProjectProgressType[];
}

const initialState: FiltersState = {
  search: "",
  category: [],
  status: [],
  progress: [],
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
    setProgress: (state, action: PayloadAction<ProjectProgressType[]>) => {
      state.progress = action.payload;
    },
  },
});

export const { setSearch, setCategory, setStatus, setProgress } =
  filtersSlice.actions;
export default filtersSlice.reducer;
