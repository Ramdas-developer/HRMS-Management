import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./component/HomePage";
import Login from "./component/Login";
import RegisterPage from "./component/RegisterPage";
import Dashboard from "./pages/dashboard/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Employee from "./pages/employee/Employee";
import DashboardDetails from "./pages/dashboard/DashboardDetails";
import AddEmployee from "./pages/employee/AddEmployee";
import AddCandidate from "./pages/candidate/AddCandidate";
import Candidate from "./pages/candidate/Candidate";
import Attendance from "./pages/attendance/Attendance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardDetails />,
      },
      {
        path: "candidate",
        element: <Candidate />,
      },

      {
        path: "addcandidate",
        element: <AddCandidate />,
      },

      {
        path: "employees",
        element: <Employee />,
      },

      {
        path: "addemployee",
        element: <AddEmployee />,
      },

      {
        path: "employees",
        element: <Employee />,
      },

      {
        path: "attendance",
        element: <Attendance />,
      },
    ],
  },

  { path: "*", element: <div>not found</div> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
