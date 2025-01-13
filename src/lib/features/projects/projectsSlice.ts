import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HaltProjectPayload, Project } from "@/types/Project";
import sendHttpRequest from "@/utils/http-call/HttpRequest";
import {
  PROJECT_DELETE_URL,
  // PROJECT_ALL_URL,
  PROJECT_APPROVE_URL,
  PROJECT_CREATE_URL,
  PROJECT_TOGGLE_HIGHLIGHTED_URL,
  PROJECT_UPDATE_URL,
  PROJECT_DEACTIVATE_URL,
  PROJECT_RESTORE_URL,
  PROJECT_TOGGLE_HALTED_URL,
  PROJECT_PAGINATION_URL,
} from "@/constants/service-url/project-url-config";

const initialState: Project[] = [];

interface ProjectListState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  projects: Project[];
}

// export const fetchProjects = createAsyncThunk<Project[]>(
//   "projects/fetchProjects",
//   async () => {
//     try {
//       const response = await sendHttpRequest<Project[]>(PROJECT_PAGINATION_URL);
//       if (response.status === 200) {
//         console.log("Fetch projects called", response.json);
//         return response.json as Project[];
//       }
//       throw new Error(`Failed to fetch projects: ${response.status}`);
//     } catch (error) {
//       throw error;
//     }
//   }
// );

export const fetchProjects = createAsyncThunk<Project[], void>(
  "projects/fetchProjects",
  async () => {
    try {
      const response = await sendHttpRequest<{ data: Project[] }>(
        PROJECT_PAGINATION_URL
      );

      if (response.status === 200) {
        const projects = response.json.data.map((project) => ({
          id: project._id, // Map _id to id
          charityId: project.charityID,
          name: project.name,
          imageURLs: project.imageURLs,
          videoURLs: project.videoURLs,
          description: project.description,
          country: project.country,
          goalAmount: project.goalAmount,
          raisedAmount: project.raisedAmount,
          isGlobal: project.isGlobal,
          categories: project.categories,
          status: project.status,
          haltedMessage: project.haltedMessage,
          isHighlighted: project.isHighlighted,
          fundStatus: project.fundStatus,
          startDate: project.startDate,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
          endDate: project.endDate,
          deletionReason: project.deletionReason,
          donorList: project.donorList,
        }));
        console.log("Fetched projects:", projects);
        return projects;
      } else {
        console.error("Error fetching projects:", response);
        // throw new Error(
        //   `Failed to fetch projects: ${response.status} - ${response.error}`
        // );
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      // throw new Error(`Failed to fetch projects: ${error}`);
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
        body: JSON.stringify({
          name: newProject.name,
          description: newProject.description,
          goalAmount: newProject.goalAmount,
          isGlobal: newProject.isGlobal,
          country: newProject.country,
          categories: newProject.categories,
          startDate: newProject.startDate,
          endDate: newProject.endDate,
          charityId: "0b35a796",
        }),
      });
      console.log("createProject response", response);
      if (response.status === 201) {
        return response.json as Project;
      } else {
        console.error("Error creating projects:", response);
        throw new Error(`Failed to create project: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating projects:", error);
      throw error;
    }
  }
);

export const updateProject = createAsyncThunk<Project, Project>(
  "projects/updateProject",
  async (updatedProject: Project, { rejectWithValue }) => {
    try {
      console.log("updateProject called", updatedProject);
      const response = await sendHttpRequest<Project>(PROJECT_UPDATE_URL, {
        method: "PUT",
        body: JSON.stringify({
          ...updatedProject,
          projectId: updatedProject.id,
        }),
      });
      console.log("updateProject response", response);
      if (response.status === 200) {
        return response.json as Project;
      } else {
        console.error("Error fetching projects:", response);
        return rejectWithValue(`Failed to update project: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating projects:", error);
      return rejectWithValue(`Failed to update project: ${error}`);
    }
  }
);

export const toggleHaltProject = createAsyncThunk<Project, HaltProjectPayload>(
  "projects/toggleHaltProject",
  async ({ projectId, donorMessage, charityMessage }: HaltProjectPayload) => {
    try {
      console.log("toggleHaltProject called");
      const response = await sendHttpRequest<Project>(
        PROJECT_TOGGLE_HALTED_URL,
        {
          method: "POST",
          body: JSON.stringify({
            projectId,
            donorMessage,
            charityMessage,
          }),
        }
      );

      console.log("toggleHaltProject response", response);

      if (response.status === 200) {
        return response.json as Project;
      } else {
        console.error("Error toggling project projects:", response);
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

      const response = await sendHttpRequest<Project>(PROJECT_DELETE_URL, {
        method: "DELETE",
        body: JSON.stringify({ projectId }),
      });
      console.log("deleteProject response", response);
      if (response.status === 200) {
        return projectId;
      } else {
        console.error("Error fetching projects:", response);
        throw new Error(`Failed to delete project: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }
);

export const approveProject = createAsyncThunk(
  "projects/approveProject",
  async (projectId: string) => {
    try {
      console.log("approveProject called");

      const response = await sendHttpRequest<Project>(PROJECT_APPROVE_URL, {
        method: "POST",
        body: JSON.stringify({ projectId }),
      });
      console.log("approveProject response", response);
      if (response.status === 200) {
        return projectId;
      } else {
        console.error("Error", response);
        throw new Error(`Failed to delete project: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }
);

export const toggleHighlightProject = createAsyncThunk(
  "projects/toggleHighlightProject",
  async (projectId: string, { rejectWithValue }) => {
    try {
      console.log("toggleHighlightProject called");
      const response = await sendHttpRequest<Project>(
        PROJECT_TOGGLE_HIGHLIGHTED_URL,
        {
          method: "POST",
          body: JSON.stringify({ projectId }),
        }
      );
      console.log("toggleHighlightProject response", response);

      if (response.status === 200) {
        return projectId;
      } else if (response.status === 400) {
        // Instead of using alert(), reject with the error message
        return rejectWithValue(response.error);
      } else {
        console.error("Error", response);
        return rejectWithValue("Failed to toggle highlight project");
      }
    } catch (error) {
      console.error("toggleHighlightProject error", error);
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const deactivateProject = createAsyncThunk<
  Project,
  { projectId: string; deletionReason: string }
>("projects/deactivateProject", async ({ projectId, deletionReason }) => {
  try {
    const response = await sendHttpRequest<Project>(PROJECT_DEACTIVATE_URL, {
      method: "POST",
      body: JSON.stringify({ projectId, deletionReason }),
    });
    if (response.status === 200) {
      return response.json as Project;
    } else {
      throw new Error(`Failed to deactivate project: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
});

export const restoreProject = createAsyncThunk<Project, { projectId: string }>(
  "projects/restoreProject",
  async ({ projectId }) => {
    try {
      const response = await sendHttpRequest<Project>(PROJECT_RESTORE_URL, {
        method: "POST",
        body: JSON.stringify({ projectId }),
      });
      if (response.status === 200) {
        return response.json as Project;
      } else {
        throw new Error(`Failed to restore project: ${response.status}`);
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
    // updateProject: (state, action: PayloadAction<Project>) => {
    //   const index = state.projects.findIndex(
    //     (project) => project.id === action.payload.id
    //   );
    //   if (index !== -1) {
    //     state.projects[index] = action.payload;
    //   }
    // },
    // highlightProject: (state, action: PayloadAction<string>) => {
    //   const project = state.projects.find(
    //     (project) => project.id === action.payload
    //   );
    //   if (project) {
    //     project.isHighlighted = !project.isHighlighted;
    //   }
    // },
    // approveProject: (state, action: PayloadAction<string>) => {
    //   const project = state.projects.find(
    //     (project) => project.id === action.payload
    //   );
    //   if (project) {
    //     project.status = "ACTIVE";
    //   }
    // },
    toggleHaltProject: (state, action: PayloadAction<string>) => {
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
      })
      // HALT PROJECT
      // .addCase(toggleHaltProject.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   const index = state.projects.findIndex(
      //     (project) => project.id === action.payload.id
      //   );
      //   if (index !== -1) {
      //     state.projects[index] = action.payload;
      //   }
      // })
      // .addCase(toggleHaltProject.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message ?? "Failed to halt project";
      // })
      // DELETE PROJECT
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // DEACTIVATE PROJECT
      .addCase(deactivateProject.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        const index = state.projects.findIndex(
          (project) => project.id === updatedProject.id
        );
        if (index !== -1) {
          state.projects[index] = updatedProject;
        }
      })
      .addCase(deactivateProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to deactivate project";
      })
      // RESTORE PROJECT
      .addCase(restoreProject.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        const index = state.projects.findIndex(
          (project) => project.id === updatedProject.id
        );
        if (index !== -1) {
          state.projects[index] = updatedProject;
        }
      })
      .addCase(restoreProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to restore project";
      });
  },
});

export const {
  addProject,
  // deleteProject,
  // updateProject,
  // highlightProject,
  // approveProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
