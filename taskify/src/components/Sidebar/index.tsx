import React from "react";
import { Button } from "@/components/ui/button";

const index = () => {
  return (
    <aside className="w-[300px] h-screen border-r border-gray-800 bg-gray-900 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          <span className="text-orange-400">Taskify</span>
        </h1>
        <p className="text-sm text-gray-400">Focus. Prioritize. Execute.</p>
      </div>

      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-orange-400/20 text-orange-300 flex items-center justify-center font-semibold">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-white">Afsheen Asghar</p>
            <p className="text-xs text-gray-400">@afsheenasghar</p>
          </div>
        </div>
      </div>

      <nav className="p-4 flex-1 overflow-auto">
        <ul className="space-y-1">
          <li>
            <a className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-white cursor-pointer">
              <i className="fa-solid fa-list-check text-gray-400 group-hover:text-white"></i>
              My Tasks
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-white cursor-pointer">
              <i className="fa-solid fa-star text-gray-400"></i>
              Priorities
            </a>
          </li>
          <li>
            <a className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-200 hover:bg-gray-800 hover:text-white cursor-pointer">
              <i className="fa-solid fa-clock text-gray-400"></i>
              Upcoming
            </a>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Button className="w-full inline-flex items-center justify-center gap-2">
          <i className="fa-solid fa-plus"></i>
          New List
        </Button>
      </div>
    </aside>
  );
};

export default index;


