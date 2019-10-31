import React from 'react';
import './index.css';
import Iconpath from '../../utils/iconpath'

class Radio extends React.Component {
    render() {
        const {
            size = 1.2,
            color = '#ccc',
            selected = false,
            icon = Iconpath.selected
        } = this.props;
        return (
            <div 
            className='cusRadio dd-vh' 
            style={{ 
                borderColor: `${color}`, 
                width: `${size}rem`, 
                height: `${size}rem`, 
                backgroundColor: `${selected? color:''}` 
            }}>
                {selected && <img className='icon' src={icon} />}
            </div>
        )
    }
}

export default Radio;