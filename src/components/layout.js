import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'

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
                            <Footer />
                        </div>
                    </React.Fragment>
                )}
            </myContext.Consumer>
        </div>
    )
}

export default Layout