import React from 'react'
import logo from './banner.jpg'
import Slideshow
 from './Slideshow'
const Home = () => {
  return (
    <div>
      <header>
        <figure>
          <img
            src= {logo}
            alt="Welcome"
          />
        </figure>
      </header>
      <Slideshow />
    </div>
  )
}

export default Home