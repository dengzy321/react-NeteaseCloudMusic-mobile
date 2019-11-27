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
  //发送验证码
  sentVerify: {
    method: 'get',
    url: '/captcha/sent'
  },
  //验证验证码
  emailLogin: {
    method: 'get',
    url: '/captcha/verify'
  },
  //注册(修改密码)
  register: {
    method: 'get',
    url: '/register/cellphone'
  },
  // 退出登录
  logout: {
    method: 'get',
    url: '/logout'
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
  //获取热门话题
  getHotTopic: {
    method: 'get',
    url: '/hot/topic'
  },
  //热搜列表(简略)
  getHotSearch: {
    method: 'get',
    url: '/search/hot/detail'
  },
  //歌手分类列表
  getArtistList: {
    method: 'get',
    url: '/artist/list'
  },
  //搜索
  getSearch: {
    method: 'get',
    url: '/search'
  },
  //搜索建议
  getSearchSuggest: {
    method: 'get',
    url: '/search/suggest'
  },
  //搜索多重匹配
  getSearchMultimatch: {
    method: 'get',
    url: '/search/multimatch'
  },
  //获取音乐 url
  getSongUrl: {
    method: 'get',
    url: '/song/url'
  },
  //获取歌曲评论
  getMusicComment: {
    method: 'get',
    url: '/comment/music'
  },
  //给评论点赞
  getCommentLike: {
    method: 'get',
    url: '/comment/like'
  },
  //给评论点赞
  sendComment: {
    method: 'get',
    url: '/comment'
  },
  //视频评论
  getVideoComment: {
    method: 'get',
    url: '/comment/video'
  },
  //相关视频
  getRelatedVideo: {
    method: 'get',
    url: '/related/allvideo'
  },
  //关注/取消关注用户
  changeFollowUser: {
    method: 'get',
    url: '/follow'
  },
}