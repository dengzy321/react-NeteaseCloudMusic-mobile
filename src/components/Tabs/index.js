import React from 'react';
import './index.css'

class Carousel extends React.Component {
    state = {
        // data: [
        //     { name: '推荐', component: '' }, 
        //     { name: '头条头条', component: '' },
        //     { name: '体育', component: '' },
        //     { name: '娱乐娱乐', component: '' },
        //     { name: '科技', component: '' },
        //     { name: '生活', component: '' },
        //     { name: '段子', component: '' },
        //     { name: '推荐', component: '' },
        //     { name: '头条', component: '' },
        //     { name: '体育', component: '' },
        //     { name: '娱乐', component: '' },
        //     { name: '科技', component: '' },
        //     { name: '生活', component: '' },
        //     { name: '段子', component: '' }
        // ],
        data: [],
        innerWidth: 0,
        offsetX: 0,
        startX: 0,
        previousOffset: 0,
        openAnimation: false,
        currentIndex: 0,
        lineOffset: 15,
        tabWidth: 0
    }
    componentWillMount() {
        this.setState({
            innerWidth: window.innerWidth,
            data: this.props.data
        })
    }
    componentDidMount() {
        this.setState({
            tabWidth: this.refs.tabList.clientWidth
        })
    }
    onTouchStart = (event) => {
        event.persist()
        this.setState({
            startX: event.changedTouches[0].pageX,
            openAnimation: false
        })
    }
    onTouchMove = (event) => {
        event.persist()
        const { startX, previousOffset } = this.state
        this.setState({
            offsetX: event.changedTouches[0].pageX - startX + previousOffset
        })
    }
    onTouchEnd = (event) => {
        event.persist()
        const { startX, offsetX, innerWidth, data, tabWidth, currentIndex } = this.state
        if (Math.abs(offsetX) <= innerWidth && event.changedTouches[0].pageX - startX > 0) {
            this.setState({
                offsetX: 0,
                previousOffset: 0,
                currentIndex: 0,
                openAnimation: true,
                lineOffset: 15
            })
        }
        else if (Math.abs(offsetX) >= innerWidth * (data.length - 1) && event.changedTouches[0].pageX - startX < 0) {
            this.setState(state =>({
                offsetX: state.previousOffset,
                previousOffset: state.previousOffset,
                currentIndex: Math.abs(state.previousOffset) / innerWidth,
                openAnimation: true
            }))
        }
        else if (Math.abs(event.changedTouches[0].pageX - startX) >= innerWidth / 3) {
            let curOffset = event.changedTouches[0].pageX - startX > 0 ? this.state.previousOffset + innerWidth : this.state.previousOffset - innerWidth
            this.setState(state => ({
                offsetX: curOffset,
                previousOffset: curOffset,
                currentIndex: Math.abs(curOffset) / innerWidth,
                openAnimation: true,
                lineOffset: event.changedTouches[0].pageX - startX > 0 ? state.lineOffset - tabWidth / data.length : state.lineOffset + tabWidth / data.length
            }))
        }
        else {
            this.setState(state => ({
                offsetX: state.previousOffset,
                previousOffset: state.previousOffset,
                currentIndex: Math.abs(state.previousOffset) / innerWidth,
                openAnimation: true
            }))
        }

        if (this.refs[`tab_${this.state.currentIndex}`].offsetLeft > innerWidth / 2) {
            // console.log(this.refs[`tab_${this.state.currentIndex}`])
        }
        
        const { onChange = null } = this.props
        if (onChange) this.props.onChange(this.state.currentIndex)
    }

    render() {
        const { innerWidth, offsetX, openAnimation, lineOffset } = this.state
        const { data = [], onClick = () => {} } = this.props
        return (
            <div className='carousel'>
                {/* nav */}
                <div className='tab-box' ref='tabBox'>
                    <div className='tab-list' ref='tabList'>
                        {
                            data.map((item, index) => {
                                return <span className='tab' onClick={onClick.bind(this, index)} ref={`tab_${index}`} key={index}>{item.title}</span>
                            })
                        }
                        <div className='tab-line' style={{ transform: `translateX(${lineOffset}px)` }}></div>
                    </div>
                </div>

                {/* list */}
                <div className='c-inner' onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} >
                    <ul style={{ width: innerWidth * data.length + 'px', transform: `translateX(${offsetX}px)`, transition: `all ${openAnimation? '0.2s': ''} ease`}} className='c-ul'>
                        {
                            data.map((item, index) => {
                                return <li className={`bg${index}`} style={{ width: innerWidth + 'px' }} key={index}>{<item.Component data={item.videoData} />}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Carousel;