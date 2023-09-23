import './header.css'
import Search from '../../assets/search.png'
import { useNavigate } from 'react-router'



function Header(){
    const navigate=useNavigate()
    function NaviPage(){
        navigate('/')
    }
    return <>
        <div className='headerdiv'>
           <button className='homebutton' onClick={NaviPage}>Home</button>
           <div className='searchdiv'>
                <input type='text' id='search'/>
                <img src={Search} alt="search"/>
           </div>
        </div>
        </>
}


export default Header