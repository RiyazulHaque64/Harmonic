import { FaKey } from "react-icons/fa";
import { BiError } from "react-icons/bi";
import { HiOutlineXMark } from "react-icons/hi2";
import { BsEyeFill, BsFillEnvelopeAtFill } from "react-icons/bs";
import { useState } from "react";
import googleIcon from "../assets/image/google_icon.png";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DynamicTitleSets from "../components/Title/DynamicTitleSets";
import { saveUser } from "../API/auth";

const Login = () => {
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    if (email && password) {
      login(email, password)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Account login successfull",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        })
        .catch((error) => {
          setError(error?.message);
        });
    } else {
      setError("Password & Confirm password didn't match");
    }
  };

  const loginWithGoogle = () => {
    signInWithGoogle().then((result) => {
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        photoUrl: result.user.photoURL,
        role: "student",
      };
      saveUser(userInfo);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account login successfull",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    });
  };
  return (
    <div className="px-8 md:px-0 py-10 md:py-20 bg-blue-100/60 flex flex-col items-center justify-center">
      <DynamicTitleSets title="Login" />
      <div className="w-full md:w-8/12 lg:w-1/2 xl:w-5/12 2xl:w-2/6 bg-white p-10 rounded-lg shasow">
        {error && (
          <div className="text-xl text-red-600 bg-red-50 border border-red-200 flex items-center justify-between shadow p-6 rounded-lg">
            <div className="flex items-center justify-center gap-2">
              <BiError className="w-14 h-14 md:w-6 md:h-6 lg:w-6 lg:h-6" />
              <span>{error}</span>
            </div>
            <HiOutlineXMark
              onClick={() => setError("")}
              className="w-14 h-14 md:w-6 md:h-6 lg:w-6 lg:h-6 cursor-pointer"
            />
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-gray-700 font-semibold mb-10 text-3xl text-center">
            Login
          </h2>

          <div className="relative mb-4">
            <input
              className="p-2 pl-8 border-b-2 border-blue-500 w-full focus:outline-none text-gray-700"
              type="email"
              {...register("email", { required: true })}
              placeholder="Your Email"
            />
            <BsFillEnvelopeAtFill className="w-5 h-5 text-blue-500 absolute left-0 top-1/2 transform -translate-y-1/2" />
          </div>
          {errors.email?.type === "required" && (
            <span className="text-red-600 text-left">Email is required</span>
          )}
          <div className="relative mb-4">
            <input
              className="p-2 pl-8 border-b-2 border-blue-500 w-full focus:outline-none text-gray-700"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
              })}
              placeholder="Type Password"
            />
            <FaKey className="w-5 h-5 text-blue-500 absolute left-0 top-1/2 transform -translate-y-1/2" />
            <BsEyeFill
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute top-1/4 right-4 cursor-pointer w-6 h-6 ${
                showPassword ? "text-gray-800" : "text-gray-400"
              }`}
              title={showPassword ? "Hide Password" : "Show Password"}
            />
          </div>
          {errors.password?.type === "required" && (
            <span className="text-red-600 text-left">Password is required</span>
          )}
          <input
            className="p-2 bg-blue-500 text-white font-semibold w-full rounded mt-10 hover:bg-blue-600 duration-300 cursor-pointer hover:tracking-widest"
            type="submit"
            value="Login"
          />
        </form>
        <p className="mt-2">
          Not registered yet?{" "}
          <Link className="text-blue-600 hover:underline" to="/signup">
            Create an Account
          </Link>
        </p>
        <div className="text-center mt-2 mb-4">
          <span className="text-gray-700 text-xl font-semibold">Or</span>
        </div>
        <button
          onClick={loginWithGoogle}
          className="w-full py-3 border border-blue-200 rounded-xl font-semibold flex items-center justify-center gap-4 hover:bg-teal-100/50 duration-300"
        >
          <img className="w-6 h-6" src={googleIcon} alt="" />
          <span>Signup with google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
