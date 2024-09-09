import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="flex flex-col items-center">
      <Outlet />
    </div>
  );
}

export default AppLayout;
