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
        leftList: [],
        rightList: []
    }
    componentDidMount(){
        
    }
    componentWillReceiveProps(nextProps) {
        let lList=[], rList=[]
        nextProps.list.forEach((item, index) => {
            if (index % 2 == 0) rList.push(item)
            else lList.push(item)
        })
        this.setState({
            list: nextProps.list,
            leftList: lList,
            rightList: rList
        })
    }
    // 动态瀑布流
    // getHeightRank = () =>{
    //     const el = this.waterfallUl.children
    //     const columns = 2; // 列数
    //     const gap = 10; // 间距
    //     const elWidth = (document.body.clientWidth - 30 - gap) / columns
    //     let heigthArr = []
    //     for(let i = 0; i<el.length; i++){
    //         el[i].style.width = elWidth + 'px'
    //         if(i < columns){
    //             el[i].style.top = 0;
    //             el[i].style.left = (elWidth + gap) * i + 'px'
    //             heigthArr.push(el[i].offsetHeight)
    //         }else{
    //             let minHeigth = heigthArr[0]
    //             let index = 0;
    //             for(let j = 0; j < heigthArr.length; j++){
    //                 if(minHeigth > heigthArr[j]){
    //                     minHeigth = heigthArr[j]
    //                     index = j
    //                 }
    //             }
    //             el[i].style.top = heigthArr[index] + gap + 'px'
    //             el[i].style.left = el[index].offsetLeft + 'px'
    //             heigthArr[index] = heigthArr[index] + el[i].offsetHeight + gap
    //         }
    //     }
    // }
    render(){
        const { leftList, rightList } = this.state
        return(
            <div className='waterfall-box df'>
                <div className='waterfall-list'>
                    <ul className='wFall-ul'>
                        {
                            leftList.map((item, index) => 
                                <li className='wFall-li' key={index}>
                                    <img className='coverImg' src={item.cover} />
                                    <p className='title'>
                                        <span>{item.briefDesc ? item.briefDesc : item.name}</span>
                                    </p>
                                </li>
                            ) 
                        }
                    </ul>
                </div>
                <div className='waterfall-list'>
                    <ul className='wFall-ul'>
                        {
                            rightList.map((item, index) =>
                                <li className='wFall-li' key={index}>
                                    <img className='coverImg' src={item.cover} />
                                    <p className='title'>
                                        <span>{item.briefDesc ? item.briefDesc : item.name}</span>
                                    </p>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(WaterfallList)