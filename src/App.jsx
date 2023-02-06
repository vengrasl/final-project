import './App.css';
import Header from './components/Header';
import Register from './components/Register';
import Main from './components/Main';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
  
      </Routes>
    </>
  );
}

export default App;
