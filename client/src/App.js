import React from 'react';
import './styles/style.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Contacts from './components/Contacts';
import AddContactForm from './components/forms/AddContactForm';
import EditContactForm from './components/forms/EditContactForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/add" element={<AddContactForm />} />
          <Route path="/edit/:phoneId" element={<EditContactForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
