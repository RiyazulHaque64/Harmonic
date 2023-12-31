import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import StudentDashboard from "../pages/StudentDashboard/StudentDashboard";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import InstructorDashboard from "../pages/instructorDashboard/InstructorDashboard";
import AddClass from "../pages/instructorDashboard/AddClass";
import MyClasses from "../pages/instructorDashboard/MyClasses";
import PrivateRoute from "./PrivateRoute";
import Classes from "../pages/Classes";
import SelectedClasses from "../pages/StudentDashboard/SelectedClasses";
import EnrolledClasses from "../pages/StudentDashboard/EnrolledClasses";
import ManageUsers from "../pages/AdminDashboard/ManageUsers";
import ManageClasses from "../pages/AdminDashboard/ManageClasses";
import PaymentHistory from "../pages/StudentDashboard/PaymentHistory";
import Instructors from "../pages/Instructors";
import ErrorPage from "../components/Error/ErrorPage";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import DashboardHome from "../pages/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
        path: "/instructors",
        element: <Instructors />,
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
    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <DashboardHome />,
      },
      {
        path: "/admin/dashboard/manageUsers",
        element: <ManageUsers />,
      },
      {
        path: "/admin/dashboard/manageClasses",
        element: <ManageClasses />,
      },
    ],
  },
  {
    path: "/instructor/dashboard",
    element: (
      <PrivateRoute>
        <InstructorRoute>
          <InstructorDashboard />
        </InstructorRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/instructor/dashboard",
        element: <DashboardHome />,
      },
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
        path: "/student/dashboard",
        element: <DashboardHome />,
      },
      {
        path: "/student/dashboard/selectedClasses",
        element: <SelectedClasses />,
      },
      {
        path: "/student/dashboard/enrolledClasses",
        element: <EnrolledClasses />,
      },
      {
        path: "/student/dashboard/paymentHistory",
        element: <PaymentHistory />,
      },
    ],
  },
]);

export default router;
