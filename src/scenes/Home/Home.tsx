import React from 'react';
import Intro from './components/Intro/Intro';

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
        </div>
    );
}

export default App;
