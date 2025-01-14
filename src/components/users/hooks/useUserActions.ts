import { useDispatch } from "react-redux";
import {
  addUser,
  // updateUser,
  deleteUser,
} from "@/lib/features/users/usersSlice";
import { User } from "@/types/User";
import { AppDispatch } from "@/lib/store";

export const useUserActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddUser = (user: User) => {
    // dispatch(addUser(user));
  };

  const handleUpdateUser = (user: User) => {
    // dispatch(updateUser(user));
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleEditUser = (id: string) => {
    // dispatch(deleteUser(id));
  };

  return {
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
    handleEditUser
  };
};