import { useState, Fragment } from "react";
import DynamicTitleSets from "../../components/Title/DynamicTitleSets";
import SectionTitle from "../../components/Title/SectionTitle";
import useAuth from "../../hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import { BsCloudUploadFill } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";
import Swal from "sweetalert2";
import { updateClass } from "../../API/class";
import { useQuery } from "@tanstack/react-query";
import getMyClasses from "../../API/getMyClasses";
import NoData from "../../components/Error/NoData";

const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_Image_Upload_Token
}`;

const MyClasses = () => {
  const { user, loading } = useAuth();
  const { data: classes, refetch } = useQuery({
    queryKey: ["myClass", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: () => getMyClasses(user),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [imageName, setImageName] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [singleClassInfo, setSingleClassInfo] = useState({});

  function closeModal() {
    setIsOpen(false);
  }
  function handleUpdateModal(singleClass) {
    setSingleClassInfo(singleClass);
    setIsOpen(true);
  }

  const handleUpdateClassForm = (event) => {
    event.preventDefault();
    setLocalLoading(true);
    const form = event.target;
    const _id = form.id.value;
    const className = form.className.value;
    const classImage = form.classImage.files[0];
    const instructorName = form.instructorName.value;
    const instructorEmail = form.instructorEmail.value;
    const price = parseFloat(form.price.value);
    const seats = parseInt(form.seat.value);

    if (form.classImage.files.length > 0) {
      const formData = new FormData();
      formData.append("image", classImage);
      fetch(imageHostingUrl, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          const imgUrl = data.data.url;
          const classInfo = {
            imgUrl,
            className,
            instructorName,
            instructorEmail,
            price,
            seats,
          };
          updateClass(classInfo, _id).then((data) => {
            if (data.data.modifiedCount) {
              setLocalLoading(false);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Class successfully updated",
                showConfirmButton: false,
                timer: 1500,
              });
              form.reset();
              closeModal();
              refetch();
            }
          });
          setLocalLoading(false);
        });
    } else {
      const classInfo = {
        className,
        instructorName,
        instructorEmail,
        price,
        seats,
      };
      if (className && instructorEmail && instructorName && price && seats) {
        updateClass(classInfo, _id).then((data) => {
          console.log(data.data.modifiedCount);
          if (data.data.modifiedCount > 0) {
            setLocalLoading(false);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Class successfully updated",
              showConfirmButton: false,
              timer: 1500,
            });
            form.reset();
            closeModal();
            refetch();
          } else {
            setLocalLoading(false);
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Nothing has been updated",
              showConfirmButton: false,
              timer: 1500,
            });
            form.reset();
            closeModal();
          }
        });
      } else {
        setLocalLoading(true);
      }
    }
  };
  return (
    <div>
      <DynamicTitleSets title="My Classes" />
      <SectionTitle title="My Classes" />
      <div className=" w-full">
        {classes && Array.isArray(classes) && classes.length > 0 ? (
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
                  Enrolled
                </th>
                <th className="border p-1 text-sm md:text-base md:p-2">
                  Status
                </th>
                <th className="border p-1 text-sm md:text-base md:p-2">
                  Feedback
                </th>
                <th className="border p-1 text-sm md:text-base md:p-2">
                  Update
                </th>
              </tr>
            </thead>
            <tbody>
              {classes.map((singleClass, index) => (
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
                    <span>{singleClass.enrolledStudent}</span>
                  </td>
                  <td
                    className={`p-1 text-[10px] md:text-base font-semibold md:p-2 text-center text-orange-500 ${
                      (singleClass.status === "approved" && "text-green-600") ||
                      (singleClass.status === "denied" && "text-red-600")
                    }`}
                  >
                    {singleClass.status}
                  </td>
                  <td className="p-1 text-[10px] md:text-base md:p-2 text-center text-gray-700">
                    {singleClass.feedback}
                  </td>
                  <td className="p-1 text-[10px] md:text-base md:p-2 text-center text-gray-700">
                    <FaEdit
                      onClick={() => handleUpdateModal(singleClass)}
                      className="mx-auto w-6 h-6 hover:text-blue-500 duration-200"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-10/12 lg:w-7/12 2xl:w-1/2 transform overflow-hidden rounded-2xl bg-white p-8 lg:p-10 xl:p-12 text-left align-middle shadow-xl transition-all z-50">
                  <div className="mt-2">
                    <form onSubmit={handleUpdateClassForm}>
                      <div className="flex gap-8 mb-6">
                        <div className="w-1/2 relative">
                          <input
                            className="hidden"
                            type="text"
                            defaultValue={singleClassInfo._id}
                            name="id"
                          />
                          <input
                            className="border border-blue-400 text-base rounded p-3 text-gray-700 w-full bg-transparent focus:outline-blue-500 group"
                            type="text"
                            defaultValue={singleClassInfo.className}
                            name="className"
                            required
                          />
                          <span className="absolute -top-[2px] left-4 px-2 transform -translate-y-1/2 bg-white text-base text-blue-500">
                            Class Name
                          </span>
                        </div>
                        <div className="flex flex-col mx-auto text-center w-1/2">
                          <label>
                            <input
                              onChange={(event) => {
                                setImageName(event.target?.files[0]?.name);
                              }}
                              className="text-sm cursor-pointer hidden"
                              type="file"
                              name="classImage"
                              id="image"
                              accept="image/*"
                              hidden
                            />
                            <div className="px-3 py-4 pl-0 border border-blue-400 w-full text-gray-600 text-left cursor-pointer flex items-center gap-3 rounded">
                              <BsCloudUploadFill className="w-6 h-6 text-blue-500 ml-3" />
                              <span className="text-base">
                                {imageName ? imageName : "Select class picture"}
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="flex gap-8 mb-6">
                        <div className="w-1/2 relative">
                          <input
                            className="border border-blue-400 text-base rounded p-3 text-gray-700 w-full bg-transparent focus:outline-blue-500 group"
                            type="text"
                            name="instructorName"
                            defaultValue={user?.displayName}
                            readOnly
                          />
                          <span className="absolute -top-[2px] left-4 px-2 transform -translate-y-1/2 bg-white text-base text-blue-500">
                            Instructor Name
                          </span>
                        </div>
                        <div className="w-1/2 relative">
                          <input
                            className="border border-blue-400 text-base rounded p-3 text-gray-700 w-full bg-transparent focus:outline-blue-500 group"
                            type="email"
                            name="instructorEmail"
                            defaultValue={user?.email}
                            readOnly
                            required
                          />
                          <span className="absolute -top-[2px] left-4 px-2 transform -translate-y-1/2 bg-white text-base text-blue-500">
                            Instructor Email
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-8 mb-6">
                        <div className="w-1/2 relative">
                          <input
                            className="border border-blue-400 text-base rounded p-3 text-gray-700 w-full bg-transparent focus:outline-blue-500 group"
                            type="text"
                            name="price"
                            defaultValue={singleClassInfo.price}
                            required
                          />
                          <span className="absolute -top-[2px] left-4 px-2 transform -translate-y-1/2 bg-white text-base text-blue-500">
                            Price
                          </span>
                        </div>
                        <div className="w-1/2 relative">
                          <input
                            className="border border-blue-400 text-base rounded p-3 text-gray-700 w-full bg-transparent focus:outline-blue-500 group"
                            type="text"
                            name="seat"
                            defaultValue={singleClassInfo.seats}
                            required
                          />
                          <span className="absolute -top-[2px] left-4 px-2 transform -translate-y-1/2 bg-white text-base text-blue-500">
                            Available Seats
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 duration-200 px-10 py-2 text-white rounded-full text-base w-40"
                          type="submit"
                          disabled={localLoading}
                        >
                          {localLoading ? (
                            <ImSpinner9 className="m-auto animate-spin w-6 h-6" />
                          ) : (
                            "Update"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MyClasses;
