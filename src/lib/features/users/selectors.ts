// import { calculateProgress } from "@/utils/users/calculateProgress";
import { RootState } from "../../store";
import { User } from "@/types/User";

export const userListSelector = (state: RootState): User[] =>
  state.users.users;

export const filtersSelector = (state: RootState) => state.userFilters;

export const filteredUsersSelector = (state: RootState) => {
  const {search, role} = filtersSelector(state);

  return userListSelector(state).filter((user) => {
    const hasSearchText = (user.email ?? "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const hasRole = role.length === 0 || role.includes(user.role);

    return (
      hasSearchText &&
      hasRole
    );
  });
};
