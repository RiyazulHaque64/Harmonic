const InstructorCard = ({ instructorInfo }) => {
  const { photoUrl, name, email, role } = instructorInfo;
  return (
    <div className="shadow border-2 border-blue-500 text-center p-6 rounded">
      <div className="bg-white">
        <img
          className="mx-auto rounded-full border-2 border-blue-500 mb-4"
          src={photoUrl}
          alt=""
        />
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-700 mb-2">{email}</p>
        <p className="text-orange-500 font-bold">{role}</p>
      </div>
    </div>
  );
};

export default InstructorCard;
