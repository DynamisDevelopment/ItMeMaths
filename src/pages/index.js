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
            </Layout>
        </Provider>
    )
}
export default Home
