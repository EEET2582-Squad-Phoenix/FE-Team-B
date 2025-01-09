import { format } from "date-fns";

export const formatAmount = (raised: number, goal: number) => {
  const percentage = (raised / goal) * 100;
  return `${raised.toLocaleString()} / ${goal.toLocaleString()} (${percentage.toFixed(
    1
  )}%)`;
};

export const formatDuration = (startDate: string, endDate?: string) => {
  try {
    if (!startDate) {
      return "No start date selected";
    }
    const start = format(new Date(startDate), "MMM d, yyyy");
    if (!endDate) {
      return start;
    }
    const end = format(new Date(endDate), "MMM d, yyyy");
    return `${start} - ${end}`;
  } catch {
    return "Invalid dates";
  }
};
