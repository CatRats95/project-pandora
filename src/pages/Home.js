import { useState, useEffect } from 'react';
import mappa from '../assets/mappa.webp';
import './Home.css';

function Home() {
  const [posizione, setPosizione] = useState(() => {
    const salvata = localStorage.getItem('posizionePedina');
    return salvata ? JSON.parse(salvata) : null;
  });

  useEffect(() => {
    if (posizione) {
      localStorage.setItem('posizionePedina', JSON.stringify(posizione));
    }
  }, [posizione]);

  const gestisciClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosizione({ x, y });
  };

  return (
    <div className="home-container">
      <h1>Benvenuto in Project Pandora</h1>
      <p>Clicca sulla mappa per posizionare la pedina.</p>
      <div className="mappa-wrapper" onClick={gestisciClick}>
        <img src={mappa} alt="Mappa del mondo" className="mappa-img" />
        {posizione && (
          <div
            className="pedina"
            style={{ left: posizione.x, top: posizione.y }}
          >
            🧍
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
