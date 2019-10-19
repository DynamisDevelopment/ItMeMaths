import React from 'react'
import './Header.sass'

const Header = ({context}) => {
    const theme = {
        border: context.state ? '1px solid rgba(255, 255, 255, .3)' : '1px solid rgba(0, 0, 0, .3)'
    }
    return (
        <div className='header'>
            <nav>
                <h1 className='title' style={theme}>ItMeMath</h1>
                <div className="spacer" style={theme}>
                    <label> Change to {context.state ? 'light' : 'dark' }
                        <input type="checkbox" onClick={context.changeTheme}/>
                    </label>
                </div>
                <div style={theme}>
                    <input type="text" className="searchBar"/>
                    <div className="burger" style={theme}>Burger</div>
                </div>
            </nav>
        </div>
    )
}
export default Header