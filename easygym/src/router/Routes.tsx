import { Navigate, Route, createBrowserRouter, createRoutesFromElements, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Manager from '../pages/Manager';
import ResetPassword from '../pages/ResetPassword';
import ConfirmedRegister from '../pages/ConfirmRegister';
import Dashboard from '../components/manager/Dashboard';
import Plans from '../components/manager/Plans';
import Members from '../components/manager/Members';

const routesConfig = [
  { path: '/home', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/reset', element: <ResetPassword /> },
  { path: '/confirmed', element: <ConfirmedRegister /> },
  { path: '/manager', element: <Manager /> },

  //Caminhos para os componentes do gestor.

  { path: '/dashboard', element: <Dashboard /> },
  { path: '/plans', element: <Plans /> },
  { path: '/members', element: <Members /> }

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
