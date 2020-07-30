import React from 'react';

import Schedule from '../../components/Schedule/Schedule';

export default function Home() {
  return (
    <div className='home center-align'>
      <Schedule />
      <img src="images/FredAndGinger.png" alt="Fred + Ginger" style={{ maxWidth: '100%' }} />
      <div className="row">
        <hr className="col s12 l6 offset-l3" />
        <h4 className="col s12">Words from the Director</h4>
        <div className="director-msg col s12 l6 offset-l3">
          <img src="images/Cait-01.jpg" alt="" className='z-depth-1' />
          <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut dolores obcaecati quia ipsa quasi eveniet, commodi accusantium? Distinctio nemo nisi adipisci enim explicabo nobis, nulla exercitationem dicta aliquid illum eveniet?</p> <hr /><p><strong>Caitlin Elmslie - Director</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}

