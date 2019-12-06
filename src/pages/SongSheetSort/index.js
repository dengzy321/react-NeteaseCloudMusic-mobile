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

        let obj = {
            title: '我的歌单',
            editBtn: false,
            sub: this.props.songSheetSort.map(item => {
                item.editStatus = false
                return item
            })
        }
        this.setState({
            sortGroup: [obj, ...sortGroup]
        })
    }
    // 编辑
    onEdit = (status) => {
        let { sortGroup } = this.state
        sortGroup.forEach((item, index) => {
            if (index == 0) item.editBtn = !status
            item.sub.forEach(item2 => {
                item2.editStatus = !status
                item2.isSelect = false
                sortGroup[0].sub.forEach(item3 => {
                    if (item2.title == item3.title && index != 0 && !status) {
                        item2.isSelect = true
                    }
                })
            })
        })
        this.setState({ sortGroup })
        if (status) this.props.changeSongSheetSort(sortGroup[0].sub)
    }
    // 添加 、删除
    onChangeSort = (pIndex, sIndex) => {
        let { sortGroup } = this.state

        // 增加
        if(pIndex > 0){
            sortGroup[0].sub.push(JSON.parse(JSON.stringify(sortGroup[pIndex].sub[sIndex])))
            sortGroup[pIndex].sub[sIndex].isSelect = true
        }else{ // 删除
            let curItem = sortGroup[0].sub.splice(sIndex, 1)
            sortGroup.forEach((item, index) =>{
                if(index > 0){
                    item.sub.forEach(item2 =>{
                        if(item2 == curItem) item2.isSelect = false
                    })
                }
            })
        }

        this.setState({ sortGroup })
    }
    render() {
        let { sortGroup } = this.state
        return (
            <div className='songSheetSort'>
                <ul className='sort-ul'>
                    {
                        sortGroup.map((item, index) =>
                            <li key={index} className='sort-li'>
                                <div className='header dbc'>
                                    <span className='title'>{item.title}</span>
                                    {index == 0 && <span className='btn' onClick={this.onEdit.bind(this, item.editBtn)}>{item.editBtn ? '关闭' : '编辑'}</span>}
                                </div>
                                <ul className='sub-ul da'>
                                    {
                                        item.sub.map((item2, index2) =>
                                            <li
                                                key={index2}
                                                style={item2.isSelect && index > 0? {opacity: 0.4} : {}}
                                                className='sub-li dcc to-line'
                                                onClick={sortGroup[0].editBtn && !item2.isSelect? this.onChangeSort.bind(this, index, index2) : () => { console.log(item2.isSelect) }}>
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