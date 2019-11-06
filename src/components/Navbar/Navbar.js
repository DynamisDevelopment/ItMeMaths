import React, { useState } from 'react'
import './Navbar.sass'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { useSpring, animated, useTransition } from 'react-spring'

const Navbar = ({ show, toggle }) => {
    const data = useStaticQuery(graphql`
    query {
        categories: graphcms {
            categories {
                name 
                slug
            }
        }
    }
    `)

    const transition = useTransition(show, null, {
        from: { transform: 'translateX(100%)' },
        enter: { transform: 'translateX(0%)' },
        leave: { transform: 'translateX(100%)' }
    })

    return (
        <div>
            {transition.map(({ item, key, props }) => (
                item && <animated.div className='sidebar' style={props}>
                    <div className="top">
                        <h1>ItMeMaths</h1>
                        <h1 className='close' onClick={() => toggle(false)}>X</h1>
                    </div>
                    <ul className="categories">
                        {data.categories.categories.map((subject, key) => {
                            return <li className="category"><div className="more"> > </div><Link to={'archive' + subject.slug}>{subject.name}</Link></li>
                        })}
                    </ul>
                </animated.div>
            ))}
        </div>
    )
}

export default Navbar


// {
//     transition.map(({ item, key, props }) => {
//         return
//     })
// }