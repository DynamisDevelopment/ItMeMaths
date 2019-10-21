import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import GraphImg from "graphcms-image"
import './Post.sass'

// * Components 
import Layout from '../../components/layout'

export const data = graphql`
    query($slug: String!) {
        slider: graphcms {
            post(where: {slug: $slug}) {
                title 
                description
                slug 
                createdAt
                likes
                views
                image: bannerImage {
                    handle
                    width 
                    height
                }
            }
        }
        content: graphcms {
            post(where: {slug: $slug}) {
                content { 
                    html 
                    text 
                    markdown
                }
            }
        }
    }
    `

const Post = props => {
    const slider = props.data.slider.post
    const content = props.data.content.post.content

    const renderContent = () => { return { __html: content.html } }
    return (
        <div>
            <Layout>
                <div className='slide'>
                    <div className="banner-content-post">
                        <h1 className='title'>{slider.title}</h1>
                        <h4 className="createdAt">{slider.createdAt}</h4>
                        <div className="row">
                            <div className="stats row">
                                <p>{slider.views === null ? 0 : 1}</p>
                                <img src="#" alt="icon" />
                            </div>
                            <div className="stats row">
                                <p>{slider.likes === null ? 0 : 1}</p>
                                <img src="#" alt="icon" />
                            </div>
                        </div>
                    </div>
                    <GraphImg image={slider.image} withWebp={true} fit={'clip'} className='banner post-banner' />

                </div>
                <div className="post-content">
                    <div dangerouslySetInnerHTML={renderContent()} className='container' />
                </div>
            </Layout>
        </div>
    )
}

export default Post