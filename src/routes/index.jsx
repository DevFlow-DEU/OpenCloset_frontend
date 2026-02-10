import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Particular from './pages/Particular';
import Search from './pages/Search';
import Login from './pages/Login';
import SearchResult from './pages/SearchResult';
import Registration from './pages/Registration';
import Chat from './pages/Chat'
import KakaoCheck from './pages/KakaoCheck'
import Error from './pages/Error'
import PasswordFind from './pages/PasswordFind'

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
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '/kakaocheck',
    element: <KakaoCheck />,
  },
   {
    path: '/error',
    element: <Error />,
  },
   {
    path: '/PasswordFind',
    element: <PasswordFind />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
