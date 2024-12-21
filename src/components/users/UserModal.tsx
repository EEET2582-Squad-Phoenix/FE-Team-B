import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  UserRoles,
  UserRole,
} from "@/types/User";

interface UserModalProps {
  user?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (user: User) => void;
}

export function UserModal({
  user,
  open,
  onOpenChange,
  onSave,
}: UserModalProps) {
  const [formData, setFormData] = useState<User>({
    id: user?.id || "",
    email: user?.email || "",
    password: user?.password || "",
    role: user?.role || "DONOR",
    emailVerified: user?.emailVerified || false,
    adminCreated: true,
    createdAt: user?.createdAt || new Date().toISOString(),
    updatedAt: user?.updatedAt || new Date().toISOString(),
  });

  // Update form data when user or open state changes
  useEffect(() => {
    setFormData({
      id: user?.id || "",
      email: user?.email || "",
      password: user?.password || "",
      role: user?.role || "DONOR",
      emailVerified: user?.emailVerified || false,
      adminCreated: true,
      createdAt: user?.createdAt || new Date().toISOString(),
      updatedAt: user?.updatedAt || new Date().toISOString(),
    });
  }, [user, open]);

  // Generic change handler for form fields with explicit type handling for special cases
  const handleChange = <K extends keyof User>(
    field: K,
    value: K extends "role"
      ? UserRole : string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Validation and saving
  const handleSave = () => {
    // Validate required fields
    const errors: string[] = [];

    if (!formData.email.trim()) {
      errors.push("User email is required");
    }

    if (!formData.password.trim()) {
      errors.push("User password is required");
    }

    // Display all validation errors
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "New User"}</DialogTitle>
          <DialogDescription>
            {user
              ? "Update the user details."
              : "Enter the details for your new user."}{" "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* ID field (optional, disabled for existing users) */}
          {user && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                ID
              </Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => handleChange("id", e.target.value)}
                className="col-span-3 bg-gray-100 border-gray-300 "
                disabled
              />
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email *
            </Label>
            <Input
              id="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="col-span-3 bg-gray-100 border-gray-300 "
              placeholder="Enter user email"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password *
            </Label>
            <Input
              id="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="col-span-3 bg-gray-100 border-gray-300 "
              placeholder="Enter user password"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                handleChange("role", value as UserRole)
              }
            >
              <SelectTrigger className="col-span-3 bg-gray-100 border-gray-300 ">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {UserRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emailverified" className="text-right">
              Email verified
            </Label>
            <Select
              value={formData.emailVerified.toString()}
              onValueChange={(value) =>
                handleChange("emailVerified", value)
              }
            >
              <SelectTrigger className="col-span-3 bg-gray-100 border-gray-300">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
        <DialogFooter>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {user ? "Update User" : "Save User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
