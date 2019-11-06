import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions';
import './index.css';
import { Carousel } from 'antd-mobile';
import RecommendSongs from '../../components/RecommendSongs'
import { http } from '../../api/http'


class myCenter extends React.Component {
    state = {
        bannerArr: []
    }
    componentDidMount() {
        this.initBanner()
    }
    initBanner =() =>{
        http.getBanner().then(res =>{
            this.setState({ bannerArr: res.banners })
        })
    }
    render() {
        const toolArr = [
            { icon: require('../../assets/music.png'), title: '每日推荐' },
            { icon: require('../../assets/music.png'), title: '歌单' },
            { icon: require('../../assets/music.png'), title: '排行榜' },
            { icon: require('../../assets/music.png'), title: '电台' },
            { icon: require('../../assets/music.png'), title: '直播' }
        ]
        const { bannerArr } = this.state
        return (
            <div className='find layout'>
                {/* banner图 */}
                <div className='banner'>
                     <Carousel
                    autoplay={true}
                    infinite
                    >
                        {
                            bannerArr.map((item, index) =>{
                                return <img key={index} className='' src={item.pic} alt='' />
                            })
                        }
                    </Carousel>
                </div>

                {/* 每日推荐 */}
                <div className='da centerNav'>
                    {
                        toolArr.map((item, index) => {
                            return (
                               <div key={index} className='dd-vh flex'>
                                    <img src={item.icon} alt="" /> 
                                    <span>{item.title}</span>
                               </div>
                           ) 
                        })
                    }
                </div>
                <RecommendSongs />
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(myCenter)