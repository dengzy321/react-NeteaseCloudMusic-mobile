import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'

class SongSheetSort extends React.Component {
    state = {
        sortGroup: []
    }
    componentWillMount() {
        let { sortGroup } = this.state
        let { sortData } = this.props.location.state
        for (let i in sortData.categories) {
            let obj = {
                title: sortData.categories[i],
                sub: []
            }
            sortData.sub.forEach(item2 => {
                if (item2.category == i) {
                    item2.editStatus = false
                    obj.sub.push(item2)
                }
            })
            sortGroup.push(obj)
        }
        this.setState({ sortGroup }, () => this.getTabList(this.props))
    }
    componentWillReceiveProps(nextProps){
        this.getTabList(nextProps)
    }
    // 获取tab
    getTabList = (props) =>{
        let { sortGroup } = this.state
        sortGroup.splice(0, 1)

        let obj = { title: '我的歌单广场', editStatus: false, sub: [] }
        props.songSheetSort.forEach(item => {
            item.editStatus = false
            obj.sub.push(item)
        })
        sortGroup = [obj, ...sortGroup]
        this.setState({ sortGroup })
    }
    // 编辑
    onEdit = () => {
        let { sortGroup } = this.state
        sortGroup.forEach(item => {
            item.editStatus = !item.editStatus
            item.sub.forEach(item2 => {
                item2.editStatus = !item2.editStatus
            })
        })
        this.setState({ sortGroup })
    }
    // 添加 、删除
    onChangeSort = (params) => {
        this.props.changeSongSheetSort(params)
        this.onEdit()
    }
    render() {
        let { sortGroup } = this.state
        console.log(sortGroup)
        return (
            <div className='songSheetSort'>
                <ul className='sort-ul'>
                    {
                        sortGroup.map((item, index) =>
                            <li key={index} className='sort-li'>
                                <div className='header dbc'>
                                    <span className='title'>{item.title}</span>
                                    {index == 0 && <span className='btn' onClick={this.onEdit}>{item.editStatus ? '关闭' : '编辑'}</span>}
                                </div>
                                <ul className='sub-ul da'>
                                    {
                                        item.sub.map((item2, index2) =>
                                            <li key={index2} className='sub-li dcc to-line' onClick={item.editStatus ? this.onChangeSort.bind(this, index == 0 ? index2 : item2) : () => {}}>
                                                {item2.hot && !item2.editStatus && <img className='icon-hot' src={Iconpath.hot} />}
                                                {item2.editStatus && index != 0 ? '+' : item2.editStatus && index == 0 ? '-' : ''}
                                                <span className='subTitle'>{item2.title}</span>
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
)(SongSheetSort)