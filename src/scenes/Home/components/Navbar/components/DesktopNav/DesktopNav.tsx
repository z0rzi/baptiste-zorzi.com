import React, { Component } from 'react';
import { Link } from 'react-scroll';
import { WindowWatcher } from '@app/Core';

type Coords = {
    x: number;
    y: number;
}

const SCROLL_LIMIT = 100;

class DesktopNav extends Component<
    { sections: { title: string, link: string }[] },
    { vertical: boolean, offsetsCalculated: { vertical: boolean, horizontal: boolean } }
> {

    listRef: HTMLUListElement | null = null;
    private _offsets: { horizontal: Coords[], vertical: Coords[] } = { horizontal: [], vertical: [] };
    private _windowListenersIds: number[] = []

    constructor(props: { sections: { title: string, link: string }[] }) {
        super(props);

        this.state = {
            vertical: false,
            offsetsCalculated: {
                vertical: false,
                horizontal: false
            }
        };
    }

    get position(): 'vertical' | 'horizontal' {
        return this.state.vertical ? 'vertical' : 'horizontal';
    }

    updateOffsets(): void {
        const position = this.position;

        this._offsets[position] = [];

        if (this.listRef?.children) {
            const totalWidth = this.listRef.offsetWidth;
            [].slice.call(this.listRef?.children).forEach((elem: HTMLElement) => {
                this._offsets[position].push({
                    x: totalWidth - (elem.offsetLeft + elem.offsetWidth),
                    y: elem.offsetTop
                });
            });

            if (this.offsets.some(({ x, y }) => x !== this.offsets[0].x || y !== this.offsets[0].y)) {
                // The component is visible
                this.setState({
                    offsetsCalculated: Object.assign(this.state.offsetsCalculated, {
                        [this.position]: true
                    })
                });
            }
        }
    }

    get offsets(): Coords[] {
        const position = this.state.vertical ? 'vertical' : 'horizontal';
        if (this._offsets[position].length)
            return this._offsets[position];

        return Array(this.listRef?.children.length).fill({ x: 0, y: 0 });
    }

    componentDidMount(): void {
        setTimeout(this.updateOffsets.bind(this), 0);

        const sw = WindowWatcher.instance;

        let id = 0;

        id = sw.listenTo('scroll', 'below', SCROLL_LIMIT, () => {
            this.setState({
                vertical: true
            });
        });
        this._windowListenersIds.push(id);
        id = sw.listenTo('scroll', 'above', SCROLL_LIMIT, () => {
            this.setState({
                vertical: false
            });
        });
        this._windowListenersIds.push(id);

        id = sw.listenTo('resize', 'above', -1, () => {
            if (this.state.offsetsCalculated.vertical
                && this.state.offsetsCalculated.horizontal
            )
                sw.stopListening(id);

            if (!this.state.offsetsCalculated[this.position])
                setTimeout(this.updateOffsets.bind(this), 0);
        });
        this._windowListenersIds.push(id);
    }

    componentWillUnmount(): void {
        this._windowListenersIds.forEach(id => {
            WindowWatcher.instance.stopListening(id);
        });
    }

    render(): JSX.Element {
        if (!this.state.offsetsCalculated[this.position]
            || !this._offsets[this.position].length)
            setTimeout(this.updateOffsets.bind(this), 0);

        const offsets = this.offsets;
        const styledParts = this.props.sections.map(({ title, link }, idx) => {
            let offset;
            if (idx in offsets) {
                offset = offsets[idx];
            } else {
                offset = { x: 0, y: 0 };
            }
            return {
                title,
                link,
                style: {
                    opacity: this.state.offsetsCalculated[this.position] ? 1 : 0,
                    right: offset.x,
                    top: offset.y,
                    transition: 'opacity .5s .5s, top .5s, right .5s'
                }
            };
        });

        return (
            <>
                <div className="fixed top-3 right-5">
                    <ul className="relative">
                        {
                            styledParts.map(({ title, link, style }) =>
                                <li
                                    key={title}
                                    className={`absolute${ this.state.offsetsCalculated ? '' : ' opacity-0' }`}
                                    style={style}
                                >
                                    <Link
                                        className="bold-if-active cursor-pointer"
                                        activeClass="active"
                                        to={link}
                                        spy={true}
                                        smooth={true}
                                        duration={500}
                                    >{title}</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="absolute invisible">
                    <ul ref={element => this.listRef = element}>
                        {
                            this.props.sections.map(part =>
                                <li
                                    key={part.title}
                                    className={this.state.vertical ? 'text-right' : 'pl-3 inline'}
                                >
                                    <span>{part.title}</span>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </>
        );
    }
}

export default DesktopNav;
