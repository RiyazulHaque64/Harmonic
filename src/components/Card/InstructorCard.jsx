import { Zoom } from "react-awesome-reveal";

const InstructorCard = ({ instructorInfo }) => {
  const { photoUrl, name, email, role } = instructorInfo;
  return (
    <Zoom duration={1500}>
      <div className="shadow border-2 border-blue-500 dark:border-white text-center p-6 dark:p-1 rounded">
        <div className="bg-white p-4">
          <img
            className="mx-auto rounded-full border-2 border-blue-500 mb-4 w-72 h-72 object-cover"
            src={photoUrl}
            alt=""
          />
          <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-700 mb-2">{email}</p>
          <p className="text-orange-500 font-bold">{role}</p>
        </div>
      </div>
    </Zoom>
  );
};

export default InstructorCard;
