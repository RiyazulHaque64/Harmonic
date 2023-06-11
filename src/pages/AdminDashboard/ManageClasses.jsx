import { updateClass } from "../../API/class";
import DynamicTitleSets from "../../components/Title/DynamicTitleSets";
import SectionTitle from "../../components/Title/SectionTitle";
import { useGetClasses } from "../../hooks/useGetClasses";
import { ImSpinner9 } from "react-icons/im";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import Swal from "sweetalert2";
import { BsArrowRight } from "react-icons/bs";
import NoData from "../../components/Error/NoData";

const ManageClasses = () => {
  const [allClasses, refetch] = useGetClasses();
  const [localLoading, setLocalLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackID, setFeedbackID] = useState("");

  function closeModal() {
    setIsOpen(false);
  }
  function handleFeedbackModal(id) {
    setFeedbackID(id);
    setIsOpen(true);
  }

  const handleFeedbackForm = (event) => {
    event.preventDefault();
    setLocalLoading(true);
    const form = event.target;
    const _id = form.id.value;
    const feedback = form.feedback.value;
    const classInfo = {
      feedback,
      status: "denied",
    };

    updateClass(classInfo, _id).then((data) => {
      console.log(data.data);
      if (data.data.modifiedCount) {
        setLocalLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Send feedback successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        closeModal();
        refetch();
      }
    });
    setLocalLoading(false);
  };

  const handleApproval = (id) => {
    const classInfo = {
      status: "approved",
      feedback: "No Feedback",
    };
    updateClass(classInfo, id).then((data) => {
      if (data.data.modifiedCount > 0) {
        refetch();
      }
    });
  };
  return (
    <div>
      <DynamicTitleSets title="Manage Classes" />
      <SectionTitle title="Manage Classes" />
      <div className="w-full 2xl:w-10/12 mx-auto">
        {allClasses && Array.isArray(allClasses) && allClasses.length > 0 ? (
          <table className="border w-full text-center">
            <thead className="bg-gray-100 text-gray-800">
              <tr className="border border-gray-100">
                <th className="border p-1 text-sm xl:text-base md:p-2">#</th>
                <th className="border p-1 text-sm xl:text-base md:p-2">
                  Image
                </th>
                <th className="border p-1 text-sm xl:text-base md:p-2">Name</th>
                <th className="border p-1 text-sm xl:text-base md:p-2">
                  Price
                </th>
                <th className="border p-1 text-sm xl:text-base md:p-2">
                  Instructor Name
                </th>
                <th className="border p-1 text-sm xl:text-base md:p-2">
                  Instructor Email
                </th>
                <th className="border p-1 text-sm xl:text-base md:p-2">
                  Seats
                </th>
                <th className="border p-1 text-sm xl:text-base md:p-2">
                  Status/Approval
                </th>
              </tr>
            </thead>
            <tbody>
              {allClasses.map((singleClass, index) => (
                <tr className="border" key={singleClass._id}>
                  <th className=" border-r text-sm p-1 text-center text-gray-700">
                    {index + 1}
                  </th>
                  <td className="p-1">
                    <img
                      className="w-8 md:w-12 h-8 lg:h-12 mx-auto"
                      src={singleClass.imgUrl}
                      alt=""
                    />
                  </td>
                  <td className="p-1 text-[10px] md:text-sm xl:text-base md:p-2 text-gray-700">
                    {singleClass.className}
                  </td>
                  <td className="p-1 text-[10px] md:text-sm xl:text-base md:p-2 text-gray-700">
                    ${singleClass.price}
                  </td>
                  <td className="p-1 text-[10px] md:text-sm xl:text-base md:p-2 text-gray-700">
                    <span>{singleClass.instructorName}</span>
                  </td>
                  <td className="p-1 text-[10px] md:text-sm xl:text-base md:p-2 text-gray-700">
                    {singleClass.instructorEmail}
                  </td>
                  <td className="p-1 text-[10px] md:text-sm xl:text-base md:p-2 text-gray-700">
                    {singleClass.seats}
                  </td>
                  <td className="p-1 text-[10px] md:text-sm xl:text-base md:p-2 text-gray-700">
                    <button
                      onClick={() => handleApproval(singleClass._id)}
                      className={`p-2 text-sm 2xl:text-base font-semibold duration-200 border-r border-gray-400 rounded-ss-lg rounded-es-lg disabled:cursor-not-allowed ${
                        singleClass.status === "approved"
                          ? "bg-green-500 text-white hover:bg-green-500 border-none"
                          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                      disabled={singleClass.status === "approved"}
                    >
                      {singleClass.status === "approved"
                        ? "Approved"
                        : "Approve"}
                    </button>
                    <button
                      className={`p-2 text-sm 2xl:text-base font-semibold  duration-200 border-r border-gray-400 disabled:cursor-not-allowed ${
                        singleClass.status === "denied"
                          ? "bg-red-500 text-white hover:bg-red-500"
                          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                      onClick={() => handleFeedbackModal(singleClass._id)}
                      disabled={singleClass.status === "denied"}
                    >
                      {singleClass.status === "denied" ? "Denied" : "Deny"}
                    </button>
                    <button
                      className={`p-2 text-sm 2xl:text-base  font-semibold duration-200 rounded-ee-lg rounded-se-lg disabled:cursor-not-allowed ${
                        singleClass.status === "pending"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                      disabled={true}
                    >
                      Pending
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
                    <form onSubmit={handleFeedbackForm}>
                      <div className="w-full mb-4 relative">
                        <input
                          className="hidden"
                          type="text"
                          name="id"
                          defaultValue={feedbackID}
                          required
                        />
                        <input
                          className="border border-blue-400 text-base rounded p-3 text-gray-700 w-full bg-transparent focus:outline-blue-500 group"
                          type="text"
                          name="feedback"
                          required
                        />
                        <span className="absolute -top-[2px] left-4 px-2 transform -translate-y-1/2 bg-white text-base text-blue-500">
                          Type the reason of deny
                        </span>
                      </div>
                      <div className="text-right">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 duration-200 px-10 py-2 text-white rounded-full text-base w-56"
                          type="submit"
                          disabled={localLoading}
                        >
                          {localLoading ? (
                            <ImSpinner9 className="m-auto animate-spin w-6 h-6" />
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              Send Feedback
                              <BsArrowRight />
                            </span>
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

export default ManageClasses;
