import React from 'react'
import './AddSongPage.css'

const AddSongPage = () => {
  return (
    <div className='addsongdiv'>
        <h1>Adding a new Song</h1>
        <table>
            <tr>
                <th><label htmlFor='songname'>Song Name</label></th>
                <th><input id='songname' name='songname'/></th>
            </tr>
            <tr>
                <th><label htmlFor='datereleased'>Date Released</label></th>
                <th><input id='datereleased' name='datereleased'/></th>
            </tr>
            <tr>
                <th><label htmlFor='artwork'>ArtWork</label></th>
                <th><input id='artwork' type='file' name='artwork'/></th>
            </tr>
            <tr>
                <th><label htmlFor='artists'>Artists</label></th>
                <th><input id='artists' type='dropdown' name='artists'/></th>
            </tr>
            <tr>
                <th></th>
                <th>
                    <div className='buttondiv'>
                         <button>Cancel</button>
                         <button>Save</button>
                    </div>
                </th>
            </tr>
            
        </table>
        
    </div>
  )
}

export default AddSongPage
