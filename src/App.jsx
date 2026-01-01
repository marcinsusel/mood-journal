import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MoodProvider } from './context/MoodContext';
import Layout from './components/Layout';
import CheckIn from './pages/CheckIn';
import History from './pages/History';

function App() {
  return (
    <MoodProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<CheckIn />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Layout>
      </Router>
    </MoodProvider>
  );
}

export default App;
