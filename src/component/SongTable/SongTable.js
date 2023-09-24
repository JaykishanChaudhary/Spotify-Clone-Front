import './SongTable.css'
import Add from '../../assets/add.png'
import axios from 'axios'
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import StarRating from '../StarRating/StarRating';






function SongTable(){

    const [SongData,setSongData]=useState([]);
    const navigate=useNavigate();

    console.log(SongData)
    useEffect(()=>{
        const token=localStorage.getItem('jwt');
        console.log("token",token)
        if(token){
            axios.get(`http://localhost:5000/song`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }).then((response)=>{
                setSongData(response.data.result)
                console.log("SongData",SongData);
            }).catch((err)=>{
                if(err.response && err.response.status === 401){
                    console.error('Unauthorized: Redirect to login or show error message');
                }else{
                    console.error(err)
                }
            })
        }else{
            console.error('No token available: Redirect to login or show error message');
        }
       
  
},[])


function NaviPage(){
    navigate('/addsong')
}

function convertToBase64(binaryData) {
    const binaryArray = new Uint8Array(binaryData);
    const base64Image = btoa(String.fromCharCode.apply(null, binaryArray));
    return `data:image/jpeg;base64,${base64Image}`;
}

    return <>
        <div className='songtablediv'>
            <div id="headdiv">
                <h1>Top 10 Songs</h1>
                <div id="add-div">
                    <img src={Add} alt="add"/>
                    <button onClick={NaviPage}>Add Song</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                    <th>ArtWork</th>
                    <th>Song</th>
                    <th>Date of Release</th>
                    <th>Artist</th>
                    <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                {SongData.map((Data,index)=>{
                    console.log(Data.name)
                    const base64Image = convertToBase64(Data.coverImage.data);
                   return (<tr key={index}>
                        <th><img src={base64Image} alt={`${Data.name} Cover`}/></th>
                        <th>{Data.name}</th>
                        <th>{Data.releaseDate}</th>
                        <th>{Data.artists.join(" , ")}</th>
                        <th>
                            {<StarRating initialRating={Data.rating}  />}
                        </th>
                    </tr>)
                   
                })}
                </tbody>
            </table>
        </div>
    </>
}

export default SongTable