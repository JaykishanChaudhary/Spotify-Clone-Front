import './SongTable.css'
import Add from '../../assets/add.png'
import axios from 'axios'
import {useEffect, useState} from 'react'





function SongTable(){

    const [SongData,setSongData]=useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:5000/song`).then((response)=>{
            setSongData(response.data.result)
            console.log(SongData)
        }).catch((err)=>{
            console.error(err)
        })
  
},[])


    return <>
        <div className='songtablediv'>
            <div id="headdiv">
                <h1>Top 10 Songs</h1>
                <div id="add-div">
                    <img src={Add} alt="add"/>
                    <button>Add Song</button>
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
                   return (<tr key={index}>
                        <th>
                        <img        
                    src={`data:image/jpeg;base64,${Data.coverImage}`} 
                    alt={`${Data.name} Cover`}
                  />
                        </th>
                        <th>{Data.name}</th>
                        <th>{Data.releaseDate}</th>
                        <th>{Data.artistIds}</th>
                        <th>{Data.rating}</th>
                    </tr>)
                   
                })}
                </tbody>
            </table>
        </div>
    </>
}

export default SongTable