import './App.css';
import {Routes, Route} from 'react-router-dom';


import Success from './Components/Success';
import Home from './Components/Home'
import Participants from './Components/Participants'

function App() {
  return (
    <Routes>
      <Route path="/success" element={<Success />} />
      <Route path="/" element={<Home />} />
      <Route path="/participants" element={<Participants/>} />
    </Routes>
  );
}

export default App;
