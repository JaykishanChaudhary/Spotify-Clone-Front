import React, { useEffect, useState } from 'react'
import './AddSongPage.css'
import { ReactDOM } from 'react';
// import NewWindowContent from '../NewWindowContent/NewWindowContent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';



const AddSongPage = () => {
    const [Artists,setArtists]=useState([]);
    const navigate=useNavigate();
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [File,setFile]=useState(null);
    const [formData,setformData]=useState({
        name:'',
        releaseDate:'',
        coverImage:File,
        artistNames:selectedArtists
    });
    console.log("formData",formData)
    const HandleFormData=(e)=>{
        const {name,value}=e.target
        setformData({
            ...formData,
            [name]:value
        })
    }

    const HandleSelectedArtists = (selectedOptions) => {
        setSelectedArtists(selectedOptions);
        const artistNames = selectedOptions.map((option) => option.value);
    
        setformData({
            ...formData,
            artistNames: artistNames,
        });
    }
    const artistOptions = Artists.map((data, key) => ({
        label: data.name,
        value: data.name,
      }));
      
      const HandleImageFile=(e)=>{
        const file=e.target.files[0];
        setFile(file);
        setformData({
            ...formData,
            coverImage: file,
        });
      }
    const openCustomWindow = () => {
        navigate('/addartist')
      };

      function CreateSong(){
        axios.post('http://localhost:5000/song',formData ,{headers: {
            'Content-Type': 'multipart/form-data',
          }}).then((response)=>{
            console.log(response);
        }).catch((err)=>{
           console.error(err)
        })
        navigate('/')
      }
      useEffect(()=>{
        axios.get('http://localhost:5000/artist').then((response)=>{
            setArtists(response.data.result);
            console.log('Artists',Artists);
        }).catch((err)=>{
           console.error(err)
        })
      },[])


  return (
    <div className='addsongdiv'>
        <h1>Adding a new Song</h1>
        <table>
            <tbody>
            <tr>
                <th><label htmlFor='songname'>Song Name</label></th>
                <th><input id='songname' onChange={HandleFormData} name='name'/></th>
            </tr>
            <tr>
                <th><label htmlFor='datereleased'>Date Released</label></th>
                <th><input id='datereleased' onChange={HandleFormData} name='releaseDate'/></th>
            </tr>
            <tr>
                <th><label htmlFor='artwork'>ArtWork</label></th>
                <th><input id='artwork' type='file' onChange={HandleImageFile} name='coverImage'/></th>
            </tr>
            <tr>
                <th><label htmlFor='artists'>Artists</label></th>
                <th>
                <Select id="artists" className="custom-select" name="artistNames" options={artistOptions} isMulti value={selectedArtists}
                onChange={HandleSelectedArtists}/>
                </th>
                <th>
                    <button onClick={openCustomWindow}>Add Artist</button>
                </th>
            </tr>
            <tr>
                <th></th>
                <th>
                    <div className='buttondiv'>
                         <button onClick={navigate('/')}>Cancel</button>
                         <button onClick={CreateSong}>Save</button>
                    </div>
                </th>
            </tr>
            </tbody>
        </table>
        
    </div>
  )
}

export default AddSongPage
