import React, { useState, useEffect } from 'react'

import Header from './components/Header'
import Post from './components/Post'

const memes_demo = [
/*
  {
    id: 'l8cvib', upvotes: '11.5K', comments: '48',
    title: 'I got my money on Rocky Potter',
    img: 'https://i.redd.it/gcp36l4m4ee61.jpg'
  }
*/
]

const roundNumbers = n =>
  Math.abs(n) > 999
    ? Math.sign(n) * (Math.abs(n) / 1000).toFixed(1) + 'K'
    : Math.sign(n) * Math.abs(n)

const fetch_reddit = async (sub, id) => {
  let url = `https://www.reddit.com/r/${sub}/.json?after=t3_${id}`
  return await fetch(url)
    .then(raw => raw.json())
    .then(res => res)
}

const fetch_sub_info = async sub => {
  let url = `https://www.reddit.com/r/${sub}/about/.json`
  return fetch(url)
    .then(raw => raw.json())
    .then(res => res.data.title)
}

const App = () => {
  const [subreddit, setSubreddit] = useState(null)
  const [subtitle, setSubTitle] = useState(null)
  const [rawData, setRawData] = useState(null)

  useEffect(async () => {
    setSubreddit(location.pathname.split('/r/')[1] || 'memes')
    setSubTitle(await fetch_sub_info(subreddit))
    setRawData(await fetch_reddit(subreddit))
    console.log(await rawData)
  }, [subreddit])

  return (
    <>
      <Header />
      <h1 className="sub-title">{ subtitle }</h1>
      <div className="posts-list">
        { rawData &&
            rawData.data.children.map(d => <Post data={d} /> )}
        { memes_demo.map(meme => <Meme data={meme} key={meme.id} />)}
      </div>
    </>
  )
}

export default App
