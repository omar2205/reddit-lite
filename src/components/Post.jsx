import React, { useState } from 'react'
import PostFrame from './PostFrame'

// round numbers, 1200 => 1.2K
const roundNumbers = n =>
  Math.abs(n) > 999
    ? Math.sign(n) * (Math.abs(n) / 1000).toFixed(1) + 'K'
    : Math.sign(n) * Math.abs(n)

const Post = props => {
  const [showPost, setShowPost] = useState(false)
  const { data: { data } } = props

  const rounded_n_comments = roundNumbers(data.num_comments)
  const rounded_n_ups = roundNumbers(data.ups)

  const post = () => {
    if (data.post_hint === 'image')
      return <a href={data.url}><img src={ data.url } alt={ data.title } /></a>
    if (data.post_hint === 'hosted:video')
      return <a href={"https://old.reddit.com"+data.permalink}><img src={data.thumbnail} /></a>
    return <a href={"https://old.reddit.com"+data.permalink}><img src={data.thumbnail} /></a>
  }

  const closePost = () => setShowPost(false)
  const handleClick = e => {
    if(e.button === 0) {
      e.preventDefault()
      setShowPost(true)
    } 
  }

  return (
    <>
      { showPost && <PostFrame url={"https://old.reddit.com"+data.permalink} close={closePost} /> }
      <div className="post" onMouseDown={handleClick} >
        <a href={"https://old.reddit.com"+data.permalink}><h2 className="post-title">{ data.title }</h2></a>
        <p>{ data.id } - { rounded_n_ups } - { rounded_n_comments }</p>
        { post() }
      </div>
    </>
  )
}

export default Post
