/**
 * 微信js-sdk
 * 官方文档：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html
 */
import wx from 'weixin-js-sdk'
import axios from 'axios'

const wxApi = {
    /**
     * [wxRegister 微信Api初始化]
     * @param  {Function} callback [ready回调函数]
     */
    wxRegister(callback) {
        let wechaturl = window.location.href;
        axios.get(wechaturl + '', { params: '' }).then((res) => {
            wx.config({
                debug: false, // 开启调试模式
                appId: '', // 必填，公众号的唯一标识
                timestamp: '', // 必填，生成签名的时间戳
                nonceStr: '', // 必填，生成签名的随机串
                signature: '', // 必填，签名，见附录1
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'updateAppMessageShareData', 'updateTimelineShareData', 'chooseImage', 'getLocalImgData']// 必填，需要使用的JS接口列表，所有JS接口列表见附录2

            })
        }).catch((error) => {
            console.log("签署错误===", error)
        })
        wx.ready((res) => {
            if (callback) callback()
        })
    },

    /**
     * [ShareTimeline 微信分享到朋友圈]
     * @param {[type]} option [分享信息]
     * @param {[type]} success [成功回调]
     * @param {[type]} error   [失败回调]
     */
    shareTimeline(option) {
        wx.updateTimelineShareData({
            title: option.title, // 分享标题
            link: option.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: option.imgUrl, // 分享图标
            success: function () {
                console.log('分享到朋友圈', option)
            }
        })
    },

    /**
     * [ShareAppMessage 微信分享给朋友]
     * @param {[type]} option [分享信息]
     * @param {[type]} success [成功回调]
     * @param {[type]} error   [失败回调]
     */
    shareAppMessage(option) {
        wx.onMenuShareAppMessage({
            title: option.title, // 分享标题
            desc: option.desc, // 分享描述
            link: option.link, // 分享链接
            imgUrl: option.imgUrl, // 分享图标
            success: function () {
                console.log('分享给朋友', option)
            }
        });
    },
}

/**
 * 调用方式： 
 * wx.wxRegister(this.ShareAppMessage())
 * */

export default wxApi