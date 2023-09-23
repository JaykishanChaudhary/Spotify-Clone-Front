import './ArtistTable.css'
import Add from '../../assets/add.png'
import axios from 'axios'
import {useEffect, useState} from 'react'





function ArtistTable(){

    const [ArtistData,setArtistData]=useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:5000/artist`).then((response)=>{
            setArtistData(response.data.result)
            // console.log(SongData)
        }).catch((err)=>{
            console.error(err)
        })
  
},[])


    return <>
        <div className='artisttablediv'>
            <div id="headdiv">
                <h1>Top 10 Artist</h1>
                <div id="add-div">
                    {/* <img src={Add} alt="add"/> */}
                    {/* <button>Add Song</button> */}
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Artist</th>
                        <th>Date of Birth</th>
                        <th>Songs</th>
                     </tr>
                </thead>
                <tbody>
                {ArtistData.map((Data,index)=>{
                    console.log(Data.name)
                   return (<tr key={index}>
                        <th>{Data.name}</th>
                        <th>{Data.DOB}</th>
                        <th>{Data.Songs.join("  ,  ")}</th>
                        {/* <th>{Data.rating}</th> */}
                    </tr>)
                   
                })}
                </tbody>
            </table>
        </div>
    </>
}

export default ArtistTable