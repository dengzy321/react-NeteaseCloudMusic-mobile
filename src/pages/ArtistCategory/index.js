import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Carousel } from 'antd-mobile';
import ArtistList from '@/components/ArtistList'
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'


class ArtistCategory extends React.Component {
    state = {
        artistList: [],
        curActive: 0
    }
    componentDidMount() {
        document.title = '歌手分类'
        this.initArtistList()
    }
    initArtistList(id){
        http.getArtistList({
            cat: id? id : '',
            limit: 50
        }).then(res =>{
            this.setState({ artistList: res.artists })
        })
    }
    onSelectArtist = (id, index) =>{
        this.setState({ curActive: index })
        this.initArtistList(id)
    }
    render() {
        const { artistList, curActive } = this.state
        const artistCategoryList = [
            { name: '入驻歌手', categoryId: '5001' },
            { name: '华语男歌手', categoryId: '1001' },
            { name: '华语女歌手', categoryId: '1002' },
            { name: '华语组合/乐队', categoryId: '1003' },
            { name: '欧美男歌手', categoryId: '2001' },
            { name: '欧美女歌手', categoryId: '2002' },
            { name: '欧美组合/乐队', categoryId: '2003' },
            { name: '日本男歌手', categoryId: '6001' },
            { name: '日本女歌手', categoryId: '6002' },
            { name: '日本组合/乐队', categoryId: '6003' },
            { name: '韩国男歌手', categoryId: '7001' },
            { name: '韩国女歌手', categoryId: '7002' },
            { name: '韩国组合/乐队', categoryId: '7003' },
            { name: '其他男歌手', categoryId: '4001' },
            { name: '其他女歌手', categoryId: '4002' },
            { name: '其他组合/乐队', categoryId: '4003' }
        ]
        return (
            <div className='artistCategory'>
               <div className='category-ul da'>
                   {
                        artistCategoryList.map((item, index) =>
                            <span 
                            className={curActive == index? 'active' : ''} 
                            key={index} 
                            onClick={this.onSelectArtist.bind(this, item.categoryId, index)}>{item.name}</span>
                        )
                   }
               </div>
               <div className='artist-ul'>
                   <h3 className='title'>热门歌手</h3>
                   <ArtistList data={artistList}/>
               </div>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(ArtistCategory)