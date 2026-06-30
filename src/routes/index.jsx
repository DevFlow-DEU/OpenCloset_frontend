import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Particular from './pages/Particular';
import Search from './pages/Search';
import Login from './pages/Login';
import SearchResult from './pages/SearchResult';
import Registration from './pages/Registration';
import Chat from './pages/Chat';
import KakaoCheck from './pages/KakaoCheck';
import Error from './pages/Error';
import PasswordFind from './pages/PasswordFind';
import MyPage from './pages/MyPage';
import PasswordChange from './pages/PasswordChange';
import EmailLogin from './pages/EmailLogin';
import SignUp from './pages/SignUp';
import GetLocation1 from './pages/GetLocation1';
import DeleteAccount from './pages/DeleteAccount/DeleteAccount';
import ChangeAddress from './pages/ChangeAddress/ChangeAddress';
import AccountSettings from './pages/AccountSettings';
import InformationEdit from './pages/InformationEdit';
import Test from './pages/Test';
import KakaoSignUp from './pages/KakaoSignUp';
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
    path: '/KakaoSignUp',
    element: <KakaoSignUp />,
  },
  {
    path: '/error',
    element: <Error />,
  },
  {
    path: '/PasswordFind',
    element: <PasswordFind />,
  },
  {
    path: '/delete-account',
    element: <DeleteAccount />,
  },
  {
    path: '/MyPage',
    element: <MyPage />,
  },
  {
    path: '/PasswordChange',
    element: <PasswordChange />,
  },
  {
    path: '/EmailLogin',
    element: <EmailLogin />,
  },
  {
    path: '/accountSettings',
    element: <AccountSettings />,
  },
  {
    path: '/informationEdit',
    element: <InformationEdit />,
  },
  {
    path: 'get-location1',
    element: <GetLocation1 />,
  },
  {
    path: 'test',
    element: <Test />,
  },
  {
    path: '/sign-up',
    Component: SignUp,
  },
  {
    path: '/change-address',
    Component: ChangeAddress,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
