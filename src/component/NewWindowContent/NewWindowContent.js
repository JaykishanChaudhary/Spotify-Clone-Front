import React, { useState } from 'react'
import './NewWindowContent.css'
import Cancel from '../../assets/cancel.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NewWindowContent = () => {
    const navigate=useNavigate()


    const [formData,setformData]=useState({
        name:'',
        DOB:'',
        Bio:''
    })
    console.log(formData);

    const HandleFormData=(e)=>{
        const {name,value}=e.target
        setformData({
            ...formData,
            [name]:value
        })
    }
    async function ArtistCreate(){
        axios.post('http://localhost:5000/artist',formData).then((response)=>{
            console.log('response',response);
            navigate('/addsong')
         }).catch((err)=>{
            console.error(err);
        })

    }

    function NaviPage(){
        navigate('/addsong')
    }
  return (
    <div className='headdiv'>
        <div id='headerdiv'>
             <h2>Add Artist</h2>
            <img src={Cancel} height='40' width='40' id='cancelimg' onClick={NaviPage} alt='cancel'/>
        </div>
     <hr className='horizontal'/>
     <table>
        <tbody>
            <tr>
                <th><label htmlFor='artistname'>Artist Name</label></th>
                <th><input type='text' id='artistname' onChange={HandleFormData} name='name'/></th>
            </tr>
            <tr>
                <th><label htmlFor='dob'>Date of Birth</label></th>
                <th><input type='date' id='dob'name='DOB' onChange={HandleFormData} /></th>
            </tr>
            <tr>
                <th><label htmlFor='bio'>Bio</label></th>
                <th><input type='text' id='bio' name='Bio' onChange={HandleFormData} /></th>
            </tr>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>
                    <div className='buttondiv'>
                        <button onClick={ArtistCreate}>Save</button>
                        <button onClick={NaviPage}>Cancel</button>
                    </div>
                </th>
            </tr>
           
        </tbody>
     </table>
    
    </div>
  )
}

export default NewWindowContent
