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
import {Input} from "@/components/ui/input"
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
  Donor,
  Charity,
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
  const [formData, setFormData] = useState<User & Partial<Donor> & Partial<Charity>>({
    id: user?.id || "",
    email: user?.email || "",
    password: user?.password || "",
    role: user?.role || "DONOR",
    emailVerified: user?.emailVerified || false,
    adminCreated: true,
    createdAt: user?.createdAt || new Date().toISOString(),
    updatedAt: user?.updatedAt || new Date().toISOString(),
    // Donor-specific fields
    firstName: user?.role === "DONOR" ? (user as Donor).firstName || "" : "",
    lastName: user?.role === "DONOR" ? (user as Donor).lastName || "" : "",
    avatarUrl: "",
    introVidUrl: null,
    address: "",
    // Charity-specific fields
    name: user?.role === "CHARITY" ? (user as Charity).name || "" : "",
    taxCode: "",
    logoUrl: null,
    type: user?.role === "CHARITY" ? (user as Charity).type : "INDIVIDUAL",
  });

  const handleChange = <K extends keyof (User & Donor & Charity)>(
    field: K,
    value: (User & Donor & Charity)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const errors: string[] = [];

    if (!formData.email.trim()) errors.push("Email is required.");
    if (!formData.password.trim()) errors.push("Password is required.");

    if (formData.role === "DONOR") {
      if (!formData.firstName?.trim()) errors.push("First name is required.");
      if (!formData.lastName?.trim()) errors.push("Last name is required.");
    } else if (formData.role === "CHARITY") {
      if (!formData.name?.trim()) errors.push("Charity name is required.");
      if (!formData.address?.trim()) errors.push("Charity address is required.");
      if (!formData.taxCode?.trim()) errors.push("Tax code is required.");
    }

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
          {/* Common Fields */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email *
            </Label>
            <Input
              type="email"
              id="email"
              className="col-span-3 bg-gray-100 border-gray-300 "
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password *
            </Label>
            <Input
              type="password"
              id="password"
              className="col-span-3 bg-gray-100 border-gray-300 "
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role *
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
  
          {/* Donor-Specific Fields */}
          {formData.role === "DONOR" && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  First Name *
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  className="col-span-3 bg-gray-100 border-gray-300 "
                  value={formData.firstName || ""}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastName" className="text-right">
                  Last Name *
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  className="col-span-3 bg-gray-100 border-gray-300 "
                  value={formData.lastName || ""}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address *
                </Label>
                <Input
                  type="text"
                  id="address"
                  className="col-span-3 bg-gray-100 border-gray-300 "
                  value={formData.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
            </>
          )}
  
          {/* Charity-Specific Fields */}
          {formData.role === "CHARITY" && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Charity Name *
                </Label>
                <Input
                  type="text"
                  id="name"
                  className="col-span-3 bg-gray-100 border-gray-300 "
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address *
                </Label>
                <Input
                  type="text"
                  id="address"
                  className="col-span-3 bg-gray-100 border-gray-300 "
                  value={formData.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="taxCode" className="text-right">
                  Tax Code *
                </Label>
                <Input
                  type="text"
                  id="taxCode"
                  className="col-span-3 bg-gray-100 border-gray-300 "
                  value={formData.taxCode || ""}
                  onChange={(e) => handleChange("taxCode", e.target.value)}
                />
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleSave}
          >
            Save User
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  
}
