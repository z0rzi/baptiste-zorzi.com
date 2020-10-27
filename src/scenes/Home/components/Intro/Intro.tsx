import React, {Component} from 'react';
import laptop from './images/laptop.png';
import Shadow from './components/Shadow/Shadow';

class Intro extends Component {

    render(): JSX.Element {
        return (
            <div className="mb-56 py-16 lg:py-40">
                <div className={`
                    block
                    align-middle
                    lg:w-1/3 
                    text-center lg:text-left
                    lg:inline-block

                `}>
                    <p className='text-introTitle'>
                        Bonjour, je suis Baptiste.
                    </p>
                    <p className={`
                        text-introDesc
                        text-gray
                        mt-12 lg:mt-24
                    `}>
                        Je suis un developpeur indépendant Francais.<br/>
                        Je me spécialise dans le développement <span className='text-green font-bold'>Python</span> et <span className='text-red font-bold'>NodeJS</span>.
                    </p>
                </div>
                <div className={`
                    block lg:inline-block
                    w-full lg:w-2/3
                    mt-20 lg:mt-0
                    lg:pl-24
                    align-middle
                `}>
                    <div className={`
                        md:w-2/3
                        mx-auto`
                    }>
                        <Shadow image={laptop} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Intro;
