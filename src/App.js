import logo from './logo.svg';
import './App.css';
import Record from './Record';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes } from 'react-router-dom'
import { Route } from 'react-router'
import Details from './Details';
import Update from './Update';
function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Record/>} />
      <Route path='/findbyid/:id' element={<Details/>} />
      <Route path='/update/:id' element={<Update/>} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
