import { useState } from "react";
import { BiChevronsLeft } from "react-icons/bi";
import { FaUsers, FaEdit, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/image/logo1.png";
import useAuth from "../hooks/useAuth";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  return (
    <div className="flex bg-gray-100">
      <div
        className={`${
          sidebarOpen ? "w-72 p-7" : "w-20 p-2"
        } h-screen bg-white shadow relative duration-200 `}
      >
        <BiChevronsLeft
          className={`w-6 h-6 hover:text-blue-500 hover:border-blue-500 duration-200 absolute right-0 top-8 transform translate-x-1/2 cursor-pointer border-2 border-gray-100 bg-white rounded-full shadow-lg ${
            sidebarOpen || "rotate-180"
          }`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <div>
          <div className="mb-5">
            <Link to="/" className="flex gap-2 items-center justify-center">
              <img
                className={`${sidebarOpen ? "w-10" : "w-12"}`}
                src={logo}
                alt="Logo"
              />
              <span
                className={`logo text-3xl font-semibold uppercase text-blue-500 ${
                  sidebarOpen || "hidden"
                }`}
              >
                Harmonic
              </span>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center mb-8 text-center">
            <img
              className={`rounded-full border-2 border-white mb-1 ${
                sidebarOpen ? "w-16 h-16" : "w-10 h-10"
              }`}
              src={user?.photoURL}
              alt="profile picture"
            />
            <h4
              className={`text-gray-700 font-semibold ${
                sidebarOpen ? "text-xl" : "text-xs"
              }`}
            >
              {user?.displayName}
            </h4>
          </div>
          <nav>
            <ul>
              <li className="group p-2 hover:bg-blue-500 duration-200 rounded">
                <Link
                  to="/"
                  className={`flex items-center ${
                    sidebarOpen ? "flex-row gap-2" : "flex-col text-center"
                  }`}
                >
                  <FaHome className="w-5 h-5 text-gray-700 group-hover:text-white duration-200" />
                  <span
                    className={`text-gray-700 group-hover:text-white duration-200 ${
                      sidebarOpen ? "text-base" : "text-xs"
                    }`}
                  >
                    Home
                  </span>
                </Link>
              </li>
              <li className="group p-2 hover:bg-blue-500 duration-200 rounded">
                <Link
                  className={`flex  items-center ${
                    sidebarOpen ? "flex-row gap-2" : "flex-col text-center"
                  }`}
                >
                  <FaUsers className="w-5 h-5 text-gray-700 group-hover:text-white duration-200" />
                  <span
                    className={`text-gray-700 group-hover:text-white duration-200 ${
                      sidebarOpen ? "text-base" : "text-xs"
                    }`}
                  >
                    Manage User
                  </span>
                </Link>
              </li>
              <li className="group p-2 hover:bg-blue-500 duration-200 rounded">
                <Link
                  className={`flex  items-center ${
                    sidebarOpen ? "flex-row gap-2" : "flex-col text-center"
                  }`}
                >
                  <FaEdit className="w-5 h-5 text-gray-700 group-hover:text-white duration-200" />
                  <span
                    className={`text-gray-700 group-hover:text-white duration-200 ${
                      sidebarOpen ? "text-base" : "text-xs"
                    }`}
                  >
                    Manage Class
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="p-6 text-2xl font-semibold flex-1 h-screen">
        <h1>Home Page</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
