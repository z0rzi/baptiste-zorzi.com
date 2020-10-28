import React from 'react';
import Intro from './components/Intro/Intro';
import Navbar from './components/Navbar/Navbar';
import Qualifications from './components/Qualifications/Qualifications';
import Contact from './components/Contact/Contact';
import { Element as ScrollElem } from 'react-scroll';

function App(): JSX.Element {
    return (
        <div className="bg-white min-h-full font-sans text-black">
            <div className="p-8 md:p-12 lg:p-0 lg:pl-24">
                <Navbar />
                <ScrollElem name="intro"><Intro /></ScrollElem>
            </div>
            <div className="container mx-auto px-5 lg:px-24 pb-20">
                <ScrollElem className="py-10" name="qualifications"><Qualifications /></ScrollElem>
                <ScrollElem className="py-10" name="contacts"><Contact /></ScrollElem>
            </div>
        </div>
    );
}

export default App;
