import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from './pages/ResumeUpdate/LandingPage';
import Dashboard from './pages/Home/Dashboard';
import EditResume from './pages/ResumeUpdate/Forms/EditResume';
import UserProvider from './context/userContext';
import Resume from './components/Resume';

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>

            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/resume/:resumeId" element={<EditResume />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />  
    </UserProvider>
  );

  
  const resumeData = {
    basics: {
      name: "John Doe",
      email: "john@example.com",
    }
  };

  return (
    <div className="App">
      <Resume resumeData={resumeData} />
    </div>
  );

};

export default App;