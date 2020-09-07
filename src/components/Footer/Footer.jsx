import React from 'react'
import './Footer.css'

export default function Footer({ user }) {
  return (
    <footer>
      <h6>Have any questions or concerns? Send us an email and we'll get back to you as soon as possible!</h6>
      <a href="mailto:worksinprogressmovement@gmail.com?subject=URGENT: FROM SITE" target="_blank" rel="noopener noreferrer" className="btn">EMAIL US</a>
      <p>&copy; 2020 Tim Robillard</p>
    </footer>
  )
}
