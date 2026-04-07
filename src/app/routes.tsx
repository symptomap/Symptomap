import { createBrowserRouter, Navigate, useRouteError } from "react-router";
import Registration from "./components/Registration";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import { ReportPreview } from "./components/ReportPreview";

function ErrorBoundary() {
  const error = useRouteError();
  console.error("Route error:", error);
  
  return (
    <div className="min-h-screen bg-[#F8F8FA] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full mx-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h1>
        <p className="text-gray-600 mb-6">Something went wrong. Let's get you back on track.</p>
        <button
          onClick={() => window.location.href = "/"}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/register",
    element: <Registration />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/personal-information",
    element: <Step1 />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/symptom-mapping",
    element: <Step2 />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/step2",
    element: <Navigate to="/symptom-mapping" replace />,
  },
  {
    path: "/treatment-therapy",
    element: <Step3 />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/step3",
    element: <Navigate to="/treatment-therapy" replace />,
  },
  {
    path: "/medical-records",
    element: <Step4 />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/step4",
    element: <Navigate to="/medical-records" replace />,
  },
  {
    path: "/report-preview",
    element: <ReportPreview />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/plugin",
    element: <Navigate to="/" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);