import React, { Component } from 'react';
import { Link } from 'react-scroll';
import { WindowWatcher } from '@app/Core';
import Burger from './components/Burger/Burger';

class MobileNav extends Component<{ sections: { title: string, link: string }[] }, { active: boolean, compressed: boolean }> {

    private watcherIds: number[] = [];

    constructor(props: { sections: { title: string, link: string }[] }) {
        super(props);

        this.state = {
            active: false,
            compressed: false
        };
    }

    componentDidMount(): void {
        this.watcherIds.push(
            WindowWatcher.instance.listenTo('scroll', 'below', 100, () => {
                this.setState({compressed: true});
            }),
            WindowWatcher.instance.listenTo('scroll', 'above', 100, () => {
                this.setState({compressed: false});
            })
        );
    }

    componentWillUnmount(): void {
        this.watcherIds.forEach(id => {
            WindowWatcher.instance.stopListening(id);
        });
    }

    onBurgerClick(): void {
        this.setState({
            active: true
        });
    }

    onBackClick(): void {
        this.setState({
            active: false
        });
    }

    render(): JSX.Element {
        const pannelStyle = {
            top: this.state.active ? '0%' : '-100%',
            opacity: this.state.active ? 1 : 0,
            transitionDuration: '.5s',
        };
        const backStyle = {
            opacity: this.state.active ? .2 : 0,
            visibility: this.state.active ? 'visible' : 'hidden' as ('visible' | 'hidden'),
            transition: `opacity .5s .1s, visibility 0s ${ this.state.active ? '.1s' : '.5s' }`,
        };
        return (
            <div>
                <div className="fixed top-3 right-5">
                    <Burger
                        compressed={this.state.compressed}
                        hidden={this.state.active}
                        onClick={this.onBurgerClick.bind(this)}
                    />
                </div>
                <div
                    className="fixed inset-0 bg-black z-1" style={backStyle}
                    onClick={this.onBackClick.bind(this)}
                />
                <div className="fixed inset-x-0 bg-white text-center py-3 z-2" style={pannelStyle}>
                    <ul className="relative">
                        {
                            this.props.sections.map(({ title, link }) =>
                                <li key={title}>
                                    <Link
                                        className="bold-if-active"
                                        activeClass="active"
                                        to={link}
                                        spy={true}
                                        smooth={true}
                                        duration={500}
                                        onClick={(() => { this.setState({ active: false }); })}
                                    >{title}</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default MobileNav;
