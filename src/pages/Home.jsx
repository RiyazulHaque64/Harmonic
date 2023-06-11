import PopularClasses from "../components/Section/PopularClasses";
import DynamicTitleSets from "../components/Title/DynamicTitleSets";
const Home = () => {
  return (
    <div>
      <DynamicTitleSets title="Home" />
      <PopularClasses />
    </div>
  );
};

export default Home;
