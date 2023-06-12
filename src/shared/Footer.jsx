import { Link } from "react-router-dom";
import logo from "../assets/image/logo-white.png";
import { FaLocationArrow } from "react-icons/fa";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import { MdWifiCalling3 } from "react-icons/md";
const Footer = () => {
  return (
    <div className="w-full">
      <div className="flex">
        <div className="text-center w-1/2 bg-blue-700 dark:bg-blue-800 py-10 flex flex-col justify-center items-center">
          <div>
            <Link className="flex gap-2 items-center" to="/">
              <img className="w-12" src={logo} alt="Logo" />
              <span className="logo text-4xl font-semibold uppercase text-white">
                Harmonic
              </span>
            </Link>
            <div className="mt-6 flex items-center gap-2">
              <FaLocationArrow className="text-white w-5 h-5" />
              <p className="text-white">
                Multiplan Center, New Elephant Road, Dhaka-1205
              </p>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <BsFillEnvelopeAtFill className="text-white w-5 h-5" />
              <p className="text-white">support@harmonic.com</p>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <MdWifiCalling3 className="text-white w-5 h-5" />
              <a className="text-white" href="tel: +8801840452116">
                01840452116
              </a>
            </div>
          </div>
        </div>
        <div className=" w-1/2 bg-blue-600 dark:bg-blue-700 py-10 flex flex-col justify-center items-center">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2 uppercase">
              Important Links
            </h2>
            <div className="flex flex-col">
              <Link className="text-white hover:text-orange-300 duration-200">
                Create Account
              </Link>
              <Link className="text-white hover:text-orange-300 duration-200">
                Login
              </Link>
              <Link className="text-white hover:text-orange-300 duration-200">
                About Us
              </Link>
              <Link className="text-white hover:text-orange-300 duration-200">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-800 dark:bg-blue-900 py-4 text-center">
        <p className="text-sm lg:text-base font-semibold text-white">
          Copyrights &copy; 2023 Chef&apos;s Kitchen All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
