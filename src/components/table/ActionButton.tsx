import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

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

export default ActionButton;
