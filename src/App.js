import './App.css';
import Navbar from './components/Navbar';
import sfondoDrago from './assets/dragohome.jpg';
import Magie from './pages/Magie';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Personaggi from './pages/Personaggi';
import Mostri from './pages/Mostri';
import Missioni from './pages/Missioni';
import Regole from './pages/Regole';
import Combattimento from './pages/Combattimento';

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${sfondoDrago})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Router>
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personaggi" element={<Personaggi />} />
            <Route path="/magie" element={<Magie />} />
            <Route path="/mostri" element={<Mostri />} />
            <Route path="/missioni" element={<Missioni />} />
            <Route path="/regole" element={<Regole />} />
            <Route path="/combattimento" element={<Combattimento />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
