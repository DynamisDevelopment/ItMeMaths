import React from 'react'
import { Link } from 'gatsby'
import './Header.sass'

const Header = ({ context }) => {
    return (
        <header className='header'>
            <nav>
                <Link to='/'><h1 className='title'>ItMeMaths</h1></Link>
                <div className="spacer"></div>
                <div>
                    <input type="text" className="searchBar" />
                    <div className="burger">Burger</div>
                </div>
            </nav>
        </header>
    )
}
export default Header


// <label> Change to {context.state ? 'light' : 'dark'}
// <input type="checkbox" onClick={context.changeTheme} />
// </label>