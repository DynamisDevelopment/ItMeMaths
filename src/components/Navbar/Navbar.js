import React, { useState } from 'react'
import './Navbar.sass'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { animated, useTransition, useSpring } from 'react-spring'

const Navbar = ({ show, toggle }) => {
    const data = useStaticQuery(graphql`
    query {
        categories: graphcms {
            categories {
                name 
                slug
                subCategories {
                    name 
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

    const [showExtras, toggleExtras] = useState(false)

    return (
        <div>
            {NavbarTransition.map(({ item, props }) => (
                item && <animated.div className='sidebar' style={props}>
                    <div className="top">
                        <h1>ItMeMaths</h1>
                        <h1 className='close' onClick={() => toggle(false)}>X</h1>
                    </div>
                    <h2 className="sectionTitle">Subjects</h2>
                    <ul className="categories">
                        <div className="veil"
                            style={{ visibility: !showExtras ? 'hidden' : 'visible' }}
                            onClick={() => toggleExtras(false)}></div>

                        {data.categories.categories.map((subject, key) => <SubCategory
                            subject={subject} key={key}
                            showExtras={showExtras} toggleExtras={toggleExtras} />)}

                    </ul>
                    <h2 className="sectionTitle">Extras</h2>
                    <h2 className="sectionTitle">Misc Links</h2>
                    <h2 className="sectionTitle">Contact</h2>
                    {data.profile.personals.map((profile, index) => {
                        return <ul className='contact'>
                            <li>{profile.address}</li>
                            <li>{profile.email}</li>
                            <li>{profile.phoneNumber}</li>
                        </ul>
                    })}
                </animated.div>
            ))
            }
        </div>
    )
}

export default Navbar


const SubCategory = ({ subject, key, showExtras, toggleExtras }) => {
    const [subListShow, toggleSubs] = useState(false)
    const subListSpring = useSpring({ transform: subListShow && showExtras ? 'translateX(0%)' : 'translateX(-100%)' })

    const [postListShow, togglePosts] = useState(false)
    const postListSpring = useSpring({ transform: postListShow && showExtras ? 'translateX(0%)' : 'translateX(-100%)' })

    return (
        <li className="category" key={key}>
            <img src="../assets/icons/left-arrow.svg" className="more" onClick={() => {
                toggleSubs(!subListShow)
                toggleExtras(true)
            }} />

            {/* // * SubCatagories */}
            <animated.ul className="subCategories" style={subListSpring} onClick={() => postListShow ? togglePosts(false) : ''}>
                {subject.subCategories.map((subCat, key) => {
                    return <div className="category subCat" key={key}>
                        {subCat && <img src="../assets/icons/left-arrow.svg" className="more" onClick={() => togglePosts(!postListShow)} />}
                        <div className="veil"
                            style={{ visibility: !postListShow ? 'hidden' : 'visible' }}
                            onClick={() => togglePosts(false)}></div>

                        {/* // * Posts */}
                        <animated.ul className="subCategories subPosts" style={postListSpring}>
                            {subCat.posts.map((post, key) => <li className="post" key={key}>
                                <Link to={'posts/' + post.slug}>{post.title}</Link>
                            </li>)}
                        </animated.ul>
                        <Link to={'archive/' + subCat.slug}>{subCat.name}</Link>
                    </div>
                })}
            </animated.ul>

            <Link to={'archive/' + subject.slug}>{subject.name}</Link>
        </li>
    )
}