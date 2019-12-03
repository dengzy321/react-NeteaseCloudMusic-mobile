import React from 'react';
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
    initBanner = () => {
        http.getBanner().then(res => {
            this.setState({ bannerArr: res.banners })
        })
    }
    render() {
        const toolArr = [
            { icon: Iconpath.calendar, title: '每日推荐' },
            { icon: Iconpath.music_fill, title: '歌单' },
            { icon: Iconpath.ranking, title: '排行榜' },
            { icon: Iconpath.radio_2, title: '电台' },
            { icon: Iconpath.video_fill, title: '直播' }
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
                            <div key={index} className='dd-vh flex'>
                                <img src={item.icon} alt="" />
                                <span>{item.title}</span>
                            </div>
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