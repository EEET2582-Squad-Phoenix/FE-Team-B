import React from "react";
import { ProjectCategoryType, ProjectCategories } from "@/types/Project";
import { formatDisplayText } from "@/utils/projects/formatValues";

interface CategoryFilterProps {
  onCategoryChange: (category: ProjectCategoryType[]) => void;
  selectedCategories: ProjectCategoryType[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  onCategoryChange,
  selectedCategories,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium mb-3">Category</h3>
      <div className="space-y-2">
        {ProjectCategories.map((category) => (
          <label key={category} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={(e) => {
                const updatedCategories = e.target.checked
                  ? [...selectedCategories, category]
                  : selectedCategories.filter((c) => c !== category);
                onCategoryChange(updatedCategories);
              }}
            />
            <span>{formatDisplayText(category)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
