import React from 'react'
import './Header.sass'

const Header = ({ context }) => {
    return (
        <div className='header'>
            <nav>
                <a href="/"><h1 className='title'>ItMeMaths</h1></a>
                <div className="spacer"></div>
                <div>
                    <input type="text" className="searchBar" />
                    <div className="burger">Burger</div>
                </div>
            </nav>
        </div>
    )
}
export default Header


// <label> Change to {context.state ? 'light' : 'dark'}
// <input type="checkbox" onClick={context.changeTheme} />
// </label>