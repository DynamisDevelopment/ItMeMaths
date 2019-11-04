import React from 'react'
import { Link } from 'gatsby'
import './Header.sass'

const Header = ({ context }) => {

    return (
        <header className='header'>
            <nav>
                <Link to='/'><h1 className='title'>ItMeMaths</h1></Link>
                <div className="spacer"></div>
                <div className="searchBar">
                    <img src="../assets/icons/search.svg" alt="Search Icon" className='search-icon' />
                    <input type="text" placeholder="Search Articles" />
                </div>
                <div><img src="./assets/icons/burger.svg" alt="burger" className='burger' /></div>
            </nav>

        </header>
    )
}
export default Header


// <label> Change to {context.state ? 'light' : 'dark'}
// <input type="checkbox" onClick={context.changeTheme} />
// </label>