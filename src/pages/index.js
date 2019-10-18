import React from "react"
import '../styles.sass'

// * State 
import Provider, { myContext } from '../components/provider'

// * Components 
import Layout from '../components/layout'

const Home = () => {
    return (
        <Provider>
            <Layout>
                <myContext.Consumer>
                    {context => (
                        <React.Fragment>
                            <h1>{context.state.toString()}</h1>
                            <button onClick={context.changeTheme}>Change</button>
                        </React.Fragment>
                    )}
                </myContext.Consumer>
            </Layout>
        </Provider>
    )
}
export default Home
