import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Project,
  ProjectCategory,
  ProjectProgressType,
  ProjectStatus,
} from "@/types/Project";
import { addProject } from "@/lib/features/projects/projectsSlice";
import {
  setCategory,
  setProgress,
  setSearch,
  setStatus,
} from "@/lib/features/projects/filtersSlice";
import { filteredProjectsSelector } from "@/lib/features/projects/selectors";
import { v4 as uuidv4 } from "uuid";

const useProjectPage = () => {
  const dispatch = useDispatch();
  const projectList = useSelector(filteredProjectsSelector);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    ProjectCategory[]
  >([]);
  const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgress, setSelectedProgress] = useState<
    ProjectProgressType[]
  >([]);

  const addNewProjectHandler = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleSave = useCallback(
    (newProject: Project) => {
      const projectToSave = {
        ...newProject,
        id: newProject.id || uuidv4(),
      };
      dispatch(addProject(projectToSave));
      setIsModalOpen(false);
    },
    [dispatch]
  );

  const handleCategoryChange = useCallback(
    (categories: ProjectCategory[]) => {
      setSelectedCategories(categories);
      dispatch(setCategory(categories));
    },
    [dispatch]
  );

  const handleStatusChange = useCallback(
    (statuses: ProjectStatus[]) => {
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

  return {
    projectList,
    isModalOpen,
    setIsModalOpen,
    selectedCategories,
    selectedStatuses,
    searchQuery,
    selectedProgress,
    addNewProjectHandler,
    handleSave,
    handleCategoryChange,
    handleStatusChange,
    handleSearchChange,
    handleProgressChange,
  };
};

export default useProjectPage;
