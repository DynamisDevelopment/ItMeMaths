import React from "react"
import { graphql, useStaticQuery, Link } from 'gatsby'
import GraphImg from "graphcms-image"
import { Carousel } from 'react-responsive-carousel'
import '../styles.sass'
import '../styles/index.sass'

// * Components 
import Layout from '../components/layout'

const Home = () => {
    const data = useStaticQuery(graphql`
    query {
        slider: graphcms {
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
        cards: graphcms {
            posts {
                title 
                description
                slug 
                createdAt
                image: bannerImage {
                    handle
                    width 
                    height
                }
            }
        }
    }
    `)

    const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
    const largeNum = () => randomNum(250, 600)

    return (
        <Layout>
            {data.slider.posts.map((post, index) => {
                return <div key={index} className='slide'>
                    <div className="banner-content-front">
                        <Link to={'posts/' + post.slug} className='title'><h1>{post.title}</h1></Link>
                        <h3 className='desc'>{post.description}</h3>
                    </div>
                    <GraphImg image={post.image} withWebp={true} fit={'clip'} className='banner home-banner' />
                </div>
            })}

            <div className="wrapper">
                <div className="posts">
                    {data.cards.posts.map((post, index) => {
                        return <div className="card" key={index}>
                            <Link to={'posts/' + post.slug}>
                                <GraphImg
                                    image={post.image}
                                    withWebp={true}
                                    className='card-img'
                                    style={{ height: `${largeNum()}px` }} />
                            </Link>
                            <h2 className='post-title'>{post.title}</h2>
                            <h3 className='description'>{post.description}</h3>
                            <p className='createdAt'>{post.createdAt}</p>
                        </div>
                    })}
                </div>
            </div>
        </Layout >
    )
}
export default Home
