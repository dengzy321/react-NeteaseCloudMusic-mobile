import { createBrowserHistory } from 'history';
import Loadable from 'react-loadable';
import Loading from '@/components/Loading';
import MainLayout from '@/layouts/MainLayout';
export const history = createBrowserHistory(); 

const Pages = [
  'MyCenter',
  'Find',
  'Square',
  'Video',
  'Login',
  'PhoneLogin',
  'Settings',
  'Test',
  'ArtistCategory',
  'Search',
  'SearchResult',
]

let PagesObj = {}
Pages.forEach(path =>{
  PagesObj[path] = Loadable({ loader: () => import(`@/pages/${path}`), loading: Loading })
})

export const routes = [
  {
    path:'/',
    redirect: '/find'
  },
  {
    path: '/myCenter',
    layout:MainLayout,
    component: PagesObj.MyCenter
  },
  {
    path: '/find',
    layout:MainLayout,
    component: PagesObj.Find
  },
  {
    path: '/square',
    layout:MainLayout,
    component: PagesObj.Square
  },
  {
    path: '/video',
    layout:MainLayout,
    component: PagesObj.Video
  },
  {
    path: '/login',
    component: PagesObj.Login
  },
  {
    path: '/phoneLogin',
    component: PagesObj.PhoneLogin
  },
  {
    path: '/settings',
    component: PagesObj.Settings
  },
  {
    path: '/search',
    component: PagesObj.Search
  },
  {
    path: '/test',
    component: PagesObj.Test
  },
  {
    path: '/artistCategory',
    component: PagesObj.ArtistCategory
  },
  {
    path: '/searchResult',
    component: PagesObj.SearchResult
  },
]