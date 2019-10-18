import React from 'react'
import './Header.sass'

const Header = ({context}) => {
    return (
        <div className='header'>
            <nav>
                <h1 className='title'>ItMeMath</h1>
                <div className="spacer">
                    <label> Change to {context.state ? 'light' : 'dark' }
                        <input type="checkbox" onClick={context.changeTheme}/>
                    </label>
                </div>
                <div>
                    <input type="text" className="searchBar"/>
                    <div className="burger"></div>
                </div>
            </nav>
        </div>
    )
}

export default Header