import './App.css';
import Form from './Components/Form';
import UserForm from './Components/UserForm';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Form/>}/>
      <Route path='/form' element={<UserForm/>}/>
    </Routes>
   </Router>
  );
}

export default App;
