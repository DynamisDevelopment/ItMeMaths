import React from 'react'
import Header from './Header/Header'

// * State 
import { myContext } from '../../wrap-with-provider'

const Layout = props => {
    return (
        <div>
            <myContext.Consumer>
                {context => (
                    <React.Fragment>
                        <div className={context.state ? 'darkTheme' : 'lightTheme'}>
                            <Header context={context} />
                            {props.children}
                            <a href="/posts/rational-exponents">POST</a>
                        </div>
                    </React.Fragment>
                )}
            </myContext.Consumer>
        </div>
    )
}

export default Layout