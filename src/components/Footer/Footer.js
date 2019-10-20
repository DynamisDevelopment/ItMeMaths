import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import GraphImg from "graphcms-image"
import './Footer.sass'

const Footer = () => {
    const data = useStaticQuery(graphql`
    query {
        graphcms {
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
    return (
        <div>
        {data.graphcms.personals.map((profile, index) =>
            <footer key={index}>
                    <div className="section">
                        <h1>About</h1>
                        <div className="about-row">
                            <GraphImg image={profile.image} withWebp={true} key={index} alt={profile.name} className='profile-picture'/>
                            <p>{profile.description}</p>
                        </div>
                    </div>
                    <div className="section">
                        <h1>Contacts</h1>
                        <div className="details-row">
                            <p>{profile.address}</p>
                        </div>
                        <div className="details-row">
                            <p>{profile.email}</p>
                        </div>
                        <div className="details-row">
                            <p>{profile.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="section">
                        <h1>Subjects</h1>
                    </div>
                    <div className="copyright section">
                       <p>© {new Date().getFullYear()} All rights reserved.</p>
                    </div>
            </footer>
            )}
        </div>
    )
}

export default Footer