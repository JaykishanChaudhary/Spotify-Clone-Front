import React from 'react'
import './StarRating.css'
import {FaStar} from 'react-icons/fa'


const StarRating = ({rating}) => {
    let StarArray=[];
    for(let i=1;i<=5;i++){
        if(i<rating){
            StarArray.push(<span key={i} className='star filled'><FaStar/></span>)
        }else{
            StarArray.push(<span key={i} className='star'><FaStar/></span>)
        }
    }


  return (
    <div className='star-rating'>{StarArray}</div>
  )
}

export default StarRating
