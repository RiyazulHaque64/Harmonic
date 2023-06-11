import { useEffect, useState } from "react";
import { getAllInstructor } from "../API/instructor";
import DynamicTitleSets from "../components/Title/DynamicTitleSets";
import SectionTitle from "../components/Title/SectionTitle";
import InstructorCard from "../components/Card/InstructorCard";
import NoData from "../components/Error/NoData";

const Instructors = () => {
  const [instructors, setinstructors] = useState([]);
  useEffect(() => {
    getAllInstructor().then((data) => setinstructors(data.data));
  }, []);
  return (
    <div className="py-10 w-10/12 mx-auto">
      <DynamicTitleSets title="Instructors" />
      <SectionTitle title="Our expert instructors" />
      {instructors && Array.isArray(instructors) && instructors.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
            {instructors.map((instructor) => (
              <InstructorCard
                key={instructor._id}
                instructorInfo={instructor}
              />
            ))}
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

export default Instructors;
