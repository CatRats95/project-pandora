// src/pages/Magie.js
import './Magie.css';

const magieDisponibili = [
  {
    nome: 'Palla di Fuoco',
    descrizione: 'Lancia una sfera infuocata che esplode all’impatto, infliggendo danni ad area.',
  },
  {
    nome: 'Scudo di Ghiaccio',
    descrizione: 'Crea una barriera congelata che assorbe danni fisici per 3 turni.',
  },
  {
    nome: 'Folgore Eterna',
    descrizione: 'Evoca un fulmine che colpisce un nemico ignorando armature.',
  },
  {
    nome: 'Invisibilità',
    descrizione: 'Rende il personaggio invisibile per un turno intero.',
  },
  {
    nome: 'Cura Maggiore',
    descrizione: 'Ripristina una grande quantità di punti vita.',
  },
  {
    nome: 'Risucchio d’Anima',
    descrizione: 'Assorbe vita dal nemico e la trasferisce al mago.',
  },
  {
    nome: 'Esplosione Arcana',
    descrizione: 'Una raffica magica che colpisce tutti i nemici vicini.',
  },
  {
    nome: 'Evoca Lupo Spirituale',
    descrizione: 'Evoca una creatura alleata che combatte per te per 2 turni.',
  },
  {
    nome: 'Tempesta Elementale',
    descrizione: 'Scatena una tempesta di vento, fuoco e ghiaccio contro tutti i nemici.',
  },
  {
    nome: 'Sigillo del Caos',
    descrizione: 'Causa un effetto casuale su tutti i personaggi in campo.',
  },
];

function Magie() {
  return (
    <div className="magie-container">
      <h1>Elenco delle Magie</h1>
      <ul className="magie-lista">
        {magieDisponibili.map((magia, index) => (
          <li key={index} className="magia-item">
            <h3>🪄 {magia.nome}</h3>
            <p>{magia.descrizione}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Magie;
