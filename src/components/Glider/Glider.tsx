import React, { Component } from 'react';
import { Debouncer } from '@app/Core';

type Pane<T> = {
    image: string,
    payload: T,
    image_active?: string,
    text?: string
};

type GliderProps<T> = {
    elems: Pane<T>[],
    shadows: boolean,
    onChange: ((payload: T) => void),
    width?: number,
    spacing?: number
}

class Glider<T> extends Component<GliderProps<T>, { activeItem: number }> {

    containerRef: HTMLDivElement | null = null;

    constructor(props: GliderProps<T>) {
        super(props);

        this.state = {
            activeItem: -1
        };
    }

    private scrollPos2itemPos(scroll: number) {
        if (!this.containerRef) return 0;

        const container = this.containerRef.firstElementChild as HTMLDivElement;

        const width = this.containerRef.offsetWidth;
        const childWidth = container.offsetWidth;
        const scrollPercent = scroll / (childWidth - width);

        return childWidth * scrollPercent;
    }

    private isScrollable(): boolean {
        if (!this.containerRef) return false;
        const child = this.containerRef.firstChild as HTMLDivElement;
        return this.containerRef.offsetWidth < child.offsetWidth;
    }

    onScroll(): void {
        const target = this.containerRef as HTMLDivElement;
        const child = target.firstChild as HTMLDivElement;

        const scroll = target.scrollLeft;
        if (scroll === 0) {
            this.setState({ activeItem: 0 });
            this.props.onChange(this.props.elems[0].payload);
            return;
        }
        const idelOffset = this.scrollPos2itemPos(scroll) + target.offsetLeft;

        let idx = 0;
        for (const item of Array.from(child.children) as HTMLDivElement[]) {
            if (
                (
                    item.offsetLeft < idelOffset
                    && (item.offsetLeft + item.offsetWidth) > idelOffset
                )
                || idx === child.children.length - 1
            ) {
                this.setState({ activeItem: idx });
                this.props.onChange(this.props.elems[idx].payload);
                break;
            }
            idx++;
        }
    }

    componentDidMount(): void {
        const scrollDeb = new Debouncer(this.onScroll.bind(this), 100);
        this.containerRef?.addEventListener('scroll', () => {
            scrollDeb.call();
        });
    }

    onItemClick(idx: number): void {
        if (!this.containerRef) return;

        const scroll = this.containerRef.scrollLeft;

        if (scroll === 0 && idx === 0) {
            this.setState({activeItem: 0});
            this.props.onChange(this.props.elems[0].payload);
            return;
        }

        if (this.isScrollable()) {
            const totalItemAmount = this.props.elems.length;
            const width = this.containerRef.offsetWidth;
            const childWidth = (this.containerRef.firstChild as HTMLDivElement).offsetWidth;

            this.containerRef?.scrollTo({
                left: (childWidth - width) * idx / (totalItemAmount - 1),
                behavior: 'smooth'
            });
        } else {
            this.setState({ activeItem: idx });
            this.props.onChange(this.props.elems[idx].payload);
        }

    }

    render(): JSX.Element {
        const width = this.props.width || 150;
        const padding = (this.props.spacing || 50) / 2;
        return (
            <div
                className="w-full"
                ref={elem => this.containerRef = elem}
                style={{ overflow: 'auto' }}
            >
                <div
                    className="flex"
                    style={{ width: 'fit-content', margin: 'auto' }}
                >
                    {
                        this.props.elems.map(({ image, image_active, text }, idx) => {
                            return (
                                <div
                                    onClick={() => this.onItemClick(idx)}
                                    key={idx}
                                    style={{
                                        padding: `0 ${ padding }px`,
                                    }}
                                    className="flex-1 inline-block"
                                >
                                    <img
                                        alt=''
                                        style={{
                                            minWidth: width,
                                            transform: this.state.activeItem === idx ? 'translateY(10px)' : '',
                                            transitionDuration: '.3s',
                                        }}
                                        src={this.state.activeItem === idx ? image_active || image : image}
                                        width={`${ width }px`}
                                    />
                                    <div style={{
                                        width: width * .8,
                                        height: width / 5,
                                        margin: `20px ${ width * .1 }px`,
                                        transitionDuration: '.3s',
                                        borderRadius: '100%',
                                        backgroundColor: this.state.activeItem === idx ? '#2223' : '#2222',
                                        filter: `blur(${ (width * .8) / (this.state.activeItem === idx ? 15 : 10) }px)`,
                                    }} />
                                    <span>{text}</span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Glider;
