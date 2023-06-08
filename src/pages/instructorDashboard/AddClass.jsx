import { useState } from "react";
import SectionTitle from "../../components/Title/SectionTitle";
import { BsCloudUploadFill } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";
import { addClass } from "../../API/class";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import DynamicTitleSets from "../../components/Title/DynamicTitleSets";

const imageHostingUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${
  import.meta.env.VITE_Image_Upload_Token
}`;

const AddClass = () => {
  const { user } = useAuth();
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddClassForm = (event) => {
    event.preventDefault();
    const form = event.target;
    setLoading(true);
    const className = form.className.value;
    const classImage = form.classImage.files[0];
    const instructorName = form.instructorName.value;
    const instructorEmail = form.instructorEmail.value;
    const price = parseFloat(form.price.value);
    const seats = parseInt(form.seat.value);
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
          className,
          imgUrl,
          instructorName,
          instructorEmail,
          price,
          seats,
        };
        addClass(classInfo).then((data) => {
          if (data.data?.insertedId) {
            setLoading(false);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Class successfully added",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        setLoading(false);
      });
  };

  return (
    <div>
      <DynamicTitleSets title="Add Class" />
      <SectionTitle title="Add A Class" />
      <div>
        <form
          className="px-8 md:px-14 lg:px-16 xl:px-20 2xl:px-24"
          onSubmit={handleAddClassForm}
        >
          <div className="flex gap-8 mb-6">
            <div className="w-1/2 relative">
              <input
                className="border border-blue-400 text-base rounded p-3 text-gray-700 w-full bg-transparent focus:outline-blue-500 group"
                type="text"
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
    </div>
  );
};

export default AddClass;
