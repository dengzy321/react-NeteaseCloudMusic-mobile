const arr = [
    'create',
    'inventory',
    'screenshot',
    'recover',
    'add',
    'arrow_rigth',
    'close_$ccc',
    'dw',
    'fm',
    'heart',
    'icon_video',
    'menu',
    'more',
    'more_gray',
    'music_fill',
    'music_black',
    'pitch',
    'search',
    'video',
    'collect',
    'calendar',
    'selected',
    'arrow_right_$fff',
    'live',
    'vip',
    'vip_fill',
    'comment',
    'forward',
    'address',
    'alarm_clock_1',
    'alarm_clock_2',
    'clothes',
    'coupon',
    'game',
    'listen_music',
    'messages',
    'night_mode',
    'order',
    'people',
    'quit',
    'recorder',
    'scan',
    'security',
    'settings',
    'shopCart',
    'small_bell',
    'ticket',
    'weibo',
    'weixin',
    'qq',
    'wangyi',
    'defalut_avatar',
    'integral',
    'logo',
    'ranking',
    'radio_2',
    'video_fill',
    'radio_1',
    'a',
    'space',
    'rate_2_fill',
    'rate_1_fill',
    'user_search',
    'user_fill',
    'close_$333',
    'play',
    'album',
    'bell_$333',
    'close_circular_$333',
    'download',
    'favorites_$333',
    'news',
    'next',
    'play_$333',
    'share_$333',
    'shopCart_$333',
    'singer',
    'clear',
    'play_menu_$666',
    'play_start_$666',
    'play_stop_$666',
    'arrow_left_$fff',
    'collection_live_$fff',
    'collection_live_red',
    'live_red',
    'live_red_fill',
    'comment_$fff',
    'dts',
    'listLoop_$fff',
    'more_$fff',
    'next_fill',
    'oneLoop_$fff',
    'play_start_$fff',
    'play_stop_$fff',
    'playList_$fff',
    'randomPlay_$fff',
    'share_$fff',
    'download_$fff',
    'music_controller',
    'arrow_rigth_$999',
    'live_$999',
    'collect_$333',
    'comment_$333',
    'live_$333',
    'collect_red',
]

let obj = {}
arr.forEach(item =>{
    obj[item] = require(`@/assets/${item}.png`)
})

export default obj