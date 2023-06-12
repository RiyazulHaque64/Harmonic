import useAuth from "../hooks/useAuth";

const DashboardHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-4xl text-gray-700">
        <span className="font-bold text-orange-400 text-5xl">Welocome,</span>{" "}
        {user.displayName}
      </h2>
    </div>
  );
};

export default DashboardHome;
