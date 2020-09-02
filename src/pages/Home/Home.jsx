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
          <div className="col s4 cait-main-img">
            <img src="images/caitlin_elmslie_headshot.jpg" alt="" className='z-depth-1' />
          </div>
          <div className="col s12 l8">
            <img src="images/caitlin_elmslie_headshot.jpg" alt="" className='z-depth-1 mobile-main-img' />
            <p>Caitlin is an aspiring clinician scientist with a graduate degree in dance and undergraduate degrees in kinesiology and psychology. She is currently in her final year of study in Occupational Therapy at the University of Toronto.</p>
            <p>Caitlin is a Pilates Mat Instructor certified through Body Harmonics. She has taught dance for 15 years for students of all ages from young children to adults in studios and for programs across Ontario. A highlight of her training was the 3 months Caitlin spent in New York City studying at Broadway Dance Center as part of their International Student Visa Program. </p>
          </div>
        </div>
        <div>
          <div className="col s12 l6 offset-l3">
            <p>The goal of Works in Progress Movement Studio is to combine dance, pilates, and occupational therapy in order to promote the benefits of movement in an accessible way. </p>
            <hr />
            <p><strong>Caitlin Elmslie, MA BSc BA <br />
            Movement Educator <br />
            Certified Personal Trainer (CanFitPro) <br />
            Certified Pilates Mat Instructor (Body Harmonics)
            </strong></p>

          </div>
        </div>
      </div>
    </div>
  )
}

