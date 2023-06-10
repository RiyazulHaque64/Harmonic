import { useQuery } from "@tanstack/react-query";
import DynamicTitleSets from "../../components/Title/DynamicTitleSets";
import SectionTitle from "../../components/Title/SectionTitle";
import useAuth from "../../hooks/useAuth";
import getEnrolledClasses from "../../API/enrolledClasses";

const EnrolledClasses = () => {
  const { user, loading } = useAuth();
  const { data: enrolledClasses, refetch } = useQuery({
    queryKey: ["myClass", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: () => getEnrolledClasses(user),
  });
  console.log(enrolledClasses);
  return (
    <div>
      <DynamicTitleSets title="Enrolled Classes" />
      <SectionTitle title="My Enrolled Classes" />
    </div>
  );
};

export default EnrolledClasses;
