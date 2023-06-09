import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import StudentDashboard from "../pages/StudentDashboard/StudentDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import InstructorDashboard from "../pages/instructorDashboard/InstructorDashboard";
import AddClass from "../pages/instructorDashboard/AddClass";
import MyClasses from "../pages/instructorDashboard/MyClasses";
import PrivateRoute from "./PrivateRoute";
import Classes from "../pages/Classes";
import SelectedClasses from "../pages/StudentDashboard/SelectedClasses";
import EnrolledClasses from "../pages/StudentDashboard/EnrolledClasses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/instructor/dashboard",
    element: <InstructorDashboard />,
    children: [
      {
        path: "/instructor/dashboard/addClass",
        element: <AddClass />,
      },
      {
        path: "/instructor/dashboard/myClasses",
        element: <MyClasses />,
      },
    ],
  },
  {
    path: "/student/dashboard",
    element: (
      <PrivateRoute>
        <StudentDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/student/dashboard/selectedClasses",
        element: <SelectedClasses />,
      },
      {
        path: "/student/dashboard/enrolledClasses",
        element: <EnrolledClasses />,
      },
    ],
  },
]);

export default router;
