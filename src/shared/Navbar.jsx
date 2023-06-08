import Button from "../components/Button/Button";
import useAuth from "../hooks/useAuth";
import logo from "../assets/image/logo1.png";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="w-full z-20 bg-blue-500 shadow">
      <div className="w-10/12 h-14 md:h-16 lg:h-20 2xl:h-24 mx-auto flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <img className="w-12" src={logo} alt="Logo" />
          <span className="logo text-4xl font-semibold uppercase text-white">
            Harmonic
          </span>
        </div>
        <nav>
          <ul className="flex items-center gap-3">
            <li className="text-white font-semibold text-lg">
              <NavLink>Home</NavLink>
            </li>
            <li className="text-white font-semibold text-lg">
              <NavLink>Instructors</NavLink>
            </li>
            <li className="text-white font-semibold text-lg">
              <NavLink>Classes</NavLink>
            </li>

            {user ? (
              <>
                <li className="text-white font-semibold text-lg">
                  <NavLink to="/student/dashboard">Dashboard</NavLink>
                </li>
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
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
