import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "@/types/Project";
import sendHttpRequest from "@/utils/http-call/HttpRequest";
import { PROJECT_ALL_URL } from "@/constants/service-url/project-url-config";

const initialState: Project[] = [
  {
    id: "PRJ01",
    name: "Project 1",
    country: "Country 1",
    category: "FOOD",
    goalAmount: 10000,
    status: "UNAPPROVED",
    isHighlighted: false,
    raisedAmount: 0,
    region: "GLOBAL",
    fundStatus: "ON-GOING",
    createdAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "PRJ02",
    name: "Project 2",
    country: "Country 2",
    category: "FOOD",
    goalAmount: 25000,
    status: "ACTIVE",
    isHighlighted: true,
    raisedAmount: 25000,
    region: "REGIONAL",
    fundStatus: "ON-GOING",
    startedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "PRJ03",
    name: "Project 3",
    country: "Country 3",
    category: "EDUCATION",
    goalAmount: 15000,
    status: "HALTED",
    isHighlighted: false,
    raisedAmount: 15000,
    region: "GLOBAL",
    fundStatus: "ON-GOING",
    createdAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "PRJ04",
    name: "Project 4",
    country: "Country 4",
    category: "HEALTH",
    goalAmount: 30000,
    status: "UNAPPROVED",
    isHighlighted: false,
    raisedAmount: 0,
    region: "REGIONAL",
    fundStatus: "ON-GOING",
    createdAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
  },
  {
    id: "PRJ05",
    name: "Project 5",
    country: "Country 5",
    category: "EDUCATION",
    goalAmount: 20000,
    status: "INACTIVATED",
    isHighlighted: false,
    raisedAmount: 0,
    region: "GLOBAL",
    fundStatus: "ON-GOING",
    createdAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
  },
];

interface ProjectListState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  projects: Project[];
}

export const fetchProjects = createAsyncThunk<Project[]>(
  "projects/fetchProjects",
  async () => {
    try {
      const response = await sendHttpRequest<Project[]>(PROJECT_ALL_URL);
      if (response.status === 200) {
        console.log(response.json);
        return response.json as Project[];
      }
      throw new Error(`Failed to fetch projects: ${response.status}`);
    } catch (error) {
      throw error;
    }
  }
);

export const projectsSlice = createSlice({
  name: "projectList",
  initialState: {
    status: "idle",
    error: null,
    projects: initialState,
  } as ProjectListState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    highlightProject: (state, action: PayloadAction<string>) => {
      const project = state.projects.find(
        (project) => project.id === action.payload
      );
      if (project) {
        project.isHighlighted = !project.isHighlighted;
      }
    },
    approveProject: (state, action: PayloadAction<string>) => {
      const project = state.projects.find(
        (project) => project.id === action.payload
      );
      if (project) {
        project.status = "ACTIVE";
      }
    },
    haltProject: (state, action: PayloadAction<string>) => {
      const project = state.projects.find(
        (project) => project.id === action.payload
      );
      if (project) {
        project.status = "HALTED";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.status = "succeeded";
          state.projects = action.payload;
        }
      )
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch projects";
      });
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
