import './App.css';
import Home from './component/Home/Home';
import AddSong from './component/AddSong/AddSong';
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route  path='/' element={<Home/>}/>
              <Route  path='/addsong' element={<AddSong/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
