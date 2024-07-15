import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading";
import TabBar from "./components/TabBar";
import Problems from "./pages/Problems";
import Analytics from "./pages/Analytics";
import Learning from "./pages/Learning";

export const router = createBrowserRouter([
  {
    path: "/Problems",
    element: <Problems />,
  },
  {
    path: "/",
    element: <Analytics />,
  },
  {
    path: "/Learning",
    element: <Learning />,
  },
]);
const App = () => {
  return (
    <>
      <div className="mainView">
        <RouterProvider router={router} />
      </div>
      <TabBar />
      <Loading />
    </>
  );
};

export default App;
