import React from 'react'
import './NewsLetter.css'
const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>(As Well as Notifications for our 1 of 1 Drops ;)</p>
      <div>
        <input type="email" placeholder='Your Email' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
