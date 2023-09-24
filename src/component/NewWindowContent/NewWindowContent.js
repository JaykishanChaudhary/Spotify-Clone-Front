import React, { useState,useEffect } from 'react'
import './NewWindowContent.css'
import Cancel from '../../assets/cancel.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NewWindowContent = () => {
    const navigate=useNavigate()
    const [selectedItem,setselectedItem]=useState(null);

    useEffect(()=>{
        console.log("UpdateDetail component mounted.")
        let StoredItem=localStorage.getItem('SelectedItem')
         console.log('StoredItem',StoredItem)
        if(StoredItem){
            setselectedItem(JSON.parse(StoredItem) );
            console.log(JSON.parse(StoredItem) )
        }
    },[])

    const [formData,setformData]=useState({
        name:'',
        dob:'',
        bio:''
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
        const token=localStorage.getItem('jwt');
        if(token){
            axios.post('http://localhost:5000/artist',formData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }).then((response)=>{
                console.log('response',response);
                navigate('/addsong')
             }).catch((err)=>{
                console.error(err);
            })
        }else{
            console.error('No token available: Redirect to login or show error message');
        }
       

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
                <th><input type='date' id='dob'name='dob' onChange={HandleFormData} /></th>
            </tr>
            <tr>
                <th><label htmlFor='bio'>Bio</label></th>
                <th><input type='text' id='bio' name='bio' onChange={HandleFormData} /></th>
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
