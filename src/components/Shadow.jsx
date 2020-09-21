import React, {Component} from 'react';

class Shadow extends Component {

    constructor() {
        super()

        this.state = {}
    }

    render() {
        const shadowStyles = {
            display: 'block',
            height: '0',
            width: `80%`,
            paddingTop: '15%',
            borderRadius: '100%',
            background: '#22222215',
            filter: 'blur(10px)',
            left: '50%',
            transform: 'translateX(-50%)'
        }

        const imageStyles = {
            transform: 'rotate(10deg)'
        }


        return (
            <div className="relative">
                <img src={this.props.image} style={imageStyles} alt='' className='w-full mx-auto animate-laptop-float'/>
                <div className='absolute mx-auto animate-shadow-float' style={shadowStyles}></div>
            </div>
        );
    }
}

export default Shadow;
