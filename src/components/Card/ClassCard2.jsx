const ClassCard2 = ({ classInfo }) => {
  const { imgUrl, className, instructorName, price, enrolledStudent } =
    classInfo;
  return (
    <div className="bg-gray-200 shadow-xl rounded">
      <img className="w-full h-64 rounded object-cover" src={imgUrl} alt="" />
      <div className="bg-white p-6 text-center border-b-4 border-blue-500">
        <h2 className="text-gray-800 font-semibold text-xl">{className}</h2>
        <h4 className="text-gray-700 mb-2">{instructorName}</h4>
        <p className="text-orange-500 font-bold mb-2">${price}</p>
        <p className="text-gray-700">Total Student: {enrolledStudent}</p>
      </div>
    </div>
  );
};

export default ClassCard2;
