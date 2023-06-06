import Button from "../components/Button/Button";
import logo from "/favicon.png";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed w-full z-20 bg-teal-400 shadow">
      <div className="w-10/12 h-24 mx-auto flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <img className="w-12" src={logo} alt="Logo" />
          <span className="text-4xl font-semibold uppercase text-white">
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
            <li className="text-white font-semibold text-lg">
              <NavLink>Dashboard</NavLink>
            </li>
            <li className="text-white font-semibold text-lg">
              <Link to="/signup">
                <Button label="Login" outline={true} small={true}></Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
