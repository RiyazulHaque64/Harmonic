import PopularClasses from "../components/Section/PopularClasses";
import PopularInstructors from "../components/Section/PopularInstructors";
import DynamicTitleSets from "../components/Title/DynamicTitleSets";
const Home = () => {
  return (
    <div>
      <DynamicTitleSets title="Home" />
      <PopularInstructors />
      <PopularClasses />
    </div>
  );
};

export default Home;
