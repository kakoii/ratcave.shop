import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/Rat-PNG-Photo-Image.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>welcome to ratcave.shop</h2>
        <div>
            <div className="hero-hand-icon">
                <p>merch</p>
                <img src={hand_icon} alt="" />
            </div>
            <p>like you've</p>
            <p>never seen...</p>
        </div>
        <div className="hero-latest-btn">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  )
}

export default Hero
