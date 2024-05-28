import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Register from "./Register";
import Home from './Home';
import Courses from './Courses';
import Course from './Course';
import CoursesEdit from './CoursesEdit';
import AccountSetting from './AccountSetting';

function App() {
  
  return (
    <> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/Home" element={<Home />}/>
          <Route path="/Register" element={<Register />}/>
          <Route path="/Courses" element={<Courses />} />
          <Route path="/CoursesEdit" element={<CoursesEdit />} />
          <Route path="/Course/:courseId" element={<Course />} />
          <Route path="/AccountSetting" element={<AccountSetting />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
