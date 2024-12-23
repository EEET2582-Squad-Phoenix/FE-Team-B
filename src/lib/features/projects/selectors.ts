import { RootState } from "../../store";

export const projectListSelector = (state: RootState) => state.projects;

export const filtersSelector = (state: RootState) => state.filters;

export const filteredProjectsSelector = (state: RootState) => {
  const { search, category, status } = filtersSelector(state);

  return projectListSelector(state).filter((project) => {
    const hasSearchText = project.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const hasCategory =
      category.length === 0 || category.includes(project.category);
    const hasStatus = status.length === 0 || status.includes(project.status);

    return hasSearchText && hasCategory && hasStatus;
  });
};

export const highlightedProjectsSelector = (state: RootState) => {
  return filteredProjectsSelector(state).filter(
    (project) => project.isHighlighted
  );
};
