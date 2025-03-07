import { NavLink } from "react-router-dom";

export const MenuItem = ({ path, name, Icon }) => {
  return (
    <NavLink
      to={path}
      state={name}
      className={({ isActive }) =>
        `flex items-center gap-5 p-3 transition-colors rounded-md ${
          isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
        }`
      }
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="font-medium">{name}</span>
    </NavLink>
  );
};