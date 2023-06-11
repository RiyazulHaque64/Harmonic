import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../Title/SectionTitle";
import { getPopularClasses } from "../../API/class";
import useAuth from "../../hooks/useAuth";
import ClassCard2 from "../ProductCard/ClassCard2";
import Button from "../Button/Button";

const PopularClasses = () => {
  const { loading } = useAuth();
  const { data: popularClasses } = useQuery({
    queryKey: ["popularClass"],
    enabled: !loading,
    queryFn: getPopularClasses,
  });
  return (
    <div className="py-16 w-10/12 mx-auto">
      <SectionTitle title="Popular Classes" />
      {popularClasses &&
      Array.isArray(popularClasses) &&
      popularClasses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
            {popularClasses.map((singleClass) => (
              <ClassCard2 key={singleClass._id} classInfo={singleClass} />
            ))}
          </div>
          <Button label="See all classes" />
        </>
      ) : (
        <>
          <p>No data available</p>
        </>
      )}
    </div>
  );
};

export default PopularClasses;
