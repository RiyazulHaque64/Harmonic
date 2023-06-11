import DynamicTitleSets from "../components/Title/DynamicTitleSets";
import SectionTitle from "../components/Title/SectionTitle";

const Instructors = () => {
  return (
    <div className="py-10 w-10/12 mx-auto">
      <DynamicTitleSets title="Instructors" />
      <SectionTitle title="Our expert instructors" />
    </div>
  );
};

export default Instructors;
