import { calculateProgress } from "@/utils/projects/calculateProgress";
import { RootState } from "../../store";
import { Project } from "@/types/Project";

export const projectListSelector = (state: RootState): Project[] =>
  state.projects.projects;

export const filtersSelector = (state: RootState) => state.filters;

export const filteredProjectsSelector = (state: RootState) => {
  const { search, categories, status, progress, highlight, isGlobal } =
    filtersSelector(state);

  return projectListSelector(state).filter((project) => {
    const hasSearchText = (project.name ?? "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const hasCategory =
      categories.length === 0 ||
      project.categories.some((projectCategory) =>
        categories.includes(projectCategory)
      );

    const hasStatus = status.length === 0 || status.includes(project.status);

    const progressPercentage = calculateProgress(
      project.raisedAmount,
      project.goalAmount
    );

    const hasProgress =
      progress.length === 0 ||
      progress.includes(progressPercentage === 100 ? "FULL" : "ONGOING");

    const hasHighlight =
      highlight.length === 0 || highlight.includes(project.isHighlighted);
    const hasGlobal =
      isGlobal.length === 0 || isGlobal.includes(project.isGlobal);

    return (
      hasSearchText &&
      hasCategory &&
      hasStatus &&
      hasProgress &&
      hasHighlight &&
      hasGlobal
    );
  });
};
