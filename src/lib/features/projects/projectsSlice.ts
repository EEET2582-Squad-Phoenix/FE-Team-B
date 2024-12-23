import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "@/types/Project";

const initialState: Project[] = [
  {
    id: "PRJ01",
    name: "Project 1",
    country: "Country 1",
    category: "Food",
    goalAmount: 10000,
    status: "Unapproved",
    isHighlighted: false,
    raisedAmount: 0,
    isGlobal: false,
    isFullyFunded: false,
    createdAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "PRJ02",
    name: "Project 2",
    country: "Country 2",
    category: "Food",
    goalAmount: 25000,
    status: "Active",
    isHighlighted: true,
    raisedAmount: 0,
    isGlobal: false,
    isFullyFunded: false,
    startedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "PRJ03",
    name: "Project 3",
    country: "Country 3",
    category: "Education",
    goalAmount: 15000,
    status: "Halted",
    isHighlighted: false,
    raisedAmount: 0,
    isGlobal: false,
    isFullyFunded: false,
    createdAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "PRJ04",
    name: "Project 4",
    country: "Country 4",
    category: "Health",
    goalAmount: 30000,
    status: "Unapproved",
    isHighlighted: false,
    raisedAmount: 0,
    isGlobal: false,
    isFullyFunded: false,
    createdAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
  },
  {
    id: "PRJ05",
    name: "Project 5",
    country: "Country 5",
    category: "Education",
    goalAmount: 20000,
    status: "Inactive",
    isHighlighted: false,
    raisedAmount: 0,
    isGlobal: false,
    isFullyFunded: false,
    createdAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
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
    approveProject: (state, action: PayloadAction<string>) => {
      const project = state.find((project) => project.id === action.payload);
      if (project) {
        project.status = "Active";
      }
    },
    haltProject: (state, action: PayloadAction<string>) => {
      const project = state.find((project) => project.id === action.payload);
      if (project) {
        project.status = "Halted";
      }
    },
  },
});

export const {
  addProject,
  deleteProject,
  updateProject,
  highlightProject,
  approveProject,
  haltProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
