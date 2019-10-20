import React from "react"
import { graphql, useStaticQuery } from 'gatsby'
import GraphImg from "graphcms-image"
import { Carousel } from 'react-responsive-carousel'
import '../styles.sass'
import '../styles/index.sass'

// * Components 
import Layout from '../components/layout'

const Home = () => {
    const data = useStaticQuery(graphql`
    query {
        graphcms {
            posts(first: 1) {
                title 
                description
                slug 
                image: bannerImage {
                    handle
                    width 
                    height
                }
            }
        }
    }
    `)

    return (
        <Layout>
            {data.graphcms.posts.map((post, index) => {
                return <div key={index} className='slide'>
                    <div className="content">
                        <h1 className='title'>{post.title}</h1>
                        <h3 className='desc'>{post.description}</h3>
                    </div>
                    <GraphImg image={post.image} withWebp={true} fit={'clip'} className='banner' />
                </div>
            })}
        </Layout>
    )
}
export default Home
