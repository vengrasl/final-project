import './App.css';
import Header from './components/Header';
import Register from './components/Register';
import Main from './components/Main';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import AddQuestion from './components/AddQuestion';
import EditQuestion from './components/EditQuestion';

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addQuestion" element={<AddQuestion />} />
        <Route path='/editQuestion/:id' element={<EditQuestion />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
