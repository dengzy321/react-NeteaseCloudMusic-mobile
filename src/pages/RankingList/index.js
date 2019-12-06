import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'

class RankingList extends React.Component {
    componentWillMount(){
        this.iniRankingList()
    }
    iniRankingList = () =>{
        http.getAllRankingList({ idx: 0 }).then(res =>{
            
        })
    }
    render(){
        return(
            <div className='rankingList'>
                
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(RankingList)