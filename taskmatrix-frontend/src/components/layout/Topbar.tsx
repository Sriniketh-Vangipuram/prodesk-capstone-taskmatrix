import { FiMenu, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import { toggleSidebar } from "../../store/slices/uiSlice";

function Topbar() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* LEFT */}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => dispatch(toggleSidebar())}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
        >
          <FiMenu size={20} />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Task Management
          </h1>

          <p className="hidden text-xs text-slate-500 sm:block">
            Manage your work efficiently
          </p>
        </div>
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-4">
        {/* USER */}

        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
            U
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              User
            </p>

            <p className="text-xs text-slate-500">
              Member
            </p>
          </div>
        </div>

        {/* LOGOUT */}

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <FiLogOut size={17} />

          <span className="hidden sm:inline">
            Logout
          </span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;