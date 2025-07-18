import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Leaderboard from "./components/Leaderboard";
import ExerciseHistory from "./components/ExerciseHistory";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/progress" element={<ExerciseHistory />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
