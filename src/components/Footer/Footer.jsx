import React from 'react'
import './Footer.css'

export default function Footer({ user }) {
  return (
    <footer>
      <h6>Have any questions or concerns? Send us an email and we'll get back to you as soon as possible!</h6>
      <a href="mailto:hello@timrobillard.com?subject=FROM WORKS IN PROGRESS" target="_blank" className="btn">EMAIL US</a>
      <p>&copy; 2020 Tim Robillard</p>
    </footer>
  )
}
