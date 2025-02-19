import { Navigate, Route, createBrowserRouter, createRoutesFromElements, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';
import ConfirmedRegister from '../pages/ConfirmRegister';

const routesConfig = [

  { path: '/home', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/reset', element: <ResetPassword /> },
  { path: '/confirmed', element: <ConfirmedRegister /> }
];

const RootRoute = () => {
  const { pathname } = useLocation();
  return pathname === '/' ? <Navigate to="/home" /> : null;
};

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootRoute />} />
      {routesConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </>
  )
);

export default Router;
