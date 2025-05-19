import React, { useState } from 'react';

const personaggi = [
  { id: 1, nome: 'Eroe', vita: 30 },
  { id: 2, nome: 'Mago', vita: 20 }
];

const mostri = [
  { id: 1, nome: 'Goblin', vita: 15 },
  { id: 2, nome: 'Drago', vita: 50 }
];

const dadiDisponibili = [4, 6, 8, 12, 20];

const Combattimento = () => {
  const [personaggio, setPersonaggio] = useState(null);
  const [mostro, setMostro] = useState(null);
  const [vitaPersonaggio, setVitaPersonaggio] = useState(null);
  const [vitaMostro, setVitaMostro] = useState(null);
  const [log, setLog] = useState([]);
  const [turnoGiocatore, setTurnoGiocatore] = useState(true);
  const [fine, setFine] = useState(false);
  const [dadoSelezionato, setDadoSelezionato] = useState(6);

  const selezionaPersonaggio = (id) => {
    const p = personaggi.find(p => p.id === parseInt(id));
    setPersonaggio(p);
    setVitaPersonaggio(p.vita);
    resetCombattimento();
  };

  const selezionaMostro = (id) => {
    const m = mostri.find(m => m.id === parseInt(id));
    setMostro(m);
    setVitaMostro(m.vita);
    resetCombattimento();
  };

  const resetCombattimento = () => {
    setLog([]);
    setFine(false);
    setTurnoGiocatore(true);
  };

  const lanciaDado = (lati) => Math.floor(Math.random() * lati) + 1;

  const eseguiTurno = () => {
    if (fine || !personaggio || !mostro) return;

    if (turnoGiocatore) {
      const danno = lanciaDado(dadoSelezionato);
      const nuovaVitaMostro = Math.max(vitaMostro - danno, 0);
      const nuovoLog = [`🧙 ${personaggio.nome} tira d${dadoSelezionato} → ${danno} danni a ${mostro.nome}`];

      if (nuovaVitaMostro === 0) {
        nuovoLog.push(`🏆 ${personaggio.nome} ha sconfitto il ${mostro.nome}!`);
        setFine(true);
      }

      setVitaMostro(nuovaVitaMostro);
      setLog(prev => [...prev, ...nuovoLog]);
      setTurnoGiocatore(false);
    } else {
      const dadoMostro = dadiDisponibili[Math.floor(Math.random() * dadiDisponibili.length)];
      const danno = lanciaDado(dadoMostro);
      const nuovaVitaPersonaggio = Math.max(vitaPersonaggio - danno, 0);
      const nuovoLog = [`👹 ${mostro.nome} tira d${dadoMostro} → ${danno} danni a ${personaggio.nome}`];

      if (nuovaVitaPersonaggio === 0) {
        nuovoLog.push(`☠️ ${personaggio.nome} è stato sconfitto dal ${mostro.nome}...`);
        setFine(true);
      }

      setVitaPersonaggio(nuovaVitaPersonaggio);
      setLog(prev => [...prev, ...nuovoLog]);
      setTurnoGiocatore(true);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">⚔️ Duello a Turni</h2>

      <div className="flex gap-4 mb-4">
        <div>
          <label>Personaggio:</label><br />
          <select onChange={e => selezionaPersonaggio(e.target.value)}>
            <option value="">-- Seleziona --</option>
            {personaggi.map(p => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>
          {personaggio && <div>❤️ Vita: {vitaPersonaggio}</div>}
        </div>

        <div>
          <label>Mostro:</label><br />
          <select onChange={e => selezionaMostro(e.target.value)}>
            <option value="">-- Seleziona --</option>
            {mostri.map(m => (
              <option key={m.id} value={m.id}>{m.nome}</option>
            ))}
          </select>
          {mostro && <div>❤️ Vita: {vitaMostro}</div>}
        </div>

        <div>
          <label>Dado da usare:</label><br />
          <select onChange={e => setDadoSelezionato(parseInt(e.target.value))} value={dadoSelezionato}>
            {dadiDisponibili.map(d => (
              <option key={d} value={d}>d{d}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={eseguiTurno}
        disabled={!personaggio || !mostro || fine}
      >
        {turnoGiocatore ? 'Attacca!' : 'Turno del Mostro'}
      </button>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Log del combattimento:</h3>
        <ul className="bg-gray-100 p-2 rounded max-h-64 overflow-y-auto">
          {log.map((entry, index) => (
            <li key={index} className="mb-1">{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Combattimento;
