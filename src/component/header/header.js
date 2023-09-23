import './header.css'
import Search from '../../assets/search.png'

function Header(){
    return <>
        <div className='headerdiv'>
           <button className='homebutton'>Home</button>
           <div className='searchdiv'>
                <input type='text' id='search'/>
                <img src={Search} alt="search"/>
           </div>
        </div>
        </>
}


export default Header