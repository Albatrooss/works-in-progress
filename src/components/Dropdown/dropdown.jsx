import React, { useState } from 'react'

import './dropdownStyles.css'

export default function Dropdown({ selected, items, handleSelect }) {

  const [showing, setShowing] = useState(false)

  let markedItems = items.map((item, i) => <li onClick={() => handleSelect(i)}>{item.name}</li>)

  return (
    <div className="dropdown-container" onClick={() => setShowing(!showing)}>
      {!showing && <>{items[selected].name} <i className="fas fa-chevron-down"></i></>}
      {showing && <ul className='dropdown-list'>{markedItems}</ul>}
    </div>
  )
}
