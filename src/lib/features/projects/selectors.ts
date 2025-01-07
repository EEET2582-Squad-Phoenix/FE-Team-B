import { calculateProgress } from "@/utils/calculateProgress";
import { RootState } from "../../store";

export const projectListSelector = (state: RootState) => state.projects;

export const filtersSelector = (state: RootState) => state.filters;

export const filteredProjectsSelector = (state: RootState) => {
  const { search, category, status, progress } = filtersSelector(state);

  return projectListSelector(state).filter((project) => {
    const hasSearchText = project.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const hasCategory =
      category.length === 0 || category.includes(project.category);
    const hasStatus = status.length === 0 || status.includes(project.status);

    const progressPercentage = calculateProgress(
      project.raisedAmount,
      project.goalAmount
    );

    const hasProgress =
      progress.length === 0 ||
      progress.includes(progressPercentage === 100 ? "Full" : "Ongoing");

    return hasSearchText && hasCategory && hasStatus && hasProgress;
  });
};

export const highlightedProjectsSelector = (state: RootState) => {
  return filteredProjectsSelector(state).filter(
    (project) => project.isHighlighted
  );
};
