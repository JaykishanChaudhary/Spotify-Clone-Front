import './App.css';
import Home from './component/Home/Home';
import AddSong from './component/AddSong/AddSong';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddArtist from './component/AddArtist/AddArtist';
import SignIn from './component/User/SignIn';
import SignUp from './component/User/SignUp';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/" element={<SignUp />}></Route>
              <Route  path='/home' element={<Home/>}/>
              <Route  path='/addsong' element={<AddSong/>}/>
              <Route  path='/addartist' element={<AddArtist/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
