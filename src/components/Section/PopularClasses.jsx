import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../Title/SectionTitle";
import { getPopularClasses } from "../../API/class";
import useAuth from "../../hooks/useAuth";
import ClassCard2 from "../Card/ClassCard2";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import NoData from "../Error/NoData";
import { Fade } from "react-awesome-reveal";

const PopularClasses = () => {
  const { loading } = useAuth();
  const { data: popularClasses } = useQuery({
    queryKey: ["popularClass"],
    enabled: !loading,
    queryFn: getPopularClasses,
  });
  return (
    <div className="pt-16 w-10/12 mx-auto">
      <SectionTitle title="Top Classes" />
      {popularClasses &&
      Array.isArray(popularClasses) &&
      popularClasses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
            {popularClasses.map((singleClass) => (
              <ClassCard2 key={singleClass._id} classInfo={singleClass} />
            ))}
          </div>
          <div className="w-10/12 text-center mx-auto mt-10">
            <Link to="/classes">
              <Fade duration={2000}>
                <Button label="See all classes" />
              </Fade>
            </Link>
          </div>
        </>
      ) : (
        <>
          <NoData />
        </>
      )}
    </div>
  );
};

export default PopularClasses;
