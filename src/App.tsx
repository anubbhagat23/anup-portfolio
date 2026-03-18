import './App.css';
import './styles/global.scss';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LearnWithAnup from './pages/LearnWithAnup/LearnWithAnup';

function App() {
return (
<div className="portfolio-container">
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/learnwithanup" element={<LearnWithAnup />} />
</Routes>
</div>
);
}

export default App;