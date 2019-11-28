import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { http } from '@/api/http'
import * as actions from '@/store/actions';
import { Tabs } from 'antd-mobile';
import Iconpath from '@/utils/iconpath'

class WaterfallList extends React.Component {
    state = {

    }
    componentDidMount(){
        console.log('componentDidMount==',this.props)
    }
    componentWillReceiveProps(nextProps){
        console.log('componentDidMount==',nextProps)
    }
    // 动态瀑布流
    getHeightRank = () =>{
        const el = this.waterfallUl.children
        const columns = 2; // 列数
        const gap = 10; // 间距
        const elWidth = (document.body.clientWidth - 30 - gap) / columns
        let heigthArr = []
        for(let i = 0; i<el.length; i++){
            el[i].style.width = elWidth + 'px'
            if(i < columns){
                el[i].style.top = 0;
                el[i].style.left = (elWidth + gap) * i + 'px'
                heigthArr.push(el[i].offsetHeight)
            }else{
                let minHeigth = heigthArr[0]
                let index = 0;
                for(let j = 0; j < heigthArr.length; j++){
                    if(minHeigth > heigthArr[j]){
                        minHeigth = heigthArr[j]
                        index = j
                    }
                }
                el[i].style.top = heigthArr[index] + gap + 'px'
                el[i].style.left = el[index].offsetLeft + 'px'
                heigthArr[index] = heigthArr[index] + el[i].offsetHeight + gap
            }
        }
    }
    render(){
        const { list } = this.props
        return(
            <div className='waterfall-box'>
                <ul className='waterfall-ul' ref={(el) => this.waterfallUl = el }>
                    {
                        list.map(({data}, index) =>
                            <li key={index} className='waterfall-li'>
                                <Link to='/'>
                                    <div className='pic-box'>
                                        <img className='coverUrl' src={data.coverUrl} />
                                        <img className='icon' src={Iconpath.icon_video} />
                                    </div>
                                    <h3 className='title to-2line'>{data.title}</h3>
                                    <p className='da footer'>
                                        <img className='avatarUrl' src={data.creator.avatarUrl} />
                                        <span className='name to-line'>{data.creator.nickname}</span>
                                        <span>{data.praisedCount}赞</span>
                                        <img className='more-icon' src={Iconpath.more_gray} />
                                    </p>
                                </Link>
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
)(WaterfallList)