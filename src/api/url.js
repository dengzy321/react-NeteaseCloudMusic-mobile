export default {
  //获取banner
  getBanner:{
    method:'get',
    url: '/banner?type=1'
  },
  //获取推荐歌单 （推荐歌单）
  getRecommendSongs:{
    method:'get',
    url: '/personalized'
  },
  //获取推荐歌单 （获取精品歌单）
  getBoutiqueSongs:{
    method:'get',
    url: '/top/playlist/highquality'
  },
  //获取新碟（新碟上架）
  getNewDish:{
    method:'get',
    url: '/top/album'
  },
  //获取新歌（最新专辑）
  getNewSongs:{
    method:'get',
    url: '/album/newest'
  },
}