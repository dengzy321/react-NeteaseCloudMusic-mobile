import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { http } from '../../api/http'
import * as actions from '../../store/actions';
import './index.css';
import { NavLink } from 'react-router-dom'
import SongsToolModal from '../SongsToolModal'

class CreateSong extends React.Component {
    state = {
        Item: [
            { title: '创建的歌单', count: 1, hasAdd: true, showList: false },
            { title: '收藏的歌单', count: 1, hasAdd: false, showList: false }
        ],
        showSongsToolModal: false
    }
    showSongsBox(index) {
        const { Item } = this.state
        Item[index].showList = !Item[index].showList
        this.setState({ Item })
    }
    songsBoxList = () => {
        return (
            <li className='da'>
                <div className='da flex'>
                    <img className='pic' src={require('../../static/5.jpg')} />
                    <p className='ddc-h'>
                        <span className='title'>我喜欢的音乐</span>
                        <span className='count'>66首</span>
                    </p>
                </div>
                <img className='icon_more' src={require('../../assets/more_gray.png')} />
            </li>
        )
    }
    render() {
        const { Item } = this.state
        return (
            <div className='createSong'>
                {
                    Item.map((item, index) => {
                        return (
                            <div key={index} className='create-item'>
                                <div className='da ci-header'>
                                    <div className='flex da' onClick={this.showSongsBox.bind(this, index)}>
                                        <img className={`arrow_rigth ${item.showList ? 'arrow_active' : ''}`} src={require('../../assets/arrow_rigth.png')} />
                                        <span className='listName'>{item.title}</span>
                                        <span className='songsCount'>({item.count})</span>
                                    </div>
                                    {item.hasAdd && <img className='icon_add' src={require('../../assets/add.png')} />}
                                    <img className='icon_more' src={require('../../assets/more.png')} onClick={() => { this.setState({ showSongsToolModal: true }); console.log(this.state.showSongsToolModal) }}/>
                                </div>
                                {
                                    item.showList &&
                                    <div className='songsBox-List'>
                                        <ul>
                                            { this.songsBoxList() }
                                        </ul>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                <SongsToolModal showStatus={this.state.showSongsToolModal}/>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(CreateSong)