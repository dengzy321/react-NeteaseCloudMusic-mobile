import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'
import Loading from '@/components/Loading'

function DjList(props) {
    return (
        <div className='djList'>
            <ul className='dj-ul'>
                {
                    props.data.map((item, index) =>
                        <li className='dj-li da' key={index} onClick={() => props.history.push({ pathname: '/djDetail', state: { id: item.id } })}>
                            <img className='pic' src={item.picUrl} />
                            <div className='info'>
                                <h3 className='name'>{item.name}</h3>
                                <p className='rcmdtext'>{item.rcmdtext}</p>
                                <p className='lastProgramName'>{item.lastProgramName}</p>
                            </div>
                            <img className='icon' src={Iconpath.more_gray} />
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

// 推荐电台
function RecommendDj(props) {
    if(props.data.length == 0) return <Loading/>
    return (
        <div className='hotDjList'>
            <ul className='hotDjList-ul df'>
                {
                    props.data.map((item, index) =>
                        <li className='hotDjList-li' key={index} onClick={() => props.history.push({ pathname: '/djDetail', state: { id: item.id } })}>
                            <p className='picBox'>
                                <img className='pic' src={item.picUrl} />
                            </p>
                            <h5 className='name'>{item.name}</h5>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

class MyDj extends React.Component {
    state = {
        liveData: [],
        createData: [],
        recommendData: []
    }
    componentDidMount() {
        document.title = '我的电台'
        this.initUserDj()
        this.initDjSublist()
        this.initDjRecommend()
    }
    // 获取用户电台
    initUserDj = () => {
        http.getUserDj({
            uid: this.props.userInfo.userId
        }).then(res => {

        })
    }
    // 获取用户电台
    initDjSublist = () => {
        http.getDjSublist().then(res => {
            this.setState({
                liveData: res.djRadios
            })
        })
    }
    // 获取推荐电台
    initDjRecommend = () => {
        http.getDjRecommend().then(res => {
            this.setState({
                recommendData: res.djRadios.slice(0, 6)
            })
        })
    }
    render() {
        const { liveData, createData, recommendData } = this.state
        return (
            <div className='myDj'>
                <div className='createDj'>
                    <div className='header da'>
                        <span className='title'>我创建的电台</span>
                        <span className='count'>({createData.length})</span>
                    </div>
                    <DjList data={createData} {...this.props}/>
                </div>
                <div className='liveDj'>
                    <div className='header da'>
                        <span className='title'>我订阅的电台</span>
                        <span className='count'>({liveData.length})</span>
                    </div>
                    <DjList data={liveData} {...this.props}/>
                </div>
                <div className=''>
                    <div className='header da'>
                        <img className='icon_rate' src={Iconpath.rate_2_fill} />
                        <span className='title'>为你推荐</span>
                        <img className='icon_rigth' src={Iconpath.arrow_rigth_$999} />
                    </div>
                    <RecommendDj data={recommendData} {...this.props}/>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(MyDj)