import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center">
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;
