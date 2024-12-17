import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "@/types/Project";

const initialState: Project[] = [
  {
    id: "PRJ01",
    name: "Project 1",
    country: "Country 1",
    category: "Food",
    goal: "10,000$",
    status: "pending",
    isHighlighted: false,
  },
  {
    id: "PRJ02",
    name: "Project 2",
    country: "Country 2",
    category: "Food",
    goal: "25,000$",
    status: "approved",
    isHighlighted: true,
  },
  {
    id: "PRJ03",
    name: "Project 3",
    country: "Country 3",
    category: "Education",
    goal: "15,000$",
    status: "halted",
    isHighlighted: false,
  },
  {
    id: "PRJ04",
    name: "Project 4",
    country: "Country 4",
    category: "Health",
    goal: "30,000$",
    status: "pending",
    isHighlighted: false,
  },
  {
    id: "PRJ05",
    name: "Project 5",
    country: "Country 5",
    category: "Education",
    goal: "20,000$",
    status: "deleted",
    isHighlighted: false,
  },
];

export const projectsSlice = createSlice({
  name: "projectList",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.push(action.payload);
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      return state.filter((project) => project.id !== action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.findIndex(
        (project) => project.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    highlightProject: (state, action: PayloadAction<string>) => {
      const project = state.find((project) => project.id === action.payload);
      if (project) {
        project.isHighlighted = !project.isHighlighted;
      }
    },
  },
});

export const { addProject, deleteProject, updateProject, highlightProject } =
  projectsSlice.actions;

export default projectsSlice.reducer;
