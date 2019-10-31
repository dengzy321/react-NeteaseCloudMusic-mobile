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
    'music',
    'music_black',
    'pitch',
    'search',
    'video',
    'collect',
    'calendar',
    'selected',
    'arrow_right_$fff',
]

let obj = {}
arr.forEach(item =>{
    obj[item] = require(`../assets/${item}.png`)
})

export default obj