export const getStatusColor = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-500 hover:bg-green-600";
    case "INACTIVATED":
      return "bg-gray-500 hover:bg-gray-600";
    case "HALTED":
      return "bg-orange-500 hover:bg-orange-600";
    case "UNAPPROVED":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-blue-500 hover:bg-blue-600";
  }
};
