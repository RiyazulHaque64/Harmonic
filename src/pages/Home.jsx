import PopularClasses from "../components/Section/PopularClasses";
import PopularInstructors from "../components/Section/PopularInstructors";
import Stat from "../components/Section/Stat";
import Slider from "../components/Slider/Slider";
import DynamicTitleSets from "../components/Title/DynamicTitleSets";
const Home = () => {
  return (
    <div>
      <DynamicTitleSets title="Home" />
      <Slider />
      <PopularInstructors />
      <PopularClasses />
      <Stat />
    </div>
  );
};

export default Home;
