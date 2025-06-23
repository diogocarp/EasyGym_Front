import { Navigate, Route, createBrowserRouter, createRoutesFromElements, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Manager from '../pages/Manager';
import Member from '../pages/Member';
import ResetPassword from '../pages/ResetPassword';
import ConfirmRegister from '../pages/ConfirmRegister';
import ConfirmedRegister from '../pages/ConfirmedRegister';
import ConfirmReset from '../pages/ConfirmReset';
import ConfirmedReset from '../pages/ConfirmedReset';
import Page404 from '../pages/Page404';

const routesConfig = [
  { path: '/home', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/reset', element: <ResetPassword /> },
  { path: '/confirm', element: <ConfirmRegister /> },
  { path: '/confirmed', element: <ConfirmedRegister /> },
  { path: '/ConfirmReset', element: <ConfirmReset /> },
  { path: '/confirmedReset', element: <ConfirmedReset /> },
  { path: '/manager', element: <Manager /> },
  { path: '/member', element: <Member /> },
  { path: '/404', element: <Page404 /> },
];

const RootRoute = () => {
  const { pathname } = useLocation();
  return pathname === '/' ? <Navigate to="/home" /> : null;
};

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<Page404 />} />
      <Route path="/" element={<RootRoute />} />
      {routesConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </>
  )
);

export default Router;
