import React, { useEffect, useState } from 'react'
import './AddSongPage.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import NewWindowContent from '../NewWindowContent/NewWindowContent';



const AddSongPage = () => {
    const [Artists,setArtists]=useState([]);
    const navigate=useNavigate();
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [File,setFile]=useState(null);
    const [showModel,setshowModel]=useState(false)
    const [formData,setformData]=useState({
        name:'',
        releaseDate:'',
        coverImage:File,
        artistNames:selectedArtists,
        artistIds:selectedArtists._id
    });
    console.log("formData",formData)
    const HandleFormData=(e)=>{
        const {name,value}=e.target
        setformData({
            ...formData,
            [name]:value
        })
    }

    function closeModel(){ setshowModel(false)}

    const HandleSelectedArtists = (selectedOptions) => {
        setSelectedArtists(selectedOptions);
        const artistNames = selectedOptions.map((option) => option.value);
        const artistIds = artistNames.map((name) => {
            const artist = Artists.find((artist) => artist.name === name);
            return artist ? artist._id : null;
        });
        console.log(artistIds)
        setformData({
            ...formData,
            artistNames: artistNames,
            artistIds:artistIds
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
        setshowModel(true)
      };

      function CreateSong(){
        const token=localStorage.getItem('jwt');
        if(token){
            axios.post('http://localhost:5000/song',formData ,{headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              }
            
              }).then((response)=>{
                console.log(response);
                navigate('/home')

            }).catch((err)=>{
               console.error(err)
            })
        }   else {
            console.error('No token available: Redirect to login or show error message');
          }
      
      }
      useEffect(()=>{
        const token=localStorage.getItem('jwt');
        console.log("token",token)
        if(token){
            axios.get('http://localhost:5000/artist',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }).then((response)=>{
                setArtists(response.data.result);
                console.log('Artists',Artists);
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


  return (
        <>
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
                         <button onClick={()=>navigate('/')}>Cancel</button>
                         <button onClick={CreateSong}>Save</button>
                    </div>
                </th>
            </tr>
            </tbody>
        </table>
        {showModel && <NewWindowContent closeModel={closeModel}/>}
    </div>
    </>
  )
}

export default AddSongPage
