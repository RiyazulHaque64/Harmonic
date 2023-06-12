import { DiYeoman } from "react-icons/di";
import { FaBook } from "react-icons/fa";
import { ImWoman } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi2";
import { Zoom } from "react-awesome-reveal";

const Stat = () => {
  return (
    <div className="stat-bg grid lg:grid-cols-4 gap-10 py-16 w-10/12 mx-auto px-10 rounded-lg">
      <Zoom duration={1500}>
        <div className="bg-blue-400/20 dark:bg-white/80 rounded-lg p-6 flex items-center justify-between shadow-xl">
          <div>
            <h2 className="text-lg">Total Instructor</h2>
            <p className="text-3xl font-extrabold text-indigo-600">26</p>
            <p className="text-[12px]">2% More than last month</p>
          </div>
          <DiYeoman className="w-12 h-12 text-indigo-600" />
        </div>
      </Zoom>
      <Zoom duration={1500}>
        <div className="bg-blue-400/20 dark:bg-white/80 rounded-lg p-6 flex items-center justify-between shadow-xl">
          <div>
            <h2 className="text-lg">Total Student</h2>
            <p className="text-3xl font-extrabold text-yellow-600">1115</p>
            <p className="text-[12px]">15% More than last month</p>
          </div>
          <ImWoman className="w-12 h-12 text-yellow-600" />
        </div>
      </Zoom>
      <Zoom duration={1500}>
        <div className="bg-blue-400/20 dark:bg-white/80 rounded-lg p-6 flex items-center justify-between shadow-xl">
          <div>
            <h2 className="text-lg">Total Classes</h2>
            <p className="text-3xl font-extrabold text-pink-600">57</p>
            <p className="text-[12px]">21% More than last month</p>
          </div>
          <FaBook className="w-12 h-12 text-pink-600" />
        </div>
      </Zoom>
      <Zoom duration={1500}>
        <div className="bg-blue-400/20 dark:bg-white/80 rounded-lg p-6 flex items-center justify-between shadow-xl">
          <div>
            <h2 className="text-lg">Total Users</h2>
            <p className="text-3xl font-extrabold text-lime-600">1402</p>
            <p className="text-[12px]">19% More than last month</p>
          </div>
          <HiUserGroup className="w-12 h-12 text-lime-600" />
        </div>
      </Zoom>
    </div>
  );
};
export default Stat;
