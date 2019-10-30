import React from "react"
import { graphql, useStaticQuery, Link } from 'gatsby'

//* Styles 
import '../styles.sass'
import '../styles/index.sass'
import 'pure-react-carousel/dist/react-carousel.es.css'

// * Components 
import Layout from '../components/layout'
import GraphImg from "graphcms-image"
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import Masonry from 'react-masonry-component'

const Home = () => {
    const data = useStaticQuery(graphql`
    query {
        slider: graphcms {
            posts {
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
    const largeNum = () => randomNum(200, 600)

    const settings = {
        naturalSlideWidth: 4,
        naturalSlideHeight: 1,
        totalSlides: data.slider.posts.length,
        infinite: true
    }

    return (
        <Layout>
            <CarouselProvider {...settings}>
                <Slider>
                    {data.slider.posts.map((post, index) => {
                        return <Slide key={index} index={index} className='slide'>
                            <div className="banner-content-front">
                                <Link to={'posts/' + post.slug} className='title'>
                                    <h1>{post.title}</h1>
                                    <h3 className='desc'>{post.description}</h3>
                                </Link>
                            </div>
                            <GraphImg image={post.image} withWebp={true} fit={'clip'} className='banner home-banner' />
                        </Slide>
                    })}
                </Slider>
            </CarouselProvider>

            <div className="wrapper">
                <Masonry className={'posts'}>
                    {data.cards.posts.map((post, index) => {
                        return <div className={'card'} key={index}>
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
                </Masonry>
            </div>
        </Layout>
    )
}
export default Home
