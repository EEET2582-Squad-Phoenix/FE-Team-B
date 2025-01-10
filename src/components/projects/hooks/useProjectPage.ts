import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/lib/store";
import {
  Project,
  ProjectCategoryType,
  ProjectProgressType,
  ProjectStatusType,
} from "@/types/Project";
import { createProject } from "@/lib/features/projects/projectsSlice";
import {
  setCategory,
  setHighlight,
  setIsGlobal,
  setProgress,
  setSearch,
  setStatus,
} from "@/lib/features/projects/filtersSlice";
import { filteredProjectsSelector } from "@/lib/features/projects/selectors";

const useProjectPage = () => {
  const dispatch: AppDispatch = useDispatch();
  // const dispatch = useDispatch();
  const projectList = useSelector(filteredProjectsSelector);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    ProjectCategoryType[]
  >([]);
  const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatusType[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgress, setSelectedProgress] = useState<
    ProjectProgressType[]
  >([]);

  const [selectedHighlights, setSelectedHighlights] = useState<boolean[]>([]);
  const [selectedGlobals, setSelectedGlobals] = useState<boolean[]>([]);

  const addNewProjectHandler = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleSave = useCallback(
    async (newProject: Project) => {
      try {
        await dispatch(createProject(newProject));
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error creating project:", error);
        if (error instanceof Error) {
          alert(`Error creating project: ${error.message}`);
        } else {
          alert("Error creating project");
        }
      }
    },
    [dispatch]
  );

  const handleCategoryChange = useCallback(
    (categories: ProjectCategoryType[]) => {
      setSelectedCategories(categories);
      dispatch(setCategory(categories));
    },
    [dispatch]
  );

  const handleStatusChange = useCallback(
    (statuses: ProjectStatusType[]) => {
      setSelectedStatuses(statuses);
      dispatch(setStatus(statuses));
    },
    [dispatch]
  );

  const handleProgressChange = useCallback(
    (progress: ProjectProgressType[]) => {
      setSelectedProgress(progress);
      dispatch(setProgress(progress));
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      dispatch(setSearch(query));
    },
    [dispatch]
  );

  const handleHighlightChange = useCallback(
    (highlights: boolean[]) => {
      setSelectedHighlights(highlights);
      dispatch(setHighlight(highlights));
    },
    [dispatch]
  );

  const handleGlobalChange = useCallback(
    (globals: boolean[]) => {
      setSelectedGlobals(globals);
      dispatch(setIsGlobal(globals));
    },
    [dispatch]
  );

  return {
    projectList,
    isModalOpen,
    setIsModalOpen,
    selectedCategories,
    selectedStatuses,
    searchQuery,
    selectedProgress,
    selectedHighlights,
    selectedGlobals,
    handleHighlightChange,
    handleGlobalChange,
    addNewProjectHandler,
    handleSave,
    handleCategoryChange,
    handleStatusChange,
    handleSearchChange,
    handleProgressChange,
  };
};

export default useProjectPage;
