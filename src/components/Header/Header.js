import React, { useState } from 'react'
import { Link } from 'gatsby'
import './Header.sass'
import Navbar from '../Navbar/Navbar'

const Header = ({ context }) => {
    const [show, toggle] = useState(false)

    return (
        <header className='header'>
            <nav>
                <Link to='/'><h1 className='siteName'>ItMeMaths</h1></Link>
                <div className="spacer"></div>

                <div className='burger' onClick={() => toggle(true)}><img src="../assets/icons/burger.svg" alt="burger" /></div>
            </nav>
            <Navbar show={show} toggle={toggle} />
        </header>
    )
}
export default Header


// <label> Change to {context.state ? 'light' : 'dark'}
// <input type="checkbox" onClick={context.changeTheme} />
// </label>

// <div className="searchBar">
// <img src="../assets/icons/search.svg" alt="Search Icon" className='search-icon' />
// <input type="text" placeholder="Search Articles" />
// </div>