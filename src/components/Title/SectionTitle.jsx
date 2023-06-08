const SectionTitle = ({ title }) => {
  return (
    <div className="text-center mb-24">
      <h2 className="text-4xl text-gray-700 font-bold mb-2 relative before:duration-500 before:mt-6 before:absolute before:content-[''] before:top-full before:left-1/2 before:w-[6%] before:h-[2px] before:ml-[-3%] before:bg-blue-500 hover:before:w-[24%] lg:hover:before:w-[18%] hover:before:ml-[-12%] lg:hover:before:ml-[-9%] before:z-50 after:mt-6 after:absolute after:content-[''] after:top-full after:left-1/2 after:w-[24%] lg:after:w-[18%] after:h-[2px] after:ml-[-12%] lg:after:ml-[-9%] after:bg-gray-200">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
