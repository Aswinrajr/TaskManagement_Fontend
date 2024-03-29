import { RouterProvider } from "react-router-dom";
import routerPage from "./Components/Router/RouterPage";
import "./index.css"

function App() {
  return (
    <>
      <RouterProvider router={routerPage}></RouterProvider>
    </>
  );
}

export default App;
