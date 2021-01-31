import React, { useState, useEffect } from 'react'

import Header from './components/Header'
import Post from './components/Post'

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
    .then(res => { 
      document.title = res.data.title
      return res.data.title 
    })
}

const getLastElement = array => array[array.length - 1]

const App = () => {
  const [subreddit, setSubreddit] = useState(null)
  const [subtitle, setSubTitle] = useState(null)
  const [rawData, setRawData] = useState(null)
  const [lastId, setLastId] = useState(null)

  useEffect(async () => {
    // parse subreddit name from url
    if (location.pathname.slice(3).endsWith('/')) {
      setSubreddit(location.pathname.slice(3, location.pathname.length - 1))
    } else if (location.pathname === '/') {
      setSubreddit('memes')
    } else {
      setSubreddit(location.pathname.slice(3))
    }
    if(subreddit)
      setSubTitle(await fetch_sub_info(subreddit)) // fetch subreddit title
    // if we have an id in the URL.. remove ?id string
    if (location.search.slice(4)) {
      if(subreddit)
        setRawData(await fetch_reddit(subreddit, location.search.slice(4))) // fetch subreddit posts
    } else {
      if(subreddit)
        setRawData(await fetch_reddit(subreddit)) // fetch subreddit posts
    }
  }, [subreddit])

  useEffect(async () => {
    try {
      setLastId(getLastElement(rawData.data.children).data.id)
    } catch (err) {}
    window.scrollTo(0, 5)
  }, [rawData])

  return (
    <>
      <Header subreddit={subreddit} lastid={lastId} />
      <a href={location.pathname}><h1 className="sub-title">{ subtitle }</h1></a>
      <div className="posts-list">
        { rawData &&
            rawData.data.children.map(d => <Post data={d} key={d.data.id} /> )}
      </div>
    </>
  )
}

export default App
