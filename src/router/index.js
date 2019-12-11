import { createBrowserHistory } from 'history';
import Loadable from 'react-loadable';
import Loading from '@/components/Loading';
import MainLayout from '@/layouts/MainLayout';
import BlankLayout from '@/layouts/BlankLayout';
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
  'PlayPlatform',
  'Comment',
  'VideoComment',
  'SongSheetDetail',
  'SongSheetSquare',
  'SongSheetSort',
  'RecommendedDaily',
  'RankingList',
  'RadioStation',
  'DjSort',
  'DjRanking',
  'DjDetail',
  'PaySelected',
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
    layout:BlankLayout,
    component: PagesObj.Login
  },
  {
    path: '/phoneLogin',
    layout:BlankLayout,
    component: PagesObj.PhoneLogin
  },
  {
    path: '/settings',
    layout:BlankLayout,
    component: PagesObj.Settings
  },
  {
    path: '/search',
    layout:BlankLayout,
    component: PagesObj.Search
  },
  {
    path: '/test',
    layout:BlankLayout,
    component: PagesObj.Test
  },
  {
    path: '/artistCategory',
    component: PagesObj.ArtistCategory
  },
  {
    path: '/searchResult',
    layout:BlankLayout,
    component: PagesObj.SearchResult
  },
  {
    path: '/playPlatform',
    layout:BlankLayout,
    component: PagesObj.PlayPlatform
  },
  {
    path: '/comment',
    layout:BlankLayout,
    component: PagesObj.Comment
  },
  {
    path: '/videoComment',
    layout:BlankLayout,
    component: PagesObj.VideoComment
  },
  {
    path: '/songSheetDetail',
    layout:BlankLayout,
    component: PagesObj.SongSheetDetail
  },
  { 
    path: '/songSheetSquare',
    layout:BlankLayout,
    component: PagesObj.SongSheetSquare
  },
  { 
    path: '/songSheetSort',
    layout:BlankLayout,
    component: PagesObj.SongSheetSort
  },
  { 
    path: '/recommendedDaily',
    layout:BlankLayout,
    component: PagesObj.RecommendedDaily
  },
  {
    path: '/radioStation',
    layout:BlankLayout,
    component: PagesObj.RadioStation
  },
  {
    path: '/rankingList',
    layout: BlankLayout,
    component: PagesObj.RankingList
  },
  {
    path: '/djSort',
    layout: BlankLayout,
    component: PagesObj.DjSort
  },
  {
    path: '/djRanking',
    layout: BlankLayout,
    component: PagesObj.DjRanking
  },
  {
    path: '/djDetail',
    layout: BlankLayout,
    component: PagesObj.DjDetail
  },
  {
    path: '/paySelected',
    layout: BlankLayout,
    component: PagesObj.PaySelected
  },
]