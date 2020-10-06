import React, { Component } from 'react';
import Line from '@shared/Line/Line';
import { Color } from '@app/Core';

class Title extends Component<{children: string, color: Color}, { [state: string]: unknown }> {

    render(): JSX.Element {

        return (
            <div className="relative">
                <Line color={this.props.color} bent={true} align='middle' />
                <div className='inline-block align-middle text-title'>{this.props.children}</div>
            </div>
        );
    }
}

export default Title;
