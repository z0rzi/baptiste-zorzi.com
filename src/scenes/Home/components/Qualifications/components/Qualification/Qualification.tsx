import React, { Component } from 'react';
import Line from '@shared/Line/Line';
import { Color } from '@app/Core';

type QualificationData = {
    color: Color,
    title: string,
    school: string,
    place: string,
}

class Qualification extends Component<QualificationData, { [state: string]: unknown }> {

    render(): JSX.Element {
        const rx = /\[.*?\]/g;
        const normal = this.props.title.split(rx);
        const emph = this.props.title.match(rx);
        const title: JSX.Element[] = [];

        normal.forEach((txt: string, idx: number) => {
            title.push(<span key={idx}>{txt}</span>);
            if (emph !== null && idx in emph) {
                title.push(<span key={'emph-'+idx} className={`text-${this.props.color.value} font-bold`}>{emph[idx].replace(/[[\]]/g, '')}</span>);
            }
        });

        return (
            <div className="my-10">
                <div className="text-normal">
                    {title}
                </div>
                <div className='flex flex-col lg:flex-row'>
                    <div className='relative min-w-10 w-2/12 lg:w-auto lg:min-w-auto my-2'>
                        <Line color={this.props.color} align='start' size={1} bent={false} />
                    </div>
                    <div className='text-gray text-small pl-1'>
                        {this.props.school} <br/>
                        {this.props.place}
                    </div>
                </div>
            </div>
        );
    }
}

export default Qualification;
