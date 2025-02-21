import { useContext, useState } from "react";
import { auth } from "../Auth/firebase.init";
import { signOut } from "firebase/auth";
import { AuthContext } from "@/Auth/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      setIsDropdownOpen(false);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      setIsDropdownOpen(false);
      toast.success("Failed to Log out successfully");
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-400 shadow-md">
      <div className="text-xl font-bold text-gray-800">ToDoS!</div>

      <div className="relative">
        {currentUser && (
          <button
            onClick={toggleDropdown}
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
          >
            <span className="text-gray-600 font-bold">P</span>
          </button>
        )}

        {isDropdownOpen && (
          <div
            className="absolute top-12 right-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="py-2">
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {isDropdownOpen && (
        <div className="fixed inset-0 z-0" onClick={handleClickOutside}></div>
      )}
    </nav>
  );
};

export default Navbar;
