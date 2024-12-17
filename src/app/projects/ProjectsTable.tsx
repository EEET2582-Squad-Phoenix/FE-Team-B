import { deleteProject } from "@/lib/features/projects/projectsSlice";
import { Project } from "@/types/Project";
import {
  Pencil,
  Trash2,
  CheckCircle,
  Star,
  Pause,
  LucideIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";

interface ProjectsTableProps {
  projectsData: Project[];
}

interface ActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  disabled: boolean;
  className?: string;
}

const ProjectsTable = ({ projectsData }: ProjectsTableProps) => {
  const dispatch = useDispatch();

  const handleDeleteProject = (id: string) => {
    dispatch(deleteProject(id));
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50 border-b">
          <th className="text-left py-3 px-4 font-medium">ID</th>
          <th className="text-left py-3 px-4 font-medium">Name</th>
          <th className="text-left py-3 px-4 font-medium">Country</th>
          <th className="text-left py-3 px-4 font-medium">Category</th>
          <th className="text-left py-3 px-4 font-medium">Goal</th>
          <th className="text-left py-3 px-4 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {projectsData.map((project) => (
          <tr
            key={project.id}
            className={`border-b ${
              project.isHighlighted
                ? "bg-yellow-200"
                : project.status === "halted"
                ? "bg-gray-600 text-white"
                : ""
            }`}
          >
            <td className="py-3 px-4">{project.id}</td>
            <td className="py-3 px-4">{project.name}</td>
            <td className="py-3 px-4">{project.country}</td>
            <td className="py-3 px-4">{project.category}</td>
            <td className="py-3 px-4">{project.goal}</td>
            <td className="py-3 px-4">
              <div className="flex items-center space-x-1">
                <ActionButton
                  icon={Pencil}
                  disabled={project.status === "deleted"}
                  onClick={() => console.log("Edit", project.id)}
                  className="text-blue-600"
                />
                <ActionButton
                  icon={Trash2}
                  disabled={project.status === "deleted"}
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-red-600"
                />
                <ActionButton
                  icon={CheckCircle}
                  disabled={
                    project.status === "approved" ||
                    project.status === "deleted"
                  }
                  onClick={() => console.log("Approve", project.id)}
                  className="text-green-600"
                />
                <ActionButton
                  icon={Star}
                  disabled={
                    project.isHighlighted || project.status === "deleted"
                  }
                  onClick={() => console.log("Highlight", project.id)}
                  className="text-yellow-600"
                />
                <ActionButton
                  icon={Pause}
                  disabled={
                    project.status === "halted" || project.status === "deleted"
                  }
                  onClick={() => console.log("Halt", project.id)}
                  className="text-orange-600"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectsTable;

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  onClick,
  disabled,
  className = "",
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-1.5 transition-colors ${
      disabled ? "text-gray-300" : `${className} `
    }`}
  >
    <Icon size={18} />
  </button>
);
