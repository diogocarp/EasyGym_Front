import { Navigate, Route, createBrowserRouter, createRoutesFromElements, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Manager from '../pages/Manager';
import Member from '../pages/Member';
import ResetPassword from '../pages/ResetPassword';
import ConfirmedRegister from '../pages/ConfirmRegister';
import ConfirmedReset from '../pages/ConfirmReset';

const routesConfig = [
  { path: '/home', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/reset', element: <ResetPassword /> },
  { path: '/confirmed', element: <ConfirmedRegister /> },
  { path: '/confirmedReset', element: <ConfirmedReset /> },
  { path: '/manager', element: <Manager /> },
  { path: '/member', element: <Member /> },
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
