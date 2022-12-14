import React from 'react'
import style from './style.module.css'
const Video = ({vid}) => {
  return (
    <div className={style.video}>
        <i className="fa-regular fa-circle-play"></i>
        <img src={`/images/${vid}`}/>
    </div>
  )
}

export default Video