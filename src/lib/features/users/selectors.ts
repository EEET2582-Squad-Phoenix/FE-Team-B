// import { calculateProgress } from "@/utils/users/calculateProgress";
import { RootState } from "../../store";
import { User } from "@/types/User";

export const userListSelector = (state: RootState): User[] =>
  state.users.users;

export const filtersSelector = (state: RootState) => state.filters;

export const filteredUsersSelector = (state: RootState) => {
  const { search, category, status, progress, highlight, isGlobal } =
    filtersSelector(state);

  return userListSelector(state);
};
