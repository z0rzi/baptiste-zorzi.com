import React from 'react';
import Intro from './components/Intro/Intro';
import Navbar from './components/Navbar/Navbar';
import Qualifications from './components/Qualifications/Qualifications';
import { Element as ScrollElem } from 'react-scroll';

function App(): JSX.Element {
    return (
        <div className={`
            bg-white
            min-h-full
            font-sans
            text-black
            pb-16 lg:pb-40
            p-8 md:p-12 lg:p-0
            lg:pl-24
        `}>
            <Navbar />
            <ScrollElem name="intro"><Intro /></ScrollElem>
            <div className="container mx-auto">
                <ScrollElem name="qualifications"><Qualifications /></ScrollElem>
            </div>
        </div>
    );
}

export default App;
