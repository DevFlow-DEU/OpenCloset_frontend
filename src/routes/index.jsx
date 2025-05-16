import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Particular from './pages/Particular';
import Search from './pages/Search';
import Login from './pages/Login';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/Home',
    element: <Home />,
  },
  {
    path: '/product/1',
    element: <Particular />,
  },
  {
    path: '/search',
    element: <Search />,
  },
 
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
