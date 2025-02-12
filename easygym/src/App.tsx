import { RouterProvider } from "react-router-dom";
import Router from "./router/Routes";
import { GlobalStyle } from "./styles/GlobalStyles";

const App = () => {
  return (
      <>
      <GlobalStyle/>
      <RouterProvider router={Router} />
      </>
  );
};

export default App;