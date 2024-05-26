import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Register from "./Register";
import Home from './Home';

function App() {
  
  return (
    <> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/Home" element={<Home />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
