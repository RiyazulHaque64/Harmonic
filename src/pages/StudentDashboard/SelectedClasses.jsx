import { useQuery } from "@tanstack/react-query";
import DynamicTitleSets from "../../components/Title/DynamicTitleSets";
import SectionTitle from "../../components/Title/SectionTitle";
import useAuth from "../../hooks/useAuth";
import { getSelectedClasses } from "../../API/select";

const SelectedClasses = () => {
  const { user, loading } = useAuth();
  const { data } = useQuery({
    queryKey: ["selectedClass", user?.email],
    enabled: !loading && user?.email,
    queryFn: () => getSelectedClasses(user),
  });
  console.log(data);
  return (
    <div>
      <DynamicTitleSets title="Selected Classes" />
      <SectionTitle title="My Selected Classes" />
    </div>
  );
};

export default SelectedClasses;
