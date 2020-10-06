import React from 'react';
import Intro from './components/Intro/Intro';
import Qualifications from './components/Qualifications/Qualifications';

function App(): JSX.Element {
    return (
        <div className={`
            bg-white
            min-h-full
            font-sans
            text-black
            py-16 lg:py-40
            p-8 md:p-12 lg:p-0
            lg:pl-24
        `}>
            <Intro />
            <div className="container mx-auto">
                <Qualifications />
            </div>
        </div>
    );
}

export default App;
