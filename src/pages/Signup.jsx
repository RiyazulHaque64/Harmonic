import { FaUserAlt, FaKey } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { BiError } from "react-icons/bi";
import { HiOutlineXMark } from "react-icons/hi2";
import {
  // BsCloudUploadFill,
  BsEyeFill,
  BsFillEnvelopeAtFill,
} from "react-icons/bs";
import { useState } from "react";
import googleIcon from "../assets/image/google_icon.png";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { saveUser } from "../API/auth";
import DynamicTitleSets from "../components/Title/DynamicTitleSets";
import { ImSpinner9 } from "react-icons/im";

const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_Image_Upload_Token
}`;
const Signup = () => {
  const { createUser, updateUser, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  // const [uploadPicture, setUploadPicture] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatchingMessage, setPasswordMatchingMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, password, confirmPassword, profilePic } = data;

    if (email && password === confirmPassword) {
      const formData = new FormData();
      formData.append("image", profilePic[0]);

      fetch(imageHostingUrl, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          const imgUrl = data.data.url;
          createUser(email, password)
            .then((result) => {
              updateUser(name, imgUrl)
                .then(() => {
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
                    title: "Account created successfull",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/", { replace: true });
                })
                .catch((error) => {
                  setError(error.message);
                });
            })
            .catch((error) => {
              setError(error.message);
            });
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setError("Password & Confirm password didn't match");
    }
  };

  const signupWithGoogle = () => {
    signInWithGoogle().then((result) => {
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        photoUrl: result.user.photoURL,
        role: "student",
      };
      saveUser(userInfo)
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account signup successfull",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    });
  };

  const hadlePasswordMatching = (event) => {
    if (event.target.value === password) {
      setPasswordMatchingMessage(false);
    } else {
      setPasswordMatchingMessage(true);
    }
  };
  // const handleImageChange = (image) => {
  //   setUploadPicture(image.name);
  // };
  return (
    <div className="px-10 md:px-0 py-10 md:py-20 bg-blue-100/60 flex flex-col items-center justify-center">
      <DynamicTitleSets title="Signup" />
      <div className="w-full md:w-8/12 lg:w-1/2 xl:w-5/12 2xl:w-2/6 bg-white p-10 rounded-lg shasow">
        <h2 className="text-gray-700 font-semibold mb-10 text-3xl text-center">
          Create Account
        </h2>
        {error && (
          <div className="text-sm lg:text-base text-red-600 bg-red-50 border border-red-200 flex items-center justify-between shadow p-5 rounded-lg mb-4">
            <div className="flex items-center justify-center gap-2">
              <BiError className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 xl:w-14 xl:h-14" />
              <span>{error}</span>
            </div>
            <HiOutlineXMark
              onClick={() => setError("")}
              className="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 xl:w-14 xl:h-14 cursor-pointer"
            />
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-4">
            <input
              className="p-2 pl-8 border-b-2 border-blue-500 w-full focus:outline-none text-gray-700"
              type="text"
              {...register("name")}
              placeholder="Your Name"
            />
            <FaUserAlt className="w-5 h-5 text-blue-500 absolute left-0 top-1/2 transform -translate-y-1/2" />
          </div>
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
                minLength: 6,
                pattern:
                  /^(?=.*[A-Z])(?=.*[!@#$%^&*()-=_+{};':",.<>/?])(?!.*\s).*$/,
              })}
              onBlur={(e) => setPassword(e.target.value)}
              placeholder="Type Password"
            />
            <MdPassword className="w-5 h-5 text-blue-500 absolute left-0 top-1/2 transform -translate-y-1/2" />
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
          {errors.password?.type === "minLength" && (
            <span className="text-red-600 text-left">
              Password must be at least 6 character
            </span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-red-600 text-left">
              Password must have one capital letter & one special character
            </span>
          )}
          <div className="relative mb-4">
            <input
              className="p-2 pl-8 border-b-2 border-blue-500 w-full focus:outline-none text-gray-700"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: true,
                minLength: 6,
              })}
              onChange={hadlePasswordMatching}
              placeholder="Confirm Password"
            />
            <FaKey className="w-5 h-5 text-blue-500 absolute left-0 top-1/2 transform -translate-y-1/2" />
            <BsEyeFill
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={`absolute top-1/4 right-4 cursor-pointer w-6 h-6 ${
                showConfirmPassword ? "text-gray-800" : "text-gray-400"
              }`}
              title={showConfirmPassword ? "Hide Password" : "Show Password"}
            />
          </div>
          {passwordMatchingMessage && (
            <span className="text-red-600 text-left mb-2">
              Password didn&apos;t match
            </span>
          )}
          <div className="">
            <input
              className="text-sm cursor-pointer w-full"
              type="file"
              {...register("profilePic")}
              id="image"
              accept="image/*"
            />
            {/* <label>
              <input
                className="text-sm cursor-pointer w-full hidden"
                type="file"
                {...register("profilePic")}
                onChange={(event) => {
                  handleImageChange(event.target.files[0]);
                }}
                id="image"
                accept="image/*"
                hidden
              />
              <div className="p-2 pl-0 border-b-2 border-dashed border-teal-400 w-full text-gray-400 text-left cursor-pointer flex items-center gap-3">
                <BsCloudUploadFill className="w-5 h-5 text-teal-400" />
                <span>
                  {uploadPicture ? uploadPicture : "Select Profile Picture"}
                </span>
              </div>
            </label> */}
          </div>
          <button
            className="p-2 bg-blue-500 text-white font-semibold w-full rounded mt-10 hover:bg-blue-600 duration-300 cursor-pointer hover:tracking-widest"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <ImSpinner9 className="m-auto animate-spin w-6 h-6" />
            ) : (
              "Create"
            )}
          </button>
        </form>
        <p className="mt-2">
          Already have an account? Please{" "}
          <Link className="text-blue-600 hover:underline" to="/login">
            login
          </Link>
        </p>
        <div className="text-center mt-2 mb-4">
          <span className="text-gray-700 text-xl font-semibold">Or</span>
        </div>
        <button
          onClick={signupWithGoogle}
          className="w-full py-3 border border-blue-200 rounded-xl font-semibold flex items-center justify-center gap-4 hover:bg-teal-100/50 duration-300"
        >
          <img className="w-6 h-6" src={googleIcon} alt="" />
          <span>Signup with google</span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
