import React from "react";
import { Button } from "@/components/ui/button";

const index = () => {
  const menuItems = [
    { icon: "fa-list-check", label: "My Tasks" },
    { icon: "fa-star", label: "Priorities" },
    { icon: "fa-clock", label: "Upcoming" },
  ];

  return (
    <aside className="w-[300px] h-screen border-r border-base-200 bg-base-100 flex flex-col">
      <div className="p-6 border-b border-base-200">
        <h1 className="text-2xl font-bold tracking-tight text-base-content">
          <span className="text-primary">Taskify</span>
        </h1>
        <p className="text-sm text-neutral-content">
          Focus. Prioritize. Execute.
        </p>
      </div>

      <div className="p-6 border-b border-base-200">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary bg-opacity-20 text-primary flex items-center justify-center font-semibold">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-base-content">
              Afsheen Asghar
            </p>
            <p className="text-xs text-neutral-content">@afsheenasghar</p>
          </div>
        </div>
      </div>

      <nav className="p-4 flex-1 overflow-auto">
        <ul className="space-y-1">
          {menuItems.map(({ icon, label }) => (
            <li
              key={label}
              className="group hover:bg-base-200 hover:text-primary cursor-pointer rounded-md transition-colors"
            >
              <a className="flex items-center gap-3 px-3 py-2 text-sm text-base-content group-hover:text-primary">
                <i
                  className={`fa-solid ${icon} text-neutral-content group-hover:text-primary`}
                ></i>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-base-200">
        <Button className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-content hover:opacity-90">
          <i className="fa-solid fa-plus"></i>
          New List
        </Button>
      </div>
    </aside>
  );
};

export default index;
