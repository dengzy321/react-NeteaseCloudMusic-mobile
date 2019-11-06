import React from 'react';
import './index.css'

class Carousel extends React.Component {
    state = {
        data: [],
        innerWidth: 0,
        offsetX: 0,
        startX: 0,
        startY: 0,
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
        this.tabBoxRef = React.createRef()
        this.setState({
            tabWidth: this.refs.tabList.clientWidth
        })
    }
    componentWillReceiveProps() {
        this.setState({
            data: this.props.data
        })
    }
    onTouchStart = (event) => {
        event.persist()
        this.setState({
            startX: event.changedTouches[0].pageX,
            startY: event.changedTouches[0].pageY,
            openAnimation: false
        })
    }
    onTouchMove = (event) => {
        event.persist()
        const { startX, startY, previousOffset, innerWidth } = this.state
        if (event.changedTouches[0].pageY != startY && Math.abs(event.changedTouches[0].pageX - startX) < innerWidth / 18 ) return
        this.setState({
            offsetX: event.changedTouches[0].pageX - startX + previousOffset
        })
    }
    onTouchEnd = (event) => {
        event.persist()
        const { startX, offsetX, innerWidth, data, tabWidth, lineOffset } = this.state
        // 改变后的回调函数
        const { onChange = null } = this.props

        if (Math.abs(offsetX) <= innerWidth && event.changedTouches[0].pageX - startX > 0) {
            this.setState({
                offsetX: 0,
                previousOffset: 0,
                currentIndex: 0,
                openAnimation: true,
                lineOffset: 15
            })
            if (onChange) this.props.onChange(0)
        }
        else if (Math.abs(offsetX) >= innerWidth * (data.length - 1) && event.changedTouches[0].pageX - startX < 0) {
            this.setState(state =>({
                offsetX: state.previousOffset,
                previousOffset: state.previousOffset,
                currentIndex: Math.abs(state.previousOffset) / innerWidth,
                openAnimation: true
            }))
            if (onChange) this.props.onChange(Math.abs(this.state.previousOffset) / innerWidth)
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
            if (onChange) this.props.onChange(Math.abs(curOffset) / innerWidth)
        }
        else {
            this.setState(state => ({
                offsetX: state.previousOffset,
                previousOffset: state.previousOffset,
                currentIndex: Math.abs(state.previousOffset) / innerWidth,
                openAnimation: true
            }))
            if (onChange) this.props.onChange(Math.abs(this.state.previousOffset) / innerWidth)
        }


        // console.log('scrollLeft===',this.tabBoxRef.current.scrollLeft)
        // 设置tab滚动条的位置
        if (lineOffset > innerWidth / 2 && event.changedTouches[0].pageX - startX > 0) {
            var timer1 = setInterval(() => {
                this.tabBoxRef.current.scrollLeft += 1
            }, 5)
            setTimeout(() => {
                clearInterval(timer1)
            }, 400)
        }
        else {
            var timer2 = setInterval(() => {
                this.tabBoxRef.current.scrollLeft -= 1
            }, 5)
            setTimeout(() => {
                clearInterval(timer2)
            }, 400)
        }
    }
    onClick = (index) => {
        const { currentIndex, lineOffset, innerWidth } = this.state
        this.setState(state => ({
            offsetX: index > currentIndex ? state.offsetX + innerWidth * (index - currentIndex) : (index == currentIndex ? state.offsetX : state.offsetX - innerWidth * (currentIndex - index))
        }))
        this.props.onClick(index)
    }
    render() {
        const { innerWidth, offsetX, openAnimation, lineOffset } = this.state
        const { data } = this.props
        return (
            <div className='carousel'>
                {/* nav */}
                <div className='tab-box' ref={this.tabBoxRef}>
                    <div className='tab-list' ref='tabList'>
                        {
                            data.map((item, index) => <span className='tab' onClick={this.onClick.bind(this, index)} ref={`tab_${index}`} key={index}>{item.title}</span>)
                        }
                        <div className='tab-line' style={{ transform: `translateX(${lineOffset}px)` }}></div>
                    </div>
                </div>

                {/* list */}
                <div className='c-inner' onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} >
                    <ul style={{ width: innerWidth * data.length + 'px', transform: `translateX(${offsetX}px)`, transition: `all ${openAnimation? '0.2s': ''} ease`}} className='c-ul'>
                        {
                            data.map((item, index) => <li className={`bg${index}`} style={{ width: innerWidth + 'px' }} key={index}>{<item.Component data={item.videoData} />}</li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Carousel;