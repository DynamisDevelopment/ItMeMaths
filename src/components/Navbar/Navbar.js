import React, { useState } from 'react'
import './Navbar.sass'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { animated, useTransition } from 'react-spring'

const Navbar = ({ show, toggle }) => {
    const data = useStaticQuery(graphql`
    query {
        categories: graphcms {
            categories {
                name 
                slug
                subCategories {
                    title 
                    slug
                    posts {
                        title 
                        slug
                    }
                }
            }
        }
        profile: graphcms {
            personals(where: {name: "Andy"}) {
                name
                image: profilePicture { 
                    handle 
                    width 
                    height 
                }
                description 
                address 
                email 
                phoneNumber
            }
        }
    }
    `)

    const NavbarTransition = useTransition(show, null, {
        from: { transform: 'translateX(100%)' },
        enter: { transform: 'translateX(0%)' },
        leave: { transform: 'translateX(100%)' }
    })

    const [subShow, toggleSubs] = useState(false)
    const subTransition = useTransition(subShow, null, {
        from: { transform: 'translateX(-100%)' },
        enter: { transform: 'translateX(0%)' },
        leave: { transform: 'translateX(-100%)' }
    })

    const [postShow, togglePosts] = useState(false)
    const postTransition = useTransition(postShow, null, {
        from: { transform: 'translateX(-100%)' },
        enter: { transform: 'translateX(0%)' },
        leave: { transform: 'translateX(-100%)' }
    })

    return (
        <div>
            {NavbarTransition.map(({ item, props }) => (
                item && <animated.div className='sidebar' style={props}>
                    <div className="top" onClick={() => toggleSubs(false)}>
                        <h1>ItMeMaths</h1>
                        <h1 className='close' onClick={() => toggle(false)}>X</h1>
                    </div>
                    <h2 className="sectionTitle">Subjects</h2>
                    <ul className="categories">
                        <div className="veil"
                            style={{ visibility: !subShow ? 'hidden' : 'visible' }}
                            onClick={() => {
                                toggleSubs(false)
                                togglePosts(false)
                            }}></div>

                        {/* // * Categories */}
                        {data.categories.categories.map((subject, key) => {
                            return <li className="category" key={key}>
                                <img src="../assets/icons/left-arrow.svg" className="more" onClick={() => toggleSubs(!subShow)} />

                                {/* // * SubCatagories */}
                                {subTransition.map(({ item, props, key }) => (
                                    item && <animated.ul className="subCategories" style={props}>
                                        {subject.subCategories.map((subCat, key) => {
                                            return <div className="category subCat" key={key} onClick={() => postShow ? togglePosts(false) : ''}>
                                                <img src="../assets/icons/left-arrow.svg" className="more" onClick={() => togglePosts(!postShow)} />
                                                <div className="veil"
                                                    style={{ visibility: !postShow ? 'hidden' : 'visible' }}
                                                    onClick={() => togglePosts(false)}></div>

                                                {/* // * Posts */}
                                                {postTransition.map(({ item, props, key }) => (
                                                    item && <animated.ul className="subCategories subPosts" style={props}>
                                                        {subCat.posts.map((post, key) => {
                                                            return <li className="post"><Link to={'posts/' + post.slug}>{post.title}</Link></li>
                                                        })}
                                                    </animated.ul>
                                                ))}

                                                <Link to={'archive/' + subCat.slug}>{subCat.title}</Link>
                                            </div>
                                        })}
                                    </animated.ul>
                                ))}

                                <Link to={'archive/' + subject.slug}>{subject.name}</Link>
                            </li>
                        })}
                    </ul>
                    <h2 className="sectionTitle">Extras</h2>
                    <h2 className="sectionTitle">Misc Links</h2>
                    <h2 className="sectionTitle">Contact</h2>
                    {
                        data.profile.personals.map((profile, index) => {
                            return <ul className='contact'>
                                <li>{profile.address}</li>
                                <li>{profile.email}</li>
                                <li>{profile.phoneNumber}</li>
                            </ul>
                        })
                    }
                </animated.div>
            ))
            }
        </div>
    )
}

export default Navbar
