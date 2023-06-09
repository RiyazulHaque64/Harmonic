import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { BsCloudUploadFill } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";

const UpdateModal = ({ closeModal, isOpen, singleClassInfo }) => {
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const updateClass = () => {
    setLoading(true);
    closeModal();
  };
  return (
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
          <div className="flex w-full min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment successful
                </Dialog.Title>
                <div className="mt-2">
                  <form
                    className="px-8 md:px-14 lg:px-16 xl:px-20 2xl:px-24"
                    onSubmit={updateClass}
                  >
                    <div className="flex gap-8 mb-6">
                      <div className="w-1/2 relative">
                        <input
                          className="border border-blue-400 text-base rounded p-3 text-gray-700 w-full bg-transparent focus:outline-blue-500 group"
                          type="text"
                          name="className"
                          defaultValue={singleClassInfo.className}
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
                            required
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
                        disabled={loading}
                      >
                        {loading ? (
                          <ImSpinner9 className="m-auto animate-spin w-6 h-6" />
                        ) : (
                          "Add Class"
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={modalHandler}
                  >
                    Got it, thanks!
                  </button>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateModal;
