import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Project, ProjectCategory, ProjectStatus } from "@/types/Project";
import { addProject } from "@/lib/features/projects/projectsSlice";
import {
  setCategory,
  setSearch,
  setStatus,
} from "@/lib/features/projects/filtersSlice";
import { filteredProjectsSelector } from "@/lib/features/projects/selectors";

const useProjectPage = () => {
  const projectList = useSelector(filteredProjectsSelector);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    ProjectCategory[]
  >([]);
  const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addNewProjectHandler = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleSave = useCallback(
    (newProject: Project) => {
      dispatch(addProject(newProject));
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
    addNewProjectHandler,
    handleSave,
    handleCategoryChange,
    handleStatusChange,
    handleSearchChange,
  };
};

export default useProjectPage;
