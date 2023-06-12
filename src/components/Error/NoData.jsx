import noDataIllustration from "../../assets/image/no-data.png";
const NoData = () => {
  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center pb-12 md:pb-14 lg:pb-16 2xl:pb-20 2xl:pt-10">
      <img src={noDataIllustration} alt="" />
      <h2 className="text-4xl text-orange-400 font-semibold mb-1">
        No Results Found!
      </h2>
      <p className="text-gray-600 dark:text-white">
        An error occured or there is no data in this section
      </p>
    </div>
  );
};

export default NoData;
