// src/pages/Mostri.js
import './Mostri.css';

const mostri = [
  {
    nome: 'Mimic',
    vita: 58,
    magie: ['Adesivo', 'Mutazione Forme'],
    descrizione: 'Un mostro che assume l\'aspetto di oggetti inanimati per attirare le prede.',
  },
  {
    nome: 'Treant',
    vita: 138,
    magie: ['Schianto', 'Comando degli Alberi'],
    descrizione: 'Un gigantesco guardiano della foresta, animato dalla magia della natura.',
  },
  {
    nome: 'Beholder',
    vita: 180,
    magie: ['Raggio Disintegrante', 'Raggio di Paura', 'Raggio di Sonno'],
    descrizione: 'Una creatura fluttuante con molti occhi, ciascuno capace di lanciare incantesimi devastanti.',
  },
  {
    nome: 'Cubo Gelatinoso',
    vita: 84,
    magie: ['Assorbimento', 'Digestione Acida'],
    descrizione: 'Una massa trasparente che scivola nei dungeon, dissolvendo tutto ciò che incontra.',
  },
  {
    nome: 'Displacer Beast',
    vita: 85,
    magie: ['Dislocazione', 'Tentacoli'],
    descrizione: 'Una pantera a sei zampe con tentacoli, capace di creare illusioni per confondere le prede.',
  },
];

function Mostri() {
  return (
    <div className="mostri-container">
      <h1>Enciclopedia dei Mostri</h1>
      <ul className="mostri-lista">
        {mostri.map((mostro, index) => (
          <li key={index} className="mostro-item">
            <h3>👾 {mostro.nome}</h3>
            <p><strong>Vita:</strong> ❤️ {mostro.vita} HP</p>
            <p><strong>Abilità Magiche:</strong> 🪄 {mostro.magie.join(', ')}</p>
            <p className="descrizione">{mostro.descrizione}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Mostri;
