import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./features/projects/projectsSlice";
import userReducer from "./features/users/usersSlice";
import filtersReducer from "./features/projects/filtersSlice";
import userFiltersReducer from "./features/users/filtersSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      projects: projectReducer,
      users: userReducer,
      filters: filtersReducer,
      userFilters: userFiltersReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
