import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'
import Loading from '@/components/Loading'

class DjSort extends React.Component {
    state = {
        sortList: []
    }
    componentDidMount() {
        this.initDjCatelist()
        document.title = '电台分类'
    }
    // 获取分类
    initDjCatelist = () => {
        http.getDjCatelist().then(res => {
            res.categories.forEach((item, index) => {
                item.icon = Iconpath[`dj_${index+1}`]
            })
            let obj1 = {
                title: '热门分类',
                sub: res.categories.slice(0, 7)
            }
            let obj2 = {
                title: '更多分类',
                sub: res.categories.slice(7, 100)
            }
            this.setState({
                sortList: [obj1, obj2] 
            })
        })
    }
    render() {
        const { sortList } = this.state
        if (sortList.length == 0) return <Loading/>
        return (
            <div className='djSort'>
                {
                    sortList.map((item, index) => 
                        <div key={index} className='sort-item'>
                            <h3 className='title'>{item.title}</h3>
                            <ul className='sort-ul da'>
                                {
                                    item.sub.map((sItem, sIndex) =>
                                        <li className='da sort-li' key={sIndex}>
                                            <img className='icon' src={sItem.icon} />
                                            <span className='name'>{sItem.name}</span>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(DjSort)