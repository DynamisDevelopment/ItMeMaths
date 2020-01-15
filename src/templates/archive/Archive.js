import React, { useState } from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

// * Styles 
import './Archive.sass'

// * Components 
import Layout from '../../components/layout'
import GraphImg from "graphcms-image"
import Masonry from 'react-masonry-component'
import Moment from 'react-moment'

export const data = graphql`
    query($slug: String!) {
        graphcms {
            category(where: {slug: $slug}) {
                name
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
            subCategory(where: {slug: $slug}) {
                name
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
    }
`
const Archive = ({ data }) => {
    const category = data.graphcms.category ? data.graphcms.category : data.graphcms.subCategory
    const posts = category.posts

    const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
    const largeNum = () => randomNum(200, 500)

    const [gridView, toggleGrid] = useState(false)

    return (
        <Layout>
            <div className='archive-title'><h1>{category.name}</h1></div>
            <div className="layout-options">
                <img src="../assets/icons/list-view.svg" alt="List View Option" onClick={() => toggleGrid(false)} />
                <img src="../assets/icons/masonry.svg" alt="Grid View Option" onClick={() => toggleGrid(true)} />
            </div>

            <div className="wrapper">
                {/*//* Grid View */}
                {gridView && <Masonry className={'posts'}>
                    {posts.map((post, index) => {
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
                    {posts.map((post, index) => {
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

export default Archive

