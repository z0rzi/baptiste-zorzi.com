import React from 'react';
import Intro from './Intro';

function App() {
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
