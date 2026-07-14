import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl p-6">
        <Outlet />
      </div>
    </main>
  );
}

export default AppLayout;