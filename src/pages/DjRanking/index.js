import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Carousel } from 'antd-mobile';
import Loading from '@/components/Loading'
import { http } from '@/api/http'
import Iconpath from '@/utils/iconpath'


class DjRanking extends React.Component {
    state = {
        
    }
    componentDidMount() {
       
    }
    render() {
        // const { bannerArr } = this.state
        return (
            <div className='djRanking'>
                
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(DjRanking)