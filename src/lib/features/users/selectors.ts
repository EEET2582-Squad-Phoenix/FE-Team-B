// import { calculateProgress } from "@/utils/users/calculateProgress";
import { RootState } from "../../store";
import { User } from "@/types/User";

export const userListSelector = (state: RootState): User[] =>
  state.users.users;

export const filtersSelector = (state: RootState) => state.filters;

export const filteredUsersSelector = (state: RootState) => {
  const { search } = filtersSelector(state);

  return userListSelector(state).filter((user) => {
    const hasSearchText = (user.email ?? "")
      .toLowerCase()
      .includes(search.toLowerCase());

    return (
      hasSearchText
    );
  });
};
