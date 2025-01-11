import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HaltProjectPayload, Project } from "@/types/Project";
import sendHttpRequest from "@/utils/http-call/HttpRequest";
import {
  PROJECT_ADMIN_DELETE_URL,
  PROJECT_ALL_URL,
  PROJECT_CREATE_URL,
  PROJECT_GET_URL,
  PROJECT_HALT_URL,
} from "@/constants/service-url/project-url-config";
import { Page } from "@/types/Page";

const initialState: Project[] = [];

interface ProjectListState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  projects: Project[];
  totalPages?: number;
  currentPage?: number;
  totalCount?: number;
}

export const fetchAllProjects = createAsyncThunk<Project[]>(
  "projects/fetchAllProjects",
  async () => {
    try {
      const response = await sendHttpRequest<Project[]>(PROJECT_ALL_URL);
      if (response.status === 200) {
        console.log("Fetch projects called", response.json);
        return response.json as Project[];
      }
      throw new Error(`Failed to fetch projects: ${response.status}`);
    } catch (error) {
      throw error;
    }
  }
);

export const fetchProjects = createAsyncThunk<Project[], Page>(
  "projects/fetchProjects",
  async (page: Page) => {
    try {
      const response = await sendHttpRequest<Project[]>(`${PROJECT_GET_URL}?page=${page.currentPage}`);
      if (response.status === 200) {
        console.log("Fetch projects called", response.json);
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
      console.log("createProject called");
      const response = await sendHttpRequest<Project>(PROJECT_CREATE_URL, {
        method: "POST",
        body: JSON.stringify(newProject),
      });
      console.log("createProject response", response);
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

export const haltProject = createAsyncThunk<Project, HaltProjectPayload>(
  "projects/haltProject",
  async ({
    projectId,
    haltedReasonAdmin,
    haltedReasonCharity,
  }: HaltProjectPayload) => {
    try {
      console.log("haltProject called");
      const response = await sendHttpRequest<Project>(PROJECT_HALT_URL, {
        method: "POST",
        body: JSON.stringify({
          projectId,
          haltedReasonAdmin,
          haltedReasonCharity,
        }),
      });

      console.log("haltProject response", response);

      if (response.status === 200) {
        return response.json as Project;
      } else {
        throw new Error(`Failed to halt project: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId: string) => {
    try {
      console.log("deleteProject called");

      const response = await sendHttpRequest<Project>(
        PROJECT_ADMIN_DELETE_URL,
        {
          method: "POST",
          body: JSON.stringify({ projectId }),
        }
      );
      console.log("deleteProject response", response);
      if (response.status === 200) {
        return projectId;
      } else {
        throw new Error(`Failed to delete project: ${response.status}`);
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
    // deleteProject: (state, action: PayloadAction<string>) => {
    //   state.projects = state.projects.filter(
    //     (project) => project.id !== action.payload
    //   );
    // },
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
      // FETCH PROJECTS
      .addCase(fetchAllProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.status = "succeeded";
          state.projects = action.payload;
        }
      )
      .addCase(fetchAllProjects.rejected, (state, action) => {
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
      })
      // HALT PROJECT
      .addCase(haltProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.projects.findIndex(
          (project) => project.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(haltProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to halt project";
      })
      // DELETE PROJECT
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {
  addProject,
  // deleteProject,
  updateProject,
  highlightProject,
  approveProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
