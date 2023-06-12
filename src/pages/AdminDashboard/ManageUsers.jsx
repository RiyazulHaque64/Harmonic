import { useQuery } from "@tanstack/react-query";
import DynamicTitleSets from "../../components/Title/DynamicTitleSets";
import SectionTitle from "../../components/Title/SectionTitle";
import useAuth from "../../hooks/useAuth";
import { saveUser } from "../../API/auth";
import Swal from "sweetalert2";
import NoData from "../../components/Error/NoData";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: users, refetch } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users`
      );
      return res.data;
    },
  });

  const makeAdmin = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to make admin this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I Want!",
    }).then((result) => {
      if (result.isConfirmed) {
        const userInfo = {
          role: "admin",
          email: email,
        };
        saveUser(userInfo)
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "The user has been successfully made an admin",
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          });
      }
    });
  };

  const makeInstructor = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to make instructor this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I Want!",
    }).then((result) => {
      if (result.isConfirmed) {
        const userInfo = {
          role: "instructor",
          email: email,
        };
        saveUser(userInfo)
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "The user has been successfully made an instructor",
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          });
      }
    });
  };

  return (
    <div>
      <DynamicTitleSets title="Manage Users" />
      <SectionTitle title="Manage Users" />
      <div className="w-full 2xl:w-10/12 mx-auto">
        {users && Array.isArray(users) && users.length > 0 ? (
          <table className="border w-full text-center">
            <thead className="bg-gray-100 text-gray-800">
              <tr className="border border-gray-100">
                <th className="border p-1 text-sm xl:text-base md:p-2">#</th>
                <th className="border p-1 text-sm xl:text-base md:p-2">
                  Image
                </th>
                <th className="border p-1 text-sm xl:text-base md:p-2">Name</th>
                <th className="border p-1 text-sm xl:text-base md:p-2">
                  Email
                </th>
                <th className="border p-1 text-sm xl:text-base md:p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((singleUser, index) => (
                <tr className="border" key={singleUser._id}>
                  <th className=" border-r text-sm p-1 text-center text-gray-700">
                    {index + 1}
                  </th>
                  <td className="p-1">
                    <img
                      className="w-8 md:w-12 h-8 lg:h-12 mx-auto rounded-full"
                      src={singleUser.photoUrl}
                      alt=""
                    />
                  </td>
                  <td className="p-1 text-[10px] md:text-sm xl:text-base md:p-2 text-gray-700">
                    {singleUser.name}
                  </td>
                  <td className="p-1 text-[10px] md:text-sm xl:text-base md:p-2 text-gray-700">
                    {singleUser.email}
                  </td>
                  <td className="p-1 text-[10px] md:text-sm xl:text-base md:p-2 text-gray-700">
                    <button
                      onClick={() => makeAdmin(singleUser.email)}
                      className={`p-2 text-sm 2xl:text-base font-semibold duration-200 border-r border-gray-400 rounded-ss-lg rounded-es-lg disabled:cursor-not-allowed ${
                        singleUser.role === "admin"
                          ? "bg-green-500 text-white hover:bg-green-500 border-none"
                          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                      disabled={singleUser.role === "admin"}
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => makeInstructor(singleUser.email)}
                      className={`p-2 text-sm 2xl:text-base font-semibold  duration-200 border-r border-gray-400 disabled:cursor-not-allowed ${
                        singleUser.role === "instructor"
                          ? "bg-indigo-500 text-white hover:bg-indigo-500"
                          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                      disabled={singleUser.role === "instructor"}
                    >
                      Instructor
                    </button>
                    <button
                      className={`p-2 text-sm 2xl:text-base  font-semibold duration-200 rounded-ee-lg rounded-se-lg disabled:cursor-not-allowed ${
                        singleUser.role === "student"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                      disabled={true}
                    >
                      Student
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
