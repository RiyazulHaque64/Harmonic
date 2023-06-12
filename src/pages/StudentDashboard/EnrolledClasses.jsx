import { useQuery } from "@tanstack/react-query";
import DynamicTitleSets from "../../components/Title/DynamicTitleSets";
import SectionTitle from "../../components/Title/SectionTitle";
import useAuth from "../../hooks/useAuth";
import NoData from "../../components/Error/NoData";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EnrolledClasses = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: enrolledClasses } = useQuery({
    queryKey: ["myClass", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/enrolledClasses/${user?.email}`
      );
      return res.data;
    },
  });
  return (
    <div>
      <DynamicTitleSets title="Enrolled Classes" />
      <SectionTitle title="My Enrolled Classes" />
      <div className="w-full lg:w-11/12 2xl:w-9/12 mx-auto">
        {enrolledClasses &&
        Array.isArray(enrolledClasses) &&
        enrolledClasses.length > 0 ? (
          <table className="border w-full text-center">
            <thead className="bg-gray-100 text-gray-800">
              <tr className="border border-gray-100">
                <th className="border p-1 text-[12px] md:text-base md:p-2">
                  #
                </th>
                <th className="border p-1 text-[12px] md:text-base md:p-2">
                  Image
                </th>
                <th className="border p-1 text-[12px] md:text-base md:p-2">
                  Name
                </th>
                <th className="border p-1 text-[12px] md:text-base md:p-2">
                  Price
                </th>
                <th className="border p-1 text-sm md:text-base md:p-2">
                  Instructor
                </th>
                <th className="border p-1 text-sm md:text-base md:p-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {enrolledClasses.map((singleClass, index) => (
                <tr className="border" key={singleClass._id}>
                  <th className=" border-r text-sm p-1 text-center text-gray-700">
                    {index + 1}
                  </th>
                  <td className="p-2">
                    <img
                      className="w-8 md:w-12 h-8 lg:h-12 mx-auto"
                      src={singleClass.imgUrl}
                      alt=""
                    />
                  </td>
                  <td className="p-1 text-[10px] md:text-base md:p-2 text-gray-700">
                    {singleClass.className}
                  </td>
                  <td className="p-1 text-[10px] md:text-base md:p-2">
                    ${singleClass.price}
                  </td>
                  <td className="p-1 text-[10px] md:text-base md:p-2 text-center text-gray-700">
                    <span>{singleClass.instructorName}</span>
                  </td>
                  <td className="p-1 text-[10px] md:text-base md:p-2 text-center text-gray-700">
                    <span className="bg-green-500 px-4 py-1 rounded text-white font-semibold">
                      Paid
                    </span>
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

export default EnrolledClasses;
