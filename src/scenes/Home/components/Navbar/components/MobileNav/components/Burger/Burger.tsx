import React, { Component } from 'react';

class Burger extends Component<{ compressed: boolean, hidden: boolean, onClick: ()=>unknown }, { [prop: string]: unknown }> {
    render(): JSX.Element {
        return (
            <div
                onMouseOver={this.props.onClick}
                className={`burger${this.props.compressed?' compressed':''}${this.props.hidden?' gone':''}`}
            >
                <span /><span /><span />
            </div>
        );
    }
}

export default Burger;
