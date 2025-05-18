// src/pages/Missioni.js
import './Missioni.css';

const missioniPerRegione = {
  "Bosco degli Spiriti": [
    { titolo: "Salva il Druido", difficolta: "Facile", descrizione: "Il druido locale è stato intrappolato da radici maledette." },
    { titolo: "Caccia all’Orco Verde", difficolta: "Media", descrizione: "Un orco pericoloso minaccia i confini del villaggio." },
    { titolo: "Purificazione dell’Albero Antico", difficolta: "Difficile", descrizione: "Solo i più coraggiosi possono affrontare il cuore del male." },
  ],
  "Montagne Urlanti": [
    { titolo: "Scala la Vetta", difficolta: "Facile", descrizione: "Recupera una bandiera sacra dimenticata." },
    { titolo: "Battaglia del Passo Innevato", difficolta: "Media", descrizione: "Fermare l’avanzata di goblin armati." },
    { titolo: "Risveglia il Gigante di Pietra", difficolta: "Difficile", descrizione: "Una creatura antica è tornata a minacciare la valle." },
  ],
  "Deserto di Fiamme": [
    { titolo: "Recupera l’Oasi Perduta", difficolta: "Facile", descrizione: "Aiuta una carovana a trovare acqua." },
    { titolo: "Duel nel Sole", difficolta: "Media", descrizione: "Sfida un campione nomade in combattimento." },
    { titolo: "Sigilla la Cripta di Sabbia", difficolta: "Difficile", descrizione: "Creature oscure emergono ogni notte." },
  ],
  // ... aggiungi altre 7 regioni a tuo piacere
};

function Missioni() {
  return (
    <div className="missioni-container">
      <h1>Missioni per Regione</h1>
      {Object.entries(missioniPerRegione).map(([regione, missioni]) => (
        <div key={regione} className="regione">
          <h2>🌍 {regione}</h2>
          <ul className="lista-missioni">
            {missioni.map((missione, index) => (
              <li key={index} className={`missione ${missione.difficolta.toLowerCase()}`}>
                <h3>{missione.titolo} ({missione.difficolta})</h3>
                <p>{missione.descrizione}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Missioni;
