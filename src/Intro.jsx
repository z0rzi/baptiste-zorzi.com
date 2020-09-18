import React, {Component} from 'react';
import laptop from './assets/images/laptop.png';
import Shadow from './components/Shadow';

class Intro extends Component {

  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <div>
        <div className={`
         block
         align-middle
         lg:w-1/3 
         text-center lg:text-left
                      lg:inline-block

        `}>
          <p className='text-m md:text-l lg:text-xxl'>
              Salut, je suis Baptiste.
          </p>
          <p className={`
            text-xs md:text-s lg:text-m
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
          align-middle`}>

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
