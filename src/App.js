import Root from "./routes/root";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Discover from "./routes/pages/discover";

const router = createBrowserRouter([
  {
    path: "/app",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "discover",
        element: <Discover />,
      },
      {
        path: "contacts/:contactId",
        element: <Discover />,
      },
    ],
  },
  {
    path: "/login",
    element: <div>login</div>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Discover />,
      },
    ],
  },
  {
    path: "/signin",
    element: <div>sign in</div>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "signin",
        element: <Discover />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider errorElement={<ErrorPage />} router={router} />
    </>
  );
}

export default App;
