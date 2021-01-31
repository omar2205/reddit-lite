import React, { useEffect } from 'react'
import './PostFrame.css'

const stopProp = e => e.stopPropagation()

const PostFrame = ({url, close}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => document.body.style.overflow = 'auto'
  }, [])
  return (
    <div className="post-frame" onClick={close}>
      <iframe is="x-frame-bypass" src={url} onClick={() => stopProp(e)}></iframe>
    </div>
  )
}

export default PostFrame
