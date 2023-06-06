import { FaUserAlt, FaKey } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { BsCloudUploadFill } from "react-icons/bs";

const Signup = () => {
  return (
    <div className="pt-32 bg-teal-100/60 h-screen flex items-center justify-center">
      <form className="w-2/6 bg-white p-10 rounded-lg shasow text-center">
        <h2 className="text-gray-700 font-semibold mb-10 text-3xl">
          Create Account
        </h2>
        <div className="relative mb-4">
          <input
            className="p-2 pl-8 border-b-2 border-teal-400 w-full focus:outline-none text-gray-700"
            type="text"
            placeholder="Your Name"
          />
          <FaUserAlt className="w-5 h-5 text-teal-400 absolute left-0 top-1/2 transform -translate-y-1/2" />
        </div>
        <div className="relative mb-4">
          <input
            className="p-2 pl-8 border-b-2 border-teal-400 w-full focus:outline-none text-gray-700"
            type="text"
            placeholder="Type Password"
          />
          <MdPassword className="w-5 h-5 text-teal-400 absolute left-0 top-1/2 transform -translate-y-1/2" />
        </div>
        <div className="relative mb-4">
          <input
            className="p-2 pl-8 border-b-2 border-teal-400 w-full focus:outline-none text-gray-700"
            type="text"
            placeholder="Confirm Password"
          />
          <FaKey className="w-5 h-5 text-teal-400 absolute left-0 top-1/2 transform -translate-y-1/2" />
        </div>
        <div className="">
          <label>
            <input
              className="text-sm cursor-pointer w-full hidden"
              type="file"
              name="image"
              id="image"
              accept="image/*"
              hidden
            />
            <div className="p-2 pl-0 border-b-2 border-dashed border-teal-400 w-full text-gray-400 text-left cursor-pointer flex items-center gap-3">
              <BsCloudUploadFill className="w-5 h-5 text-teal-400" />
              <span>Select Profile Picture</span>
            </div>
          </label>
        </div>
        <input
          className="p-2 bg-teal-400 text-white font-semibold w-full rounded my-10"
          type="submit"
          value="Create"
        />
      </form>
    </div>
  );
};

export default Signup;
