import { routes } from "../../../routes/routes";
import { MenuItem } from "../../../components/menuItem/MenuItem";
import { useState } from "react";

export const Sidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {routes.map((route, index) => (
        <div key={route.name} className="border-b border-gray-200">
          {!!route.subItems ? (
            <>
              <div
                className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-100 transition cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center gap-4">
                  {route.icon && <route.icon className="w-5 h-5" />}
                  <span className="font-medium">{route.name}</span>
                </div>
                <span
                  className={`transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>

              {/* 🌟 Transición suave al abrir/cerrar el submenú */}
              <div
                className={`pl-8 bg-gray-50 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {route.subItems.map((subItem) => (
                  <MenuItem
                    key={subItem.name}
                    path={route.path + subItem.path}
                    name={subItem.name}
                    Icon={subItem.icon}
                  />
                ))}
              </div>
            </>
          ) : (
            <MenuItem path={route.path} name={route.name} Icon={route.icon} />
          )}
        </div>
      ))}
    </div>
  );
};
