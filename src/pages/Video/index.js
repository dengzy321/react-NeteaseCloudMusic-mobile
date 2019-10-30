import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions';
import './index.css';

class Video extends React.Component {
    state = {
        
    }
    componentWillMount() {
        
    }
    render() {
        return (
            <div>1212</div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Video)