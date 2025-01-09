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

export const formatDisplayText = (text: string) => {
  if (!text) return "";
  if (text === "USA") return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-blue-500 hover:bg-blue-600";
      return "bg-green-500 hover:bg-green-600";
    case "INACTIVATED":
      return "bg-blue-500 hover:bg-blue-600";
      return "bg-gray-500 hover:bg-gray-600";
    case "HALTED":
      return "bg-blue-500 hover:bg-blue-600";
      return "bg-orange-500 hover:bg-orange-600";
    case "UNAPPROVED":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-blue-500 hover:bg-blue-600";
  }
};
