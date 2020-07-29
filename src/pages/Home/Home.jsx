import React from 'react';

import Schedule from '../../components/Schedule/Schedule';
import About from '../../pages/About/About'

export default function Home() {
  return (
    <div className='home center-align'>
      <Schedule />
      <img src="https://i.kinja-img.com/gawker-media/image/upload/c_scale,f_auto,fl_progressive,pg_1,q_80,w_800/ezbjlivvzlmssnrhvklb.jpg" alt="photo" style={{ maxWidth: '100%' }} />
      <p className='fred-quote'>I just put my feet in the air and move them around.</p>
      <p className='fred-quote quote-right'>-Fred Astaire</p>
      <hr />
      <h4>Words from the Director</h4>
      <div className="director-msg">
        <img src="Cait-01.jpg" alt="" className='z-depth-1' />
        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut dolores obcaecati quia ipsa quasi eveniet, commodi accusantium? Distinctio nemo nisi adipisci enim explicabo nobis, nulla exercitationem dicta aliquid illum eveniet? <hr /><strong>Caitlin Elmslie - Director</strong></p>
        </div>
      </div>
    </div>
  )
}

