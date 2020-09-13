import React, {Component} from 'react';

class Intro extends Component {

  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <div className="Intro">
        <p className='text-xl'>
            Salut, je suis Baptiste.
        </p>
        <p className='text-m text-gray'>
            Je suis un Freelancer Francais.<br/>
            Je me spécialise dans le développement <span className='text-green'>Python</span> et <span className='text-red'>NodeJS</span>.
        </p>
      </div>
    );
  }
}

export default Intro;
