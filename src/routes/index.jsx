import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Particular from './pages/Particular';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/product/1',
    element: <Particular />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
