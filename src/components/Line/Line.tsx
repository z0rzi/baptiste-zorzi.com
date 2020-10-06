import React, {Component} from 'react';
import { Color } from '@app/Core';

type LineData = {color: Color, bent?: boolean, size?: number, align: 'start'|'middle'|'end'};

class Line extends Component<LineData, {height: number, horizontal: boolean}> {

    divRef: HTMLDivElement|null = null;

    public static defaultProps = {
        size: .8,
    };

    updateSize(): void {
        if (this.divRef === null) return;

        let hor: boolean;
        let hei: number;
        if (this.divRef.nextSibling === null) {
            if (this.divRef.parentElement !== null) {
                hor = ((this.divRef.parentElement.clientWidth||0) > (this.divRef.parentElement.clientHeight||0));
                hei = this.divRef.parentElement[(hor ? 'clientWidth' : 'clientHeight')];
            } else {
                hor=false;
                hei=0;
            }
        } else {
            hor = false;
            if (this.divRef.parentElement !== null)
                hei = this.divRef.parentElement.clientHeight;
            else
                hei=0;
        }

        this.setState({
            horizontal: hor,
            height: hei * (this.props.size || 0)
        });
    }

    componentDidMount(): void {
        this.updateSize();
    }

    constructor(props: LineData) {
        super(props);

        this.state = {
            height: 0,
            horizontal: false
        };

        window.addEventListener('resize', this.updateSize.bind(this));
    }

    get width(): number {
        return this.props.bent === false ? this.stroke : this.height/4;
    }
    get height(): number {
        return this.state.height;
    }
    get stroke(): number {
        return 4;
    }

    render(): JSX.Element {
        const height = this.height;
        const width = this.width;

        let line: JSX.Element;

        if (this.state.horizontal) {
            line =
                <svg width={height} height={width} viewBox={`0 0 ${height} ${width}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d={`
                        M${this.stroke/2}
                        ${this.stroke/2}C${3*height/8}
                        ${width - this.stroke/2}
                        ${5*height/8}
                        ${width - this.stroke/2}
                        ${height - this.stroke/2}
                        ${this.stroke/2}
                    `}
                        stroke={this.props.color.hexa}
                        strokeWidth={this.stroke}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>;
        } else {
            line =
                <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d={`
                        M${width-this.stroke/2}
                        ${this.stroke/2}C${this.stroke/2}
                        ${3*height/8}
                        ${this.stroke/2}
                        ${5*height/8}
                        ${width - this.stroke/2}
                        ${height - this.stroke/2}
                    `}
                        stroke={this.props.color.hexa}
                        strokeWidth={this.stroke}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>;
        }

        const multiplier = {
            start: 0,
            middle: 50,
            end: 100
        }[this.props.align];

        const containerStyle = {
            transform: `translate${this.state.horizontal?'X':'Y'}(${multiplier}%)`,
            [this.state.horizontal?'left':'top']: - this.height*multiplier/100
        };

        return (
            <div className={`${this.state.horizontal?'block':'inline-block'} h-full`} ref={element => this.divRef=element}>
                <div className={this.state.horizontal?'block':'inline-block'} style={{[this.state.horizontal?'height':'width']: 5+width}} />
                <div
                    className={`absolute top-0 block align-middle ${this.state.horizontal?'w-full mx-auto':'h-full'}`}
                    style={containerStyle}
                >
                    {line}
                </div>
            </div>
        );
    }
}

export default Line;
