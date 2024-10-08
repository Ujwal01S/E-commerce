import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <h4 className='text-center'>All Right Reserved &copy; Noobie</h4>
        <p className='footp'>
        <Link to='/about'>About</Link>|
        <Link to='/contact'>Contact</Link>|
        <Link to='/policy'>Policy</Link>
        </p>
    </div>
  )
}

export default Footer