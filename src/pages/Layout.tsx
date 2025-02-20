import Navbar from "@/customComponents/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer className="bg-gray-400 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} ToDoS! All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;
