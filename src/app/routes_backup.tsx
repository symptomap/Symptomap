import { createBrowserRouter, Navigate } from "react-router";
import Registration from "./components/Registration";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/register",
    Component: Registration,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/personal-information",
    Component: Step1,
  },
  {
    path: "/symptom-mapping",
    Component: Step2,
  },
  // Redirect old route to new route
  {
    path: "/step2",
    element: <Navigate to="/symptom-mapping" replace />,
  },
  {
    path: "/treatment-therapy",
    Component: Step3,
  },
  // Redirect old routes to new routes
  {
    path: "/step3",
    element: <Navigate to="/treatment-therapy" replace />,
  },
  {
    path: "/medical-records",
    Component: Step4,
  },
  {
    path: "/step4",
    element: <Navigate to="/medical-records" replace />,
  },
]);
