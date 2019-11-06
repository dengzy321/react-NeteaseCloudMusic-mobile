import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { http } from '@/api/http'
import * as actions from '@/store/actions';
import './index.css';
import { NavLink } from 'react-router-dom'
import SongsToolModal from '../SongsToolModal'
import Iconpath from '@/utils/iconpath'
import Radio from '../Radio'

class CreateSong extends React.Component {
    state = {
        Item: [
            { title: '创建的歌单', count: 1, hasAdd: true, showList: false },
            { title: '收藏的歌单', count: 1, hasAdd: false, showList: false }
        ],
        showSongsToolModal: false, //显示歌单操作modal
        SongsToolModalData: [], //modal数据
        radioSelected: false, // radio选择状态
        inputVal: '', // 创建歌单输入款
        showCreateModal: false, // 显示创建歌单modal
    }
    // 显示歌单列表
    showSongsBox(index) {
        const { Item } = this.state
        Item[index].showList = !Item[index].showList
        this.setState({ Item })
    }
    // 点击显示/关闭songs操作工具栏
    onShowSongsTool = (index) =>{
        this.setState(state =>({
            showSongsToolModal: !state.showSongsToolModal
        }))

        if(index == 0){
            this.setState({
                SongsToolModalData: [
                    { icon: Iconpath.create, name: '创建新歌单' },
                    { icon: Iconpath.inventory, name: '歌单管理' },
                    { icon: Iconpath.screenshot, name: '截图导入新歌单' },
                    { icon: Iconpath.recover, name: '恢复歌单' }
                ]
            })
        }else if(index = 1) {
            this.setState({
                SongsToolModalData: [
                    { icon: Iconpath.create, name: '创建新歌单' }
                ]
            })
        }
    }
    // input输入
    onChange = (event) =>{
        if(event.target.value.length <=40) {
            this.setState({ inputVal: event.target.value })
        }
    }
    // 渲染tool头部
    SongsToolModalHeader(){
        return <span className='songsToolModalHeader'>创建歌单</span>
    }
    SongsBoxList = () => {
        return (
            <li className='da'>
                <div className='da flex'>
                    <img className='pic' src={require('../../static/5.jpg')} />
                    <p className='ddc-h'>
                        <span className='title'>我喜欢的音乐</span>
                        <span className='count'>66首</span>
                    </p>
                </div>
                <img className='icon_more' src={Iconpath.more_gray} />
            </li>
        )
    }
    // 新建歌单Modal
    CreateSongsModal = (params) =>{
        const { radioSelected, inputVal, showCreateModal } = this.state;
        return (
            <div className='createSongsModal dd-vh'>
                <div className={`cm-inner ${showCreateModal? 'showAni':'hideAni'}`}>
                    <div className='title'>新建歌单</div>
                    <div className='contnet'>
                        <div className='input'><input value={inputVal} placeholder='请输入歌单标题' onChange={this.onChange}/></div>
                        <div className='da settings'>
                            <span className='da' onClick={() => this.setState(state => ({radioSelected: !state.radioSelected}))}>
                                <Radio selected={radioSelected}/>
                                <span className='name'>设置为隐私歌单</span>
                            </span>
                            <span className='count flex da-e'>{inputVal.length}/40</span>
                        </div>
                    </div>
                    <div className='footer da-e'>
                        <span onClick={this.openCSModal}>取消</span>
                        <span style={inputVal.length > 0? {}:{opacity:  0.5}} onClick={this.openCSModal.bind(this,'submit')}>提交</span>
                    </div>
                </div>
            </div>
        )
    }
    // 打开、关闭 新建歌单Modal
    openCSModal = (params) =>{
        if(params == 'submit' && this.state.inputVal.length == 0) return
        this.setState(state => ({
            showCreateModal: !state.showCreateModal
        }))
    }
    render() {
        const { Item, showSongsToolModal, SongsToolModalData, showCreateModal } = this.state
        return (
            <div className='createSong'>
                {
                    Item.map((item, index) =>
                        <div key={index} className='create-item'>
                            <div className='da ci-header'>
                                <div className='flex da' onClick={this.showSongsBox.bind(this, index)}>
                                    <img className={`arrow_rigth ${item.showList ? 'arrow_active' : ''}`} src={Iconpath.arrow_rigth} />
                                    <span className='listName'>{item.title}</span>
                                    <span className='songsCount'>({item.count})</span>
                                </div>
                                {item.hasAdd && <img className='icon_add' src={Iconpath.add} onClick={this.openCSModal} />}
                                <img className='icon_more' src={Iconpath.more} onClick={this.onShowSongsTool.bind(this, index)} />
                            </div>
                            {
                                item.showList &&
                                <div className='songsBox-List'>
                                    <ul>
                                        {this.SongsBoxList()}
                                    </ul>
                                </div>
                            }
                        </div>
                    )
                }
                {showCreateModal && this.CreateSongsModal()}
                {showSongsToolModal && <SongsToolModal onShowSongsTool={this.onShowSongsTool} data={SongsToolModalData} Header={this.SongsToolModalHeader()}/>}
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(CreateSong)