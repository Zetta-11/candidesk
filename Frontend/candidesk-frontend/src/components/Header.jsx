import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <header>
            <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
                <a className="navbar-brand ms-3" href="https://www.instagram.com">CANDIDESK</a>
                <div className='collapse navbar-collapse' id="navbarNav">
                  <ul className='navbar-nav'>

                    <li className='nav-item active'>
                      <NavLink className='nav-link' to='/home'>Home</NavLink>
                    </li>

                    <li className='nav-item active'>
                      <NavLink className='nav-link' to='/about'>About</NavLink>
                    </li>
                  </ul>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Header