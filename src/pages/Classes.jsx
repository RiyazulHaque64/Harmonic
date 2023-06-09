import { useQuery } from "@tanstack/react-query";
import { getClass } from "../API/class";
import DynamicTitleSets from "../components/Title/DynamicTitleSets";
import SectionTitle from "../components/Title/SectionTitle";
import ClassCard from "../components/ProductCard/ClassCard";

const Classes = () => {
  const { data: allClasses } = useQuery({
    queryKey: ["allClass"],
    queryFn: getClass,
  });
  return (
    <div className="py-10 w-10/12 mx-auto">
      <DynamicTitleSets title="All Classes" />
      <SectionTitle title="See All Classes" />

      {allClasses && Array.isArray(allClasses) && allClasses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6 2xl:gap-8">
            {allClasses.map((singleClass) => (
              <ClassCard key={singleClass._id} classInfo={singleClass} />
            ))}
          </div>
        </>
      ) : (
        <>
          <p>No data available</p>
        </>
      )}
    </div>
  );
};

export default Classes;
