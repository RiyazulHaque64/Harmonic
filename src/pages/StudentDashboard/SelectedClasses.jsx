import { useQuery } from "@tanstack/react-query";
import DynamicTitleSets from "../../components/Title/DynamicTitleSets";
import SectionTitle from "../../components/Title/SectionTitle";
import useAuth from "../../hooks/useAuth";
import { deleteSelectedClasses, getSelectedClasses } from "../../API/select";
import Swal from "sweetalert2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/Form/CheckoutForm";
import NoData from "../../components/Error/NoData";

const stripePromise = loadStripe(`${import.meta.env.VITE_Payment_Gateway_PK}`);

const SelectedClasses = () => {
  const { user, loading } = useAuth();
  const { data: selectedClasses, refetch } = useQuery({
    queryKey: ["selectedClass", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: () => getSelectedClasses(user),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [singleClassInfo, setSingleClassInfo] = useState({});

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

  function closeModal() {
    setIsOpen(false);
  }

  const handlePayButton = (singleClass) => {
    setSingleClassInfo(singleClass);
    setIsOpen(true);
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
                        onClick={() => handlePayButton(singleClass)}
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-700 text-center"
                  >
                    <span className="text-orange-500">Hurry Up!</span> Seat
                    limited
                  </Dialog.Title>
                  <div className="mt-2">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {singleClassInfo.className}
                      </h2>
                      <p className="text-gray-700 text-sm mb-2">
                        by <span>{singleClassInfo.instructorName}</span>
                      </p>
                      <p className="font-bold text-orange-500 mb-2">
                        ${singleClassInfo.price}
                      </p>

                      {/* Strype payment form */}
                      <Elements stripe={stripePromise}>
                        <CheckoutForm
                          closeModal={closeModal}
                          singleClassInfo={singleClassInfo}
                          refetch={refetch}
                        />
                      </Elements>
                    </div>
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

export default SelectedClasses;
