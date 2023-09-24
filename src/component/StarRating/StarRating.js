import React, { useState } from 'react'
import './StarRating.css'
import {FaStar} from 'react-icons/fa'
import axios from 'axios'


const StarRating = ({initialRating}) => {
    const [rating,setrating]=useState(initialRating)
    function handleRating(starValue){
        setrating(starValue);
       async function UpdateRating(){
            const token=localStorage.getItem('jwt');
            if(token){
               await axios.put('http://localhost:5000/song/rate',{
                newRating:starValue
               },
               {
                headers:{
                    Authorization:`Bearer ${token}`
                   }
               }).then((response)=>{
                console.log(response)
               }).catch(err=>{
                console.error(err);
               })
            }else{
                console.error('Autherisation failed');
            }
        }
       UpdateRating()
    }


  return (
    <div className='star-rating'>{[1,2,3,4,5].map((starValue)=>{
       return <span
        key={starValue}
        onClick={()=>handleRating(starValue)}
        className={`star ${starValue<=rating ? "filled":""}`}
        ><FaStar/></span>
    })}</div>
  )
}

export default StarRating
