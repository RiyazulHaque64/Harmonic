import Button from "../components/Button/Button";
import useAuth from "../hooks/useAuth";
import logo from "../assets/image/logo-white.png";
import { Link, NavLink } from "react-router-dom";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { HiBars3BottomRight, HiXMark } from "react-icons/hi2";
import { useEffect, useState } from "react";
import useGetUserRole from "../hooks/useGetUseraRole";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole] = useGetUserRole();

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
    <div>
      <div className="w-full z-20 bg-blue-500 dark:bg-blue-900 shadow">
        <div className="w-11/12 lg:w-10/12 h-16 md:h-20 2xl:h-24 mx-auto flex items-center justify-between">
          <div>
            <Link className="flex gap-2 items-center" to="/">
              <img className="w-7 md:w-9 lg:w-12" src={logo} alt="Logo" />
              <span className="logo text-2xl md:text-3xl lg:text-4xl font-semibold uppercase text-white">
                Harmonic
              </span>
            </Link>
          </div>
          <nav className="">
            <ul className="hidden md:flex items-center gap-3">
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
                  {userRole?.role === "admin" ? (
                    <li className="text-white font-semibold text-lg">
                      <NavLink to="/admin/dashboard">Dashboard</NavLink>
                    </li>
                  ) : userRole?.role === "instructor" ? (
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
                    <BsFillBrightnessHighFill
                      title="Light"
                      className="w-6 h-6"
                    />
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
            <ul className="flex md:hidden items-center justify-between gap-3">
              <li
                className="text-white cursor-pointer"
                onClick={handleThemeSwitch}
              >
                {theme === "dark" ? (
                  <BsFillBrightnessHighFill title="Light" className="w-7 h-7" />
                ) : (
                  <MdDarkMode title="Light" className="w-7 h-7" />
                )}
              </li>
              <li className="text-white cursor-pointer">
                {menuOpen ? (
                  <HiXMark
                    onClick={() => setMenuOpen(false)}
                    className="w-7 h-7"
                  />
                ) : (
                  <HiBars3BottomRight
                    onClick={() => setMenuOpen(true)}
                    className="w-7 h-7"
                  />
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div
        className={`w-7/12 h-screen p-10 bg-blue-500 absolute right-0 z-20 md:hidden duration-300 ${
          menuOpen ? "top-16" : "hidden"
        }`}
      >
        <nav>
          <ul className="flex flex-col items-center gap-4">
            {user && (
              <li className="text-white font-semibold text-lg flex flex-col items-center">
                <img
                  className="h-16 w-16 rounded-full border border-white"
                  referrerPolicy="no-referrer"
                  src={user?.photoURL}
                  alt="profile picture"
                  title={user?.displayName}
                />
                <h2 className="mt-2 text-gray-200">{user?.displayName}</h2>
                <p className="text-gray-200 capitalize">{userRole?.role}</p>
              </li>
            )}
            <li
              onClick={() => setMenuOpen(false)}
              className="text-white font-semibold text-lg"
            >
              <NavLink to="/">Home</NavLink>
            </li>
            <li
              onClick={() => setMenuOpen(false)}
              className="text-white font-semibold text-lg"
            >
              <NavLink to="/instructors">Instructors</NavLink>
            </li>
            <li
              onClick={() => setMenuOpen(false)}
              className="text-white font-semibold text-lg"
            >
              <NavLink to="/classes">Classes</NavLink>
            </li>

            {user ? (
              <>
                {userRole?.role === "admin" ? (
                  <li
                    onClick={() => setMenuOpen(false)}
                    className="text-white font-semibold text-lg"
                  >
                    <NavLink to="/admin/dashboard">Dashboard</NavLink>
                  </li>
                ) : userRole?.role === "instructor" ? (
                  <li
                    onClick={() => setMenuOpen(false)}
                    className="text-white font-semibold text-lg"
                  >
                    <NavLink to="/instructor/dashboard">Dashboard</NavLink>
                  </li>
                ) : (
                  <li
                    onClick={() => setMenuOpen(false)}
                    className="text-white font-semibold text-lg"
                  >
                    <NavLink to="/student/dashboard">Dashboard</NavLink>
                  </li>
                )}
                <li
                  onClick={() => setMenuOpen(false)}
                  className="text-white font-semibold text-lg"
                >
                  <Button
                    onClick={logout}
                    label="Logout"
                    outline={true}
                    small={true}
                  ></Button>
                </li>
              </>
            ) : (
              <li
                onClick={() => setMenuOpen(false)}
                className="text-white font-semibold text-lg"
              >
                <Link to="/login">
                  <Button label="Login" outline={true} small={true}></Button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
