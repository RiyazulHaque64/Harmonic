import noDataIllustration from "../../assets/image/no-data.png";
const NoData = () => {
  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center py-20">
      <img src={noDataIllustration} alt="" />
      <h2 className="text-4xl text-orange-400 font-semibold mb-1">
        No Results Found!
      </h2>
      <p className="text-gray-600">
        An error occured or there is no data in this section
      </p>
    </div>
  );
};

export default NoData;
