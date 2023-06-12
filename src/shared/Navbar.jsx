import Button from "../components/Button/Button";
import useAuth from "../hooks/useAuth";
import logo from "../assets/image/logo-white.png";
import { Link, NavLink } from "react-router-dom";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logout, role } = useAuth();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="w-full z-20 bg-blue-500 dark:bg-blue-900 shadow">
      <div className="w-10/12 h-14 md:h-16 lg:h-20 2xl:h-24 mx-auto flex items-center justify-between">
        <div>
          <Link className="flex gap-2 items-center" to="/">
            <img className="w-12" src={logo} alt="Logo" />
            <span className="logo text-4xl font-semibold uppercase text-white">
              Harmonic
            </span>
          </Link>
        </div>
        <nav>
          <ul className="flex items-center gap-3">
            <li className="text-white font-semibold text-lg">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="text-white font-semibold text-lg">
              <NavLink to="/instructors">Instructors</NavLink>
            </li>
            <li className="text-white font-semibold text-lg">
              <NavLink to="/classes">Classes</NavLink>
            </li>

            {user ? (
              <>
                {role === "admin" ? (
                  <li className="text-white font-semibold text-lg">
                    <NavLink to="/admin/dashboard">Dashboard</NavLink>
                  </li>
                ) : role === "instructor" ? (
                  <li className="text-white font-semibold text-lg">
                    <NavLink to="/instructor/dashboard">Dashboard</NavLink>
                  </li>
                ) : (
                  <li className="text-white font-semibold text-lg">
                    <NavLink to="/student/dashboard">Dashboard</NavLink>
                  </li>
                )}
                <li className="text-white font-semibold text-lg">
                  <Button
                    onClick={logout}
                    label="Logout"
                    outline={true}
                    small={true}
                  ></Button>
                </li>
                <li className="text-white font-semibold text-lg">
                  <img
                    className="h-8 w-8 lg:h-10 lg:w-10 2xl:h-12 2xl:w-12 rounded-full border border-white"
                    referrerPolicy="no-referrer"
                    src={user?.photoURL}
                    alt="profile picture"
                    title={user?.displayName}
                  />
                </li>
              </>
            ) : (
              <li className="text-white font-semibold text-lg">
                <Link to="/login">
                  <Button label="Login" outline={true} small={true}></Button>
                </Link>
              </li>
            )}
            <li
              className="text-white font-semibold text-lg cursor-pointer"
              onClick={handleThemeSwitch}
            >
              {theme === "dark" ? (
                <div className="flex items-center gap-2 border-2 border-white py-1 px-3 rounded-full">
                  <BsFillBrightnessHighFill title="Light" className="w-6 h-6" />
                  <span>Switch Light</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 border-2 border-white py-1 px-3 rounded-full">
                  <MdDarkMode title="Light" className="w-6 h-6" />
                  <span>Switch Dark</span>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
