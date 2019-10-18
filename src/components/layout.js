import React from 'react'
import Header from './Header/Header'

// * State 
import Provider, { myContext } from './provider'

const Layout = props => {
    return (
        <Provider>
            <myContext.Consumer>
                {context => (
                    <React.Fragment>
                        <div className={context.state ? 'darkTheme' : 'lightTheme'}>
                            <Header context={context} />
                            {props.children}
                        </div>
                    </React.Fragment>
                )}
            </myContext.Consumer>
        </Provider>
    )
}

export default Layout