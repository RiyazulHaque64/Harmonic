import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { addToSelect } from "../../API/select";
import { updateClass } from "../../API/class";

const ClassCard = ({ classInfo, refetch }) => {
  const { user } = useAuth();
  const {
    _id,
    imgUrl,
    className,
    instructorName,
    instructorEmail,
    price,
    seats,
  } = classInfo;
  const navigate = useNavigate();
  const location = useLocation();

  const handleClassSelect = () => {
    if (user && user.email) {
      const selectedClassInfo = {
        classId: _id,
        className,
        instructorEmail,
        instructorName,
        imgUrl,
        price,
        seats,
        studentEmail: user.email,
      };
      addToSelect(selectedClassInfo).then((data) => {
        if (data.data.insertedId) {
          updateClass({ seats: seats - 1 }, _id).then(() => {
            refetch();
          });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully you selected the class",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } else {
      Swal.fire({
        title: "Do you want to select this class?",
        text: "Please, Login now",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="border rounded">
      <img
        className="h-48 xl:h-56 w-full object-cover rounded"
        src={imgUrl}
        alt="Course Image"
      />
      <div className="p-6 lg:p-8 text-center">
        <h2 className="text-2xl text-gray-800 font-semibold">{className}</h2>
        <h4 className="text-gray-800 mb-2">{instructorName}</h4>
        <p className="text-orange-500 font-bold text-2xl">${price}</p>
      </div>
      <div className="flex items-center justify-between bg-blue-400 w-full">
        <div className="w-1/2 text-center border-r border-blue-300 p-4">
          <p className="text-white font-semibold">
            Only <span>{seats}</span> Seats
          </p>
        </div>
        <div className="w-1/2 text-center p-2 group">
          <button
            onClick={handleClassSelect}
            className="font-semibold text-white cursor-pointer duration-200 group-hover:tracking-widest"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
