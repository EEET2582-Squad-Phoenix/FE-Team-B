import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { setHighlight } from "@/lib/features/projects/filtersSlice"; // Import the new action

interface HighlightFilterProps {
  onHighlightChange: (isHighlighted: boolean[]) => void;
  selectedHighlights: boolean[];
}

const HighlightFilter: React.FC<HighlightFilterProps> = ({
  onHighlightChange,
  selectedHighlights,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const handleCheckboxChange = (isHighlighted: boolean) => {
    const updatedHighlights = !selectedHighlights.includes(isHighlighted)
      ? [...selectedHighlights, isHighlighted]
      : selectedHighlights.filter((h) => h !== isHighlighted);
    onHighlightChange(updatedHighlights);
    dispatch(setHighlight(updatedHighlights)); // Dispatch the action
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium mb-3">Highlight</h3>
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedHighlights.includes(true)}
            onChange={() => handleCheckboxChange(true)}
          />
          <span>Highlighted</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedHighlights.includes(false)}
            onChange={() => handleCheckboxChange(false)}
          />
          <span>Not Highlighted</span>
        </label>
      </div>
    </div>
  );
};

export default HighlightFilter;
