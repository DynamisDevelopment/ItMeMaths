import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from 'gatsby'

//* Styles 
import '../styles.sass'
import '../styles/index.sass'

// * Components 
import Layout from '../components/layout'
import Navbar from '../components/Navbar/Navbar'
import GraphImg from "graphcms-image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import Masonry from 'react-masonry-component'
import Moment from 'react-moment'

const Home = () => {
    const data = useStaticQuery(graphql`
    query {
        slider: graphcms {
            posts(orderBy: likes_ASC) {
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
            posts(where: {status: PUBLISHED}) {
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
    const largeNum = () => randomNum(200, 500)

    var settings = {
        dots: true,
        lazyLoad: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    const [gridView, toggleGrid] = useState(true)

    return (
        <Layout>
            <Slider {...settings} className='slider'>
                {data.slider.posts.map((post, index) => {
                    return post.image && <div key={index} className='slide'>
                        <div className="banner-content-front">
                            <Link to={'posts/' + post.slug} className='title'>
                                <h1>{post.title}</h1>
                                <h3 className='desc'>{post.description}</h3>
                            </Link>
                        </div>
                        <GraphImg image={post.image} withWebp={true} fit={'clip'} className='banner home-banner' />
                    </div>
                })}
            </Slider>

            <div className="layout-options">
                <img src="../assets/icons/list-view.svg" alt="List View Option" onClick={() => toggleGrid(false)} />
                <img src="../assets/icons/masonry.svg" alt="Grid View Option" onClick={() => toggleGrid(true)} />
            </div>

            <div className="wrapper">
                {/*//* Grid View */}
                {gridView && <Masonry className={'posts'}>
                    {data.cards.posts.map((post, index) => {
                        return <div className={'card-grid'} key={index}>
                            <Link to={'posts/' + post.slug}>
                                {post.image && <GraphImg
                                    image={post.image}
                                    withWebp={true}
                                    className='card-img'
                                    style={{ height: `${largeNum()}px` }} />}
                                <h2 className='post-title'>{post.title}</h2>
                            </Link>
                            <h3 className='description'>{post.description}</h3>
                            <Moment format="MMMM D, YYYY" className='createdAt'>{post.createdAt}</Moment>
                        </div>
                    })}
                </Masonry>}

                {/*//* Compact List View */}
                {!gridView && <div className={'list-posts'}>
                    {data.cards.posts.map((post, index) => {
                        return <div className='card-list' key={index}>
                            <Link to={'posts/' + post.slug}>
                                <h2 className='post-title'>{post.title}</h2>
                            </Link>
                            <h3 className='description'>{post.description}</h3>
                            <Moment format="MMMM D, YYYY" className='createdAt'>{post.createdAt}</Moment>
                        </div>
                    })}
                </div>}
            </div>
        </Layout>
    )
}
export default Home
