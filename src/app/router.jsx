import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../domains/product/pages/Home';
import Product from '../domains/product/pages/Product';
import Search from '../domains/product/pages/Search';
import Login from '../domains/auth/pages/Login';
import SearchResult from '../domains/product/pages/SearchResult';
import Registration from '../domains/product/pages/Registration';
import KakaoCheck from '../domains/auth/pages/KakaoCheck';
import Error from '../routes/pages/Error';
import PasswordFind from '../domains/auth/pages/PasswordFind';
import MyPage from '../domains/mypage/pages/MyPage';
import PasswordChange from '../domains/auth/pages/PasswordChange';
import EmailLogin from '../domains/auth/pages/EmailLogin';
import SignUp from '../domains/auth/pages/SignUp';
import GetLocation1 from '../domains/location/pages/GetLocation1';
import DeleteAccount from '../domains/auth/pages/DeleteAccount';
import ProductManage from '../domains/product/pages/ProductManage';
import DeleteAccountComplete from '../domains/auth/pages/DeleteAccountComplete';
import ChangeAddress from '../domains/location/pages/ChangeAddress';
import AccountSettings from '../domains/auth/pages/AccountSettings';
import InformationEdit from '../domains/auth/pages/InformationEdit';
import Test from '../routes/pages/Test';
import KakaoSignUp from '../domains/auth/pages/KakaoSignUp';
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
    element: <Product />,
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
    path: '/DeleteAccount',
    element: <DeleteAccount />,
  },
  {
    path: '/ProductManage',
    element: <ProductManage />,
  },
  {
    path: '/DeleteAccountComplete',
    element: <DeleteAccountComplete />,
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
