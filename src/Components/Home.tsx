import React from 'react'
import { Link } from 'react-scroll'

const Home = () => (
    <div className="hero" id='home-page'>
        <div className='wrapper'>
          <div className='title'>
            <h1 style={{color: 'white', fontWeight: 'bold'}}>Guided Tours</h1>
            <h2 style={{color: 'yellow', fontWeight: 'bold'}}>for</h2>
            <h1 style={{color: 'red', fontWeight: 'bold'}}>Aalto Visitors</h1>
          </div>
        </div>
        <Link
          className="arrow"
          activeClass="active"
          to="management-page"
          spy={true}
          smooth={true}
          offset={-70}
          duration= {500}
        ></Link>
    </div>
)

export default Home