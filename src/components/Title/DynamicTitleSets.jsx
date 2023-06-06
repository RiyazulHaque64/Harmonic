import { Helmet } from "react-helmet";

const DynamicTitleSets = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Harmonic</title>
    </Helmet>
  );
};

export default DynamicTitleSets;
