import React from 'react'

// round numbers, 1200 => 1.2K
const roundNumbers = n =>
  Math.abs(n) > 999
    ? Math.sign(n) * (Math.abs(n) / 1000).toFixed(1) + 'K'
    : Math.sign(n) * Math.abs(n)

const Post = props => {
  const { data: { data } } = props

  const rounded_n_comments = roundNumbers(data.num_comments)
  const rounded_n_ups = roundNumbers(data.ups)

  return (
    <div className="post">
      <a href={"https://old.reddit.com"+data.permalink}><h2 className="post-title">{ data.title }</h2></a>
      <p>{ data.id } - { rounded_n_ups } - { rounded_n_comments }</p>
      { data.post_hint === 'image' 
          ? <img src={ data.url } alt={ data.title } />
          : <a href={data.url}><img src={data.thumbnail} /></a> }
      { (() => {
        if (data.post_hint === 'image')
          <img src={ data.url } alt={ data.title } />
        else if(data.post_hint === 'hosted:video')
          <a href={"https://old.reddit.com"+data.permalink}><img src={data.thumbnail} /></a>
        else
          <a href={data.permalink}><img src={data.thumbnail} /></a>
      })()}
    </div>
  )
}

export default Post
