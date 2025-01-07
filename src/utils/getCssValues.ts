export const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-500 hover:bg-green-600";
    case "Inactive":
      return "bg-gray-500 hover:bg-gray-600";
    case "Halted":
      return "bg-orange-500 hover:bg-orange-600";
    case "Unapproved":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-blue-500 hover:bg-blue-600";
  }
};
