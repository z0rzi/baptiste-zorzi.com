import React, { Component } from 'react';

import DesktopNav from './components/DesktopNav/DesktopNav';
import MobileNav from './components/MobileNav/MobileNav';

const PARTS = [
    { title: 'Accueil', link: 'intro' },
    { title: 'Diplomes', link: 'qualifications' },
];

class Navbar extends Component<{ [prop: string]: unknown }, { opened: boolean }> {

    constructor(props: { [prop: string]: unknown }) {
        super(props);

        this.state = {
            opened: false
        };
    }

    render(): JSX.Element {
        return (
            <>
                <div className="hidden lg:block"><DesktopNav sections={PARTS}/></div>
                <div className="block  lg:hidden"><MobileNav sections={PARTS} /></div>
            </>
        );
    }
}

export default Navbar;
