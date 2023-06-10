import { useQuery } from "@tanstack/react-query";
import DynamicTitleSets from "../../components/Title/DynamicTitleSets";
import SectionTitle from "../../components/Title/SectionTitle";
import useAuth from "../../hooks/useAuth";
import { deleteSelectedClasses, getSelectedClasses } from "../../API/select";
import Swal from "sweetalert2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa";
// import { updateClass } from "../../API/class";

const SelectedClasses = () => {
  const { user, loading } = useAuth();
  const { data: selectedClasses, refetch } = useQuery({
    queryKey: ["selectedClass", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: () => getSelectedClasses(user),
  });

  const handleSelectedClassDelete = (singleClass) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete this class!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSelectedClasses(singleClass._id).then((data) => {
          if (data.data.deletedCount > 0) {
            // console.log(singleClass);
            // updateClass(
            //   { seats: singleClass.seats - 1 },
            //   singleClass.classId
            // ).then((data) => console.log(data));
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your selected class has been deleted",
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
      <DynamicTitleSets title="Selected Classes" />
      <SectionTitle title="My Selected Classes" />
      <div className="w-full lg:w-11/12 2xl:w-9/12 mx-auto">
        {selectedClasses &&
        Array.isArray(selectedClasses) &&
        selectedClasses.length > 0 ? (
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
                  Delete
                </th>
                <th className="border p-1 text-sm md:text-base md:p-2">Pay</th>
              </tr>
            </thead>
            <tbody>
              {selectedClasses.map((singleClass, index) => (
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
                    <button
                      onClick={() => handleSelectedClassDelete(singleClass)}
                    >
                      <RiDeleteBin5Fill
                        className="w-6 h-6 hover:text-red-600 duration-200 text-red-500"
                        title="delete"
                      />
                    </button>
                  </td>
                  <td className="p-1 text-[10px] md:text-base md:p-2 text-center text-gray-700">
                    <button>
                      <FaCreditCard
                        className="w-5 h-5 hover:text-green-600 text-green-500 duration-200"
                        title="Pay"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>No Data found</h2>
        )}
      </div>
    </div>
  );
};

export default SelectedClasses;
