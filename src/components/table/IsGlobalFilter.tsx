import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { setIsGlobal } from "@/lib/features/projects/filtersSlice"; // Import the new action

interface IsGlobalFilterProps {
  onGlobalChange: (isGlobal: boolean[]) => void;
  selectedGlobals: boolean[];
}

const IsGlobalFilter: React.FC<IsGlobalFilterProps> = ({
  onGlobalChange,
  selectedGlobals,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const handleCheckboxChange = (isGlobal: boolean) => {
    const updatedGlobals = !selectedGlobals.includes(isGlobal)
      ? [...selectedGlobals, isGlobal]
      : selectedGlobals.filter((g) => g !== isGlobal);
    onGlobalChange(updatedGlobals);
    dispatch(setIsGlobal(updatedGlobals));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium mb-3">Scope</h3>
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedGlobals.includes(true)}
            onChange={() => handleCheckboxChange(true)}
          />
          <span>Global</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedGlobals.includes(false)}
            onChange={() => handleCheckboxChange(false)}
          />
          <span>Regional</span>
        </label>
      </div>
    </div>
  );
};

export default IsGlobalFilter;
