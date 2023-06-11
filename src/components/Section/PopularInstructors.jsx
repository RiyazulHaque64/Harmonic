// import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import SectionTitle from "../Title/SectionTitle";
import { getTopInstructor } from "../../API/instructor";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import InstructorCard from "../Card/InstructorCard";
import NoData from "../Error/NoData";
// import { getTopInstructor } from "../../API/instructor";
// import useAuth from "../../hooks/useAuth";

const PopularInstructors = () => {
  const [popularInstructors, setPopularInstructors] = useState([]);
  useEffect(() => {
    getTopInstructor().then((data) => setPopularInstructors(data.data));
  }, []);
  return (
    <div>
      <div className="py-16 w-10/12 mx-auto">
        <SectionTitle title="Popular Instructor" />
        {popularInstructors &&
        Array.isArray(popularInstructors) &&
        popularInstructors.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
              {popularInstructors.map((instructor) => (
                <InstructorCard
                  key={instructor._id}
                  instructorInfo={instructor}
                />
              ))}
            </div>
            <div className="w-10/12 text-center mx-auto mt-10">
              <Link to="/instructors">
                <Button label="See all instructor" />
              </Link>
            </div>
          </>
        ) : (
          <>
            <NoData />
          </>
        )}
      </div>
    </div>
  );
};

export default PopularInstructors;
