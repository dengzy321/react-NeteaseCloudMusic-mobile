import React, { useState, useEffect  } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'


function MyCom_1 (props){
    const [ count, setCount ] = useState(0)
    function handleClick(){
        setCount(count + 1)
    }
    useEffect(() =>{
        console.log(count)
    })
    return(
        <div>
            <button onClick={handleClick}>点击</button>
            <h2>{count}</h2>
        </div>
    )
}


class MyCom_2 extends React.Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

class Test extends React.Component {
    state = {
        
    }
    componentDidMount() {
        
    }
    render(){
        return(
            <div>
               <MyCom_1/>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Test)