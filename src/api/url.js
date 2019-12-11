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
  //最新专辑
  getNewAlbum: {
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
  //资源点赞( MV,电台,视频)
  changeResourceLive: {
    method: 'get',
    url: '/resource/like'
  },
  // 收藏视频
  collectVideo: {
    method: 'get',
    url: '/video/sub'
  },
  // 全部 mv
  getMvAll: {
    method: 'get',
    url: '/mv/all'
  },
  // 最新 mv
  getFirstMv: {
    method: 'get',
    url: '/mv/first'
  },
  // 网易出品mv
  getExclusiveMv: {
    method: 'get',
    url: '/mv/exclusive/rcmd'
  },
  // 独家放送
  getPrivatecontent: {
    method: 'get',
    url: '/personalized/privatecontent'
  },
  // 获取歌单详情
  getSongSheetDetail: {
    method: 'get',
    url: '/playlist/detail'
  },
  // 获取歌曲详情
  getSongDetail: {
    method: 'get',
    url: '/song/detail'
  },
  // 歌单评论
  getSongSheetComment: {
    method: 'get',
    url: '/comment/playlist'
  },
  // mv 地址
  getMvUrl: {
    method: 'get',
    url: '/mv/url'
  },
  // 获取歌单分类
  getSongSheetSort: {
    method: 'get',
    url: '/playlist/catlist'
  },
  // 获取歌单分类下的歌单
  getSortSongSheetList: {
    method: 'get',
    url: '/top/playlist'
  },
  // 获取每日推荐歌单
  getRecommendSongSheet: {
    method: 'get',
    url: '/recommend/resource'
  },
  // 获取每日推荐歌曲
  getRecommendedDaily: {
    method: 'get',
    url: '/recommend/songs'
  },
  // 所有榜单
  getAllRankingList: {
    method: 'get',
    url: '/toplist'
  },
  // 所有榜单内容摘要
  getAllRankingDetail: {
    method: 'get',
    url: '/toplist/detail'
  },
  // 排行榜
  getSingleRanking: {
    method: 'get',
    url: '/top/list'
  },
  // 电台banner
  getDjBanner: {
    method: 'get',
    url: '/dj/banner'
  },
  // 电台 - 推荐
  getDjRecommend: {
    method: 'get',
    url: '/dj/recommend'
  },
  // 电台 - 付费精选
  getDjPaygift: {
    method: 'get',
    url: '/dj/paygift'
  },
  // 电台 - 分类
  getDjCatelist: {
    method: 'get',
    url: '/dj/catelist'
  },
  // 电台 - 分类推荐
  getDjRecommendType: {
    method: 'get',
    url: '/dj/recommend/type'
  },
  // 电台 - 类别热门电台
  getDjRadioHot: {
    method: 'get',
    url: '/dj/radio/hot'
  },
  // 电台 - 节目榜
  getDjProgramRanking: {
    method: 'get',
    url: '/dj/program/toplist'
  },
  // 电台 - 24小时节目榜
  getDjProgramHours: {
    method: 'get',
    url: '/dj/program/toplist/hours'
  },
  // 电台 - 最热主播榜
  getDjHotpopular: {
    method: 'get',
    url: '/dj/toplist/popular'
  },
  // 电台 - 主播新人榜
  getDjNewcomer: {
    method: 'get',
    url: '/dj/toplist/newcomer'
  },
  // 电台 - 24小时主播榜
  getDjPopularHours: {
    method: 'get',
    url: '/dj/toplist/hours'
  },
  // 电台 - 新晋电台榜/热门电台榜
  getDjHotRanking: {
    method: 'get',
    url: '/dj/toplist'
  },
  // 电台 - 付费精品
  getDjHotPay: {
    method: 'get',
    url: '/dj/toplist/pay'
  },
  // 电台 - 节目详情
  getDjProgramDetail: {
    method: 'get',
    url: '/dj/program/detail'
  },
  // 电台 - 详情
  getDjDetail: {
    method: 'get',
    url: '/dj/detail'
  },
  // 电台 - 节目
  getDjProgram: {
    method: 'get',
    url: '/dj/program'
  },
  // 电台 - 订阅
  getDjFollow: {
    method: 'get',
    url: '/dj/sub'
  },
}