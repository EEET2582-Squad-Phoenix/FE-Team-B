import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "@/types/Project";
import sendHttpRequest from "@/utils/http-call/HttpRequest";
import {
  PROJECT_ALL_URL,
  PROJECT_CREATE_URL,
  // PROJECT_HALT_URL,
} from "@/constants/service-url/project-url-config";

const initialState: Project[] = [];

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

export const createProject = createAsyncThunk<Project, Project>(
  "projects/createProject",
  async (newProject: Project) => {
    try {
      const response = await sendHttpRequest<Project>(PROJECT_CREATE_URL, {
        method: "POST",
        body: JSON.stringify(newProject),
      });
      if (response.status === 201) {
        return response.json as Project;
      } else {
        throw new Error(`Failed to create project: ${response.status}`);
      }
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
    // haltProject: (state, action: PayloadAction<string>) => {
    //   const project = state.projects.find(
    //     (project) => project.id === action.payload
    //   );
    //   if (project) {
    //     project.status = "HALTED";
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      // FETCH PROJECTS
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
      })
      // CREATE PROJECT
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to create project";
      });
  },
});

export const {
  addProject,
  deleteProject,
  updateProject,
  highlightProject,
  approveProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
