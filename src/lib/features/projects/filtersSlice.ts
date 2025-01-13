// "@/lib/features/projects/filtersSlice.ts"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ProjectCategoryType,
  ProjectProgressType,
  ProjectStatusType,
} from "@/types/Project";

interface FiltersState {
  search: string;
  categories: ProjectCategoryType[];
  status: ProjectStatusType[];
  progress: ProjectProgressType[];
  highlight: boolean[];
  isGlobal: boolean[];
}

const initialState: FiltersState = {
  search: "",
  categories: [],
  status: [],
  progress: [],
  highlight: [],
  isGlobal: [],
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<ProjectCategoryType[]>) => {
      state.categories = action.payload;
    },
    setStatus: (state, action: PayloadAction<ProjectStatusType[]>) => {
      state.status = action.payload;
    },
    setProgress: (state, action: PayloadAction<ProjectProgressType[]>) => {
      state.progress = action.payload;
    },
    setHighlight: (state, action: PayloadAction<boolean[]>) => {
      state.highlight = action.payload;
    },
    setIsGlobal: (state, action: PayloadAction<boolean[]>) => {
      state.isGlobal = action.payload;
    },
  },
});

export const {
  setSearch,
  setCategory,
  setStatus,
  setProgress,
  setHighlight,
  setIsGlobal,
} = filtersSlice.actions;

export default filtersSlice.reducer;
