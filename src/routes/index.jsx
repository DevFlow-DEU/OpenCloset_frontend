import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Particular from './pages/Particular';
import Search from './pages/Search';
import Login from './pages/Login';
import SearchResult from './pages/SearchResult';
import Registration from './pages/Registration';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/product/:id',
    element: <Particular />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/search/result/:searchText',
    element: <SearchResult />,
  },
  {
    path: '/add_product',
    element: <Registration />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
