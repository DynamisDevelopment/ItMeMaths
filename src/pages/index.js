import React from "react"
import { graphql, useStaticQuery, Link } from 'gatsby'

//* Styles 
import '../styles.sass'
import '../styles/index.sass'

// * Components 
import Layout from '../components/layout'
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

    return (
        <Layout>
            <Slider {...settings} className='slider'>
                {data.slider.posts.map((post, index) => {
                    return <div key={index} className='slide'>
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
                            <Moment format="MMMM D, YYYY" className='createdAt'>{post.createdAt}</Moment>
                        </div>
                    })}
                </Masonry>
            </div>
        </Layout>
    )
}
export default Home



// <CarouselProvider {...settings}>
//                 <Slider>
//                     {data.slider.posts.map((post, index) => {
//                         return <Slide key={index} index={index} className='slide'>
//                             <div className="banner-content-front">
//                                 <Link to={'posts/' + post.slug} className='title'>
//                                     <h1>{post.title}</h1>
//                                     <h3 className='desc'>{post.description}</h3>
//                                 </Link>
//                             </div>
//                             <GraphImg image={post.image} withWebp={true} fit={'clip'} className='banner home-banner' />
//                         </Slide>
//                     })}
//                 </Slider>
//             </CarouselProvider>