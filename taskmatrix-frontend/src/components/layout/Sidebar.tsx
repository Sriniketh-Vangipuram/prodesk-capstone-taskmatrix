import {
  FiGrid,
//   FiCheckSquare,
//   FiFolder,
//   FiUsers,
//   FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleSidebar } from "../../store/slices/uiSlice";

function Sidebar() {
  const dispatch = useAppDispatch();

  const sidebarOpen = useAppSelector(
    (state) => state.ui.sidebarOpen
  );

  return (
    <aside
      className={`relative flex min-h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* LOGO */}

      <div className="flex h-16 items-center border-b border-slate-200 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
            T
          </div>

          {sidebarOpen && (
            <span className="text-xl font-bold text-slate-900">
              TaskMatrix
            </span>
          )}
        </div>
      </div>

      {/* NAVIGATION */}

      <nav className="flex-1 space-y-2 p-4">
        <SidebarItem
          to="/dashboard"
          icon={<FiGrid size={20} />}
          label="Dashboard"
          sidebarOpen={sidebarOpen}
        />

        {/* <SidebarItem
          to="/tasks"
          icon={<FiCheckSquare size={20} />}
          label="My Tasks"
          sidebarOpen={sidebarOpen}
        />

        <SidebarItem
          to="/projects"
          icon={<FiFolder size={20} />}
          label="Projects"
          sidebarOpen={sidebarOpen}
        />

        <SidebarItem
          to="/team"
          icon={<FiUsers size={20} />}
          label="Team"
          sidebarOpen={sidebarOpen}
        />

        <SidebarItem
          to="/settings"
          icon={<FiSettings size={20} />}
          label="Settings"
          sidebarOpen={sidebarOpen}
        /> */}
      </nav>

      {/* COLLAPSE BUTTON */}

      <button
        type="button"
        onClick={() => dispatch(toggleSidebar())}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-100"
      >
        {sidebarOpen ? (
          <FiChevronLeft size={15} />
        ) : (
          <FiChevronRight size={15} />
        )}
      </button>

      {/* FOOTER */}

      <div className="border-t border-slate-200 p-4">
        {sidebarOpen && (
          <p className="text-xs text-slate-400">
            TaskMatrix
          </p>
        )}
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  sidebarOpen: boolean;
}

function SidebarItem({
  to,
  icon,
  label,
  sidebarOpen,
}: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-3 transition ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`
      }
    >
      {icon}

      {sidebarOpen && (
        <span className="font-medium">
          {label}
        </span>
      )}
    </NavLink>
  );
}

export default Sidebar;