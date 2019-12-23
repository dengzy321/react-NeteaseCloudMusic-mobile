import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import Radio from '@/components/Radio'

class DownloadManager extends React.Component {
    render() {
        if (true) return <div className='empty'>暂无下载记录...</div>
        return (
            <div className='downloadManager'>

            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(DownloadManager)