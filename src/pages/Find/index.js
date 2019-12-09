import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Carousel } from 'antd-mobile';
import RecommendSongs from '@/components/RecommendSongs'
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'


class myCenter extends React.Component {
    state = {
        bannerArr: []
    }
    componentDidMount() {
        this.initBanner()
    }
    // 初始化banner
    initBanner = () => {
        http.getBanner().then(res => {
            this.setState({ bannerArr: res.banners })
        })
    }
    // 打开页面
    toLocation = (path) =>{
        this.props.history.push({
            pathname: `/${path}`
        })
    }
    render() {
        const toolArr = [
            { icon: Iconpath.calendar, title: '每日推荐', path: 'recommendedDaily' },
            { icon: Iconpath.music_fill, title: '歌单', path: 'songSheetSquare' },
            { icon: Iconpath.ranking, title: '排行榜', path: 'rankingList' },
            { icon: Iconpath.radio_2, title: '电台', path: 'RadioStation' },
            { icon: Iconpath.video_fill, title: '直播', path: 'songSheetSquare' }
        ]
        const { bannerArr } = this.state
        return (
            <div className='find layout'>
                {/* banner图 */}
                <div className='banner'>
                    <Carousel autoplay={true} infinite >
                        {
                            bannerArr.map((item, index) => <img key={index} className='' src={item.pic} alt='' />)
                        }
                    </Carousel>
                </div>

                {/* 每日推荐 */}
                <div className='da centerNav'>
                    {
                        toolArr.map((item, index) =>
                            <Link to={'/'+item.path} key={index} className='dd-vh flex'>
                                <img src={item.icon} alt="" />
                                <span>{item.title}</span>
                            </Link>
                        )
                    }
                </div>
                <RecommendSongs {...this.props}/>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(myCenter)