import { createBrowserHistory } from 'history';
import MainLayout from '@/layouts/MainLayout';
// import Loading from '@/components/Loading';
import MyCenter from '@/pages/MyCenter'
import Find from '@/pages/Find'
import Square from '@/pages/Square'
import Video from '@/pages/Video'
import Login from '@/pages/Login'
import PhoneLogin from '@/pages/PhoneLogin'
import Settings from '@/pages/Settings'

// const Home = Loadable({loader: () => import('../pages/home'),loading: Loading});
// const ShopCart = Loadable({loader: () => import('../pages/shopCart'),loading: Loading});
// const Sort = Loadable({loader: () =>  import('../pages/sort'),loading: Loading});
// const Mine = Loadable({loader: () => import('../pages/mine'),loading: Loading});
// export const history = createBrowserHistory();


export const history = createBrowserHistory(); 

export const routes = [
  {
    path:'/',
    redirect: '/find'
  },
  {
    path: '/myCenter',
    layout:MainLayout,
    component: MyCenter
  },
  {
    path: '/find',
    layout:MainLayout,
    component: Find
  },
  {
    path: '/square',
    layout:MainLayout,
    component: Square
  },
  {
    path: '/video',
    layout:MainLayout,
    component: Video
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/phoneLogin',
    component: PhoneLogin
  },
  {
    path: '/settings',
    component: Settings
  },
]