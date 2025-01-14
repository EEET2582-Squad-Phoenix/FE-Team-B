import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/lib/store";
import {
  User,
  UserRoleType
} from "@/types/User";
import { createUser } from "@/lib/features/users/usersSlice";
import { setSearch, setRole } from "@/lib/features/users/filtersSlice";
import { filteredUsersSelector } from "@/lib/features/users/selectors";

const useUserPage = () => {
  const dispatch: AppDispatch = useDispatch();
  // const dispatch = useDispatch();
  const userList = useSelector(filteredUsersSelector);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedCategories, setSelectedCategories] = useState<
  //   UserCategoryType[]
  // >([]);
  const [selectedRoles, setSelectedRoles] = useState<UserRoleType[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  // const [selectedProgress, setSelectedProgress] = useState<
  //   UserProgressType[]
  // >([]);

  const [selectedHighlights, setSelectedHighlights] = useState<boolean[]>([]);
  const [selectedGlobals, setSelectedGlobals] = useState<boolean[]>([]);

  const addNewUserHandler = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleSave = useCallback(
    async (newUser: any) => {
      try {
        await dispatch(createUser(newUser));
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error creating user:", error);
        if (error instanceof Error) {
          alert(`Error creating user: ${error.message}`);
        } else {
          alert("Error creating user");
        }
      }
    },
    [dispatch]
  );

  // const handleCategoryChange = useCallback(
  //   (categories: UserCategoryType[]) => {
  //     setSelectedCategories(categories);
  //     dispatch(setCategory(categories));
  //   },
  //   [dispatch]
  // );

  const handleRoleChange = useCallback(
    (roles: UserRoleType[]) => {
      setSelectedRoles(roles);
      dispatch(setRole(roles));
    },
    [dispatch]
  );

  // const handleProgressChange = useCallback(
  //   (progress: UserProgressType[]) => {
  //     setSelectedProgress(progress);
  //     dispatch(setProgress(progress));
  //   },
  //   [dispatch]
  // );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      dispatch(setSearch(query));
    },
    [dispatch]
  );

  // const handleHighlightChange = useCallback(
  //   (highlights: boolean[]) => {
  //     setSelectedHighlights(highlights);
  //     dispatch(setHighlight(highlights));
  //   },
  //   [dispatch]
  // );

  // const handleGlobalChange = useCallback(
  //   (globals: boolean[]) => {
  //     setSelectedGlobals(globals);
  //     dispatch(setIsGlobal(globals));
  //   },
  //   [dispatch]
  // );

  return {
    userList,
    isModalOpen,
    setIsModalOpen,
    // selectedCategories,
    selectedRoles,
    searchQuery,
    // selectedProgress,
    // selectedHighlights,
    // selectedGlobals,
    // handleHighlightChange,
    // handleGlobalChange,
    addNewUserHandler,
    handleSave,
    // handleCategoryChange,
    handleRoleChange,
    handleSearchChange,
    // handleProgressChange,
  };
};

export default useUserPage;
