import { useState, useEffect } from 'react';
import './Personaggi.css';

function Personaggi() {
  const [vita, setVita] = useState(() => {
  const salvata = localStorage.getItem('vita');
  return salvata ? JSON.parse(salvata) : 10;
});
  const [armatura, setArmatura] = useState(() => {
  const salvata = localStorage.getItem('armatura');
  return salvata ? JSON.parse(salvata) : 5;
});
const [monete, setMonete] = useState(() => {
  const salvata = localStorage.getItem('monete');
  return salvata ? JSON.parse(salvata) : 1;
});
 const [protezioni, setProtezioni] = useState(() => {
  const salvata = localStorage.getItem('protezioni');
  return salvata ? JSON.parse(salvata) : 1;
});
  const [karma, setKarma] = useState(() => {
  const salvata = localStorage.getItem('karma');
  return salvata ? JSON.parse(salvata) : 3;
});
  const [missioneInput, setMissioneInput] = useState('');
  const [magie, setMagie] = useState(() => {
  const salvata = localStorage.getItem('magie');
  return salvata ? JSON.parse(salvata) : [];
});
  const [magiaInput, setMagiaInput] = useState('');
const [nome, setNome] = useState(() => {
  const salvata = localStorage.getItem('nome');
  return salvata ? JSON.parse(salvata) : ('scegli un nome');
});
 const [armi, setArmi] = useState(() => {
  const salvata = localStorage.getItem('armi');
  return salvata ? JSON.parse(salvata) : [] ;
});
  const [armaInput, setArmaInput] = useState('');

  const [missioniInCorso, setMissioniInCorso] = useState(() => {
  const salvate = localStorage.getItem('missioniInCorso');
  return salvate ? JSON.parse(salvate) : [];
});

useEffect(() => {
  localStorage.setItem('armi', JSON.stringify(armi));
}, [armi]);

useEffect(() => {
  localStorage.setItem('nome', JSON.stringify(nome));
}, [nome]);

useEffect(() => {
  localStorage.setItem('magie', JSON.stringify(magie));
}, [magie]);

useEffect(() => {
  localStorage.setItem('karma', JSON.stringify(karma));
}, [karma]);

useEffect(() => {
  localStorage.setItem('protezioni', JSON.stringify(protezioni));
}, [protezioni]);

useEffect(() => {
  localStorage.setItem('monete', JSON.stringify(monete));
}, [monete]);

useEffect(() => {
  localStorage.setItem('armatura', JSON.stringify(armatura));
}, [armatura]);

useEffect(() => {
  localStorage.setItem('vita', JSON.stringify(vita));
}, [vita]);

useEffect(() => {
  localStorage.setItem('missioniInCorso', JSON.stringify(missioniInCorso));
}, [missioniInCorso]);

  
  const aggiungiMagia = () => {
    if (magiaInput.trim() !== '') {
      setMagie([...magie, magiaInput.trim()]);
      setMagiaInput('');
    }
  };

  const rimuoviMagia = (index) => {
    setMagie(magie.filter((_, i) => i !== index));
  };

  const aggiungiArma = () => {
    if (armaInput.trim() !== '') {
      setArmi([...armi, armaInput.trim()]);
      setArmaInput('');
    }
  };

  const rimuoviArma = (index) => {
    setArmi(armi.filter((_, i) => i !== index));
  };


  return (
    <div className="personaggi-container">
      <h1>  <input
    type="text"
    value={nome}
    onChange={(e) => setNome(e.target.value)}
    placeholder="Nome del personaggio"
    className="nome-input"
  /></h1>
      <div className="scheda-personaggio">
<div className="missione-corrente">
  <p><strong>Missioni in corso:</strong></p>

  <ul>
    {missioniInCorso.map((missione, i) => (
      <li key={i}>
        🧭 {missione}{' '}
        <button onClick={() => {
          const nuove = [...missioniInCorso];
          nuove.splice(i, 1);
          setMissioniInCorso(nuove);
        }}>✖</button>
      </li>
    ))}
  </ul>

  <div className="input-wrapper">
    <input
      type="text"
      value={missioneInput}
      onChange={(e) => setMissioneInput(e.target.value)}
      placeholder="Aggiungi una missione"
    />
    <button onClick={() => {
      if (missioneInput.trim()) {
        setMissioniInCorso([...missioniInCorso, missioneInput.trim()]);
        setMissioneInput('');
      }
    }}>Aggiungi</button>
  </div>
</div>

        <Stat label="Vita" value={vita} setValue={setVita} />
        <Stat label="Armatura" value={armatura} setValue={setArmatura} />
        <Lista
  label="Magie possedute"
  tipo="magia"
  elementi={magie}
  input={magiaInput}
  setInput={setMagiaInput}
  aggiungi={aggiungiMagia}
  rimuovi={rimuoviMagia}
/>

<Lista
  label="Armi equipaggiate"
  tipo="arma"
  elementi={armi}
  input={armaInput}
  setInput={setArmaInput}
  aggiungi={aggiungiArma}
  rimuovi={rimuoviArma}
/>
        <Stat label="Monete" value={monete} setValue={setMonete} />
        <Stat label="Protezioni" value={protezioni} setValue={setProtezioni} />
        <Stat label="Karma" value={karma} setValue={setKarma} max={6} render={true} />
      </div>
    </div>
  );
}

// 🔢 Componente per le statistiche numeriche
function Stat({ label, value, setValue, max = null, render = false }) {
  const incrementa = () => setValue(prev => (max ? Math.min(prev + 1, max) : prev + 1));
  const decrementa = () => setValue(prev => Math.max(prev - 1, 0));

  return (
    <p>
      <strong>{label}:</strong>{' '}
      <button onClick={decrementa}>−</button>{' '}
      {render ? renderKarma(value) : value}{' '}
      <button onClick={incrementa}>+</button>
    </p>
  );
}

// 📜 Componente per le liste modificabili
function Lista({ label, tipo, elementi, input, setInput, aggiungi, rimuovi }) {
  const icona = tipo === 'magia' ? '🪄' : '🗡️';

  return (
    <>
      <p><strong>{label}:</strong></p>
      <ul>
        {elementi.map((item, i) => (
          <li key={i}>
            {icona} {item} <button onClick={() => rimuovi(i)}>✖</button>
          </li>
        ))}
      </ul>
      <div className="input-wrapper">
        <span className="icon">{icona}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Aggiungi ${tipo}`}
        />
        <button onClick={aggiungi}>Aggiungi</button>
      </div>
    </>
  );
}




// ⭐ Visualizzazione karma con stelle
function renderKarma(livello) {
  return '⭐'.repeat(livello) + '☆'.repeat(6 - livello);
}

export default Personaggi;
