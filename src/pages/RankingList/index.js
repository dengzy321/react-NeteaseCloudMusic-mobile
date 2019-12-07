import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import Loading from '@/components/Loading'

class RankingList extends React.Component {
    state = {
        rankingList: []
    }
    componentWillMount() {
        document.title = '排行榜'
        this.initAllRankingDetail()
    }
    // 初始列表内容
    initAllRankingDetail = () => {
        http.getAllRankingDetail().then(res => {
            let supObj1 = {
                title: '硬地原创音乐榜',
                sub: [{
                    coverImgUrl: '//p1.music.126.net/pKmNkpF1520xzyr3fwpeMQ==/109951164524844356',
                    updateFrequency: '每月更新',
                    tracks: [
                        { first: '散去的时候', second: 'deca joins' },
                        { first: '哥特电影', second: '宫阁' },
                        { first: '你把我的脸庞转向明天', second: '法兹乐队 FAZI/海明森' }
                    ]
                }]
            }
            let supObj2 = {
                title: '官方榜',
                sub: []
            }
            let supObj3 = {
                title: '推荐榜',
                sub: []
            }
            let supObj4 = {
                title: '更多榜单',
                sub: []
            }
            res.list.forEach(item => {
                if (item.ToplistType) supObj2.sub.push(item)
                else if (item.tags.length == 1) supObj3.sub.push(item)
                else supObj4.sub.push(item)
            })
            this.setState({ rankingList: [supObj1, supObj2, supObj3, supObj4] })
        })
    }
    // 打开页面
    tolocation = (id) =>{ 
        if(id){
            this.props.history.push({
                pathname: '/SongSheetDetail',
                state: { id }
            })
        } else window.location.href = 'https://music.163.com/m/at/5de4dc7f631040fc2329e94b'
    }
    render() {
        const { rankingList } = this.state
        if (rankingList.length == 0) return <Loading />
        return (
            <div className='rankingList'>
                <ul className='sup-ul'>
                    {
                        rankingList.map((item, index) =>
                            <li key={index} className='sup-li'>
                                <h3 className='title'>{item.title}</h3>
                                <ul className='sub-ul da'>
                                    {
                                        item.sub.map((item2, index2) =>
                                            index < 2 ?
                                                <li key={index2} className='sub1-li da' onClick={this.tolocation.bind(this, item2.id)}>
                                                    <div className='coverImg'>
                                                        <img src={item2.coverImgUrl} />
                                                        <b className='tip'>{item2.updateFrequency}</b>
                                                    </div>
                                                    <div className='tracks ddb'>
                                                        {
                                                            item2.tracks.map((item3, index3) =>
                                                                <p className='da' key={index3}>
                                                                    <span>{index3 + 1}.</span>
                                                                    <span>{item3.first} - {item3.second}</span>
                                                                </p>
                                                            )
                                                        }
                                                    </div>
                                                </li> :
                                                <li key={index2} className='sub2-li' onClick={this.tolocation.bind(this, item2.id)}>
                                                    <div className='coverImg'>
                                                        <img src={item2.coverImgUrl} />
                                                        <b className='tip'>{item2.updateFrequency}</b>
                                                    </div>
                                                    <h3 className='name to-line'>{item2.name}</h3>
                                                </li>
                                        )
                                    }
                                </ul>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(RankingList)