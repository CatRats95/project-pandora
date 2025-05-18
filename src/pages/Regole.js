// src/pages/Regole.js
import './Regole.css';

function Regole() {
  return (
    <div className="regole-container">
      <h1>Regole del Gioco</h1>
      <ol className="lista-regole">
        <li>I giocatori iniziano con 100 punti vita e 50 monete.</li>
        <li>Ogni turno un giocatore può muoversi, attaccare o lanciare una magia.</li>
        <li>Le magie possono essere usate solo se possedute e non esaurite.</li>
        <li>I mostri appaiono casualmente in base alla regione.</li>
        <li>Le missioni devono essere completate entro 5 turni o falliscono.</li>
        <li>Ogni arma ha un valore d’attacco e può essere potenziata.</li>
        <li>Il karma influisce sulle ricompense ricevute.</li>
        <li>Non si possono avere più di 3 magie attive per volta.</li>
        <li>Gli oggetti rari possono essere scambiati solo in città.</li>
        <li>Il gioco termina quando un giocatore completa 3 missioni principali.</li>
      </ol>
    </div>
  );
}

export default Regole;
