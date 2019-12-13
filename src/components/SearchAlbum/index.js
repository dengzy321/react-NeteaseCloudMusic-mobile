import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'
import Loading from '@/components/Loading'

class SearchAlbum extends React.Component {
    componentWillReceiveProps(nextProps){
        nextProps.data.forEach(item =>{
            let year, month, day; 
            const date = new Date(item.publishTime)
            year = date.getFullYear()
            month = date.getMonth() + 1;
            day = date.getDate()
            item.date = `${year}.${month}.${day}`
        })
    }
    render() {
        const { data } = this.props
        if(data.length == 0) return <Loading/>
        return (
            <div className='searchAlbum'>
                <ul className='album-ul'>
                    {
                        data.map((item, index) =>
                            <li key={index} className='album-li'>
                                <Link to='#' className='da'>
                                    <img className='avatar' src={item.picUrl} />
                                    <div className='info'>
                                        <p className='name to-line'>{item.name} {item.alias[0] ? `(${item.alias[0]})` : ''}</p>
                                        {
                                            item.containedSong ?
                                                <p className='containedSong da'>
                                                    <span>Beyond 包含单曲：</span>
                                                    <span className='songName'>{item.containedSong}</span>
                                                </p> :
                                                <p className='artist da'>
                                                    <span className='artistName'>{item.artist.name}</span>
                                                    <span className='publishTime'>{item.date}</span>
                                                </p>
                                    }

                                    </div>
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
)(SearchAlbum)