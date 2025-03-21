import React from 'react'
import Nb from './Nb'
import Post from './Post'

export default function Feed1() {
  const username=localStorage.getItem("liu");
  if(!username){
    window.location.href="/login";
    return;
  }
  return (
    <div className='_layout _layout_main_wrapper'>
        <div className="_main_layout">
            <Nb/>
            <Post/>
        </div>

    </div>
  )
}