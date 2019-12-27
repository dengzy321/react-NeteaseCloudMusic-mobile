import React, { useState, useEffect  } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@/store/actions';
import './index.css';
import { Link } from 'react-router-dom'
import Iconpath from '@/utils/iconpath'
import { http } from '@/api/http'


class Test extends React.Component {
    state = {
        
    }
    componentDidMount() {
        console.log(this)
        this.Canvas()
    }

    // 绘图
    Canvas = () =>{
        let canvas = document.getElementById('myCanvas')
        let ctx = canvas.getContext('2d')
        let image = new Image()
        image.src = require('@/assets/a.png')
        image.onload = () =>{
            ctx.drawImage(image, 0, 0, 250, 300)
            const pixels = ctx.getImageData(0, 0, 250, 300)
            console.log(pixels)
            let r = 0, g = 0, b = 0, a = 0;
            for(let i = 0; i< pixels.data.length; i+=4){
                r += pixels.data[i]
                g += pixels.data[i+1]
                b += pixels.data[i+2]
                a += pixels.data[i+3]
            }

            r = Math.round(r / pixels.data.length)
            g = Math.round(g / pixels.data.length)
            b = Math.round(b / pixels.data.length)
            a = Math.round(a / pixels.data.length)

            console.log('rgba:', r+','+g+','+b+','+a)
        }
    }
    download = () =>{
        const canvasElement = document.getElementById('myCanvas');

        const MIME_TYPE = 'image/png';

        const imgURL = canvasElement.toDataURL(MIME_TYPE);

        const dlLink = document.createElement('a');
        dlLink.download = 'dengbbb';
        dlLink.href = imgURL;
        // dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    }
    render(){
        return(
            <div className='test'>
                <canvas id='myCanvas' width="250" height="300" className='myCanvas'></canvas>
                <button onClick={this.download}>下载图片</button>
            </div>
        )
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actions, dispatch)
)(Test)