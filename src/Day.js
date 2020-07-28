import React from 'react';

import Block from './Block';

export default function Day({ class1, class2, class3 }) {
  return (
    <div className='day'>
      <Block clss={class1} />
      <Block clss={class2} />
      <Block clss={class3} />
    </div>
  )
}