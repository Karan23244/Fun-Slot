import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home"; 
import PolicyPage from "./components/Privacy"; 
import Terms from "./components/Terms"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/policy" element={<PolicyPage />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
}

export default App;