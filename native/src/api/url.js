export default {
  //手机登录
  phoneLogin: {
    method: 'get',
    url: '/login/cellphone'
  },
  //邮箱登录
  emailLogin: {
    method: 'get',
    url: '/login'
  },
  //获取banner
  getBanner: {
    method: 'get',
    url: '/banner?type=1'
  },
  //获取推荐歌单 （推荐歌单）
  getRecommendSongs: {
    method: 'get',
    url: '/personalized'
  },
  //获取推荐歌单 （获取精品歌单）
  getBoutiqueSongs: {
    method: 'get',
    url: '/top/playlist/highquality'
  },
  //获取新碟（新碟上架）
  getNewDish: {
    method: 'get',
    url: '/top/album'
  },
  //获取新歌（最新专辑）
  getNewSongs: {
    method: 'get',
    url: '/album/newest'
  },
  //云村广场视频（获取视频标签列表）
  getVideoTabs: {
    method: 'get',
    url: '/video/group/list'
  },
  // 获取视频标签下的视频
  getVideoGroup: {
    method: 'get',
    url: '/video/group'
  },
  //获取视频播放地址
  getVideoUrl: {
    method: 'get',
    url: '/video/url'
  },
  // 视频详情
  getVideoDetail: {
    method: 'get',
    url: '/video/detail'
  },
  //推荐节目 --- 独家放送
  getRecommendProgram: {
    method: 'get',
    url: '/program/recommend'
  },
  //获取动态消息
  getDynamicInfo: {
    method: 'get',
    url: '/event'
  },
  //获取 mv 排行
  getMvRanking: {
    method: 'get',
    url: '/top/mv'
  },
}