import { useAppDispatch } from "../../../store/hooks";
import { logout } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
          <h1 className="text-2xl font-bold">
            TaskMatrix
          </h1>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-8">
        <div className="rounded-xl bg-white p-8 shadow">
          <h2 className="text-3xl font-bold">
            Dashboard
          </h2>

          <p className="mt-3 text-slate-500">
            Authentication successful 🎉
          </p>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;