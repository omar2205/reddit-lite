import React from 'react'
import './btn.css'

const Header = props => {
  return <>
  <nav>
    <h1>Reddit 3</h1>
    <p>By oskr.nl</p>
    <a className="btn" href={'/r/'+ props.subreddit + '/?id=' + props.lastid}>Next</a>
  </nav>
  </>
}

export default Header
