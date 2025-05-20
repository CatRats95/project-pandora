import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dadi = [4, 6, 8, 12, 20];

function Combattimento() {
  const [modalita, setModalita] = useState(null);
  const [avversario, setAvversario] = useState(null);
  const [impostaHP, setImpostaHP] = useState(false);
  const [hpIniziali, setHpIniziali] = useState({ g1: 30, g2: 30 });
  const [giocatore1, setGiocatore1] = useState({ hp: 30, turno: true });
  const [giocatore2, setGiocatore2] = useState({ hp: 30, turno: false });
  const [dadoSelezionato, setDadoSelezionato] = useState(6);
  const [cpuDadoSelezionato, setCpuDadoSelezionato] = useState(6);
  const [danno, setDanno] = useState(null);
  const [messaggio, setMessaggio] = useState("");
  const [tipoAzione, setTipoAzione] = useState(null);

  const isGiocoFinito = giocatore1.hp <= 0 || giocatore2.hp <= 0;
  const vincitore = giocatore1.hp <= 0 ? "Giocatore 2 vince!" : giocatore2.hp <= 0 ? "Giocatore 1 vince!" : "";

  const getAvversarioImg = () => {
    const base = `${process.env.PUBLIC_URL}/img/`;
    switch (avversario) {
      case "drago": return base + "drago.png";
      case "pirata": return base + "pirata.png";
      case "zombie": return base + "zombie.png";
      default: return base + "zombie.png";
    }
  };

  const reset = () => {
    setModalita(null);
    setAvversario(null);
    setImpostaHP(false);
    setHpIniziali({ g1: 30, g2: 30 });
    setGiocatore1({ hp: 30, turno: true });
    setGiocatore2({ hp: 30, turno: false });
    setDanno(null);
    setMessaggio("");
  };

  const lanciaDado = useCallback((lati) => Math.floor(Math.random() * lati) + 1, []);

  const infliggiDanno = useCallback((valore) => {
    if (giocatore1.turno) {
      setGiocatore2((p) => ({ ...p, hp: Math.max(p.hp - valore, 0) }));
    } else {
      setGiocatore1((p) => ({ ...p, hp: Math.max(p.hp - valore, 0) }));
    }
  }, [giocatore1.turno]);

  const cura = useCallback((valore) => {
    if (giocatore1.turno) {
      setGiocatore1((p) => ({ ...p, hp: p.hp + valore }));
    } else {
      setGiocatore2((p) => ({ ...p, hp: p.hp + valore }));
    }
  }, [giocatore1.turno]);

  const passaTurno = () => {
    setGiocatore1((p) => ({ ...p, turno: !p.turno }));
    setGiocatore2((p) => ({ ...p, turno: !p.turno }));
  };

  const eseguiAzione = useCallback((tipo) => {
    if (isGiocoFinito) return;
    setTipoAzione(tipo);
    const attaccante = giocatore1.turno ? "Giocatore 1" : "Giocatore 2";
    const dado = giocatore1.turno ? dadoSelezionato : cpuDadoSelezionato;
    let valore = 0;

    if (tipo === "attacco") {
      valore = lanciaDado(dado);
      setMessaggio(`${attaccante} attacca con d${dado} → ${valore} danni`);
      infliggiDanno(valore);
    } else if (tipo === "cura") {
      valore = lanciaDado(dado);
      setMessaggio(`${attaccante} si cura di ${valore}`);
      cura(valore);
    } else if (tipo === "magia") {
      valore = lanciaDado(dado) + 2;
      setMessaggio(`${attaccante} lancia una magia! → ${valore} danni`);
      infliggiDanno(valore);
    }

    setDanno(valore);
  }, [giocatore1.turno, dadoSelezionato, cpuDadoSelezionato, lanciaDado, infliggiDanno, cura, isGiocoFinito]);

  if (!modalita && !impostaHP) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h2>Scegli la modalità di combattimento</h2>
        <button onClick={() => { setModalita("cpu"); setImpostaHP(true); }}>🧠 Giocatore vs Mostro</button>
        <button onClick={() => { setModalita("pvp"); setImpostaHP(true); }}>👥 Giocatore vs Giocatore</button>
      </div>
    );
  }

  if (modalita && !avversario) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h2>Scegli l'avversario</h2>
        <button onClick={() => setAvversario("drago")}>🐉 Drago</button>
        <button onClick={() => setAvversario("pirata")}>🏴‍☠️ Pirata</button>
        <button onClick={() => setAvversario("zombie")}>🧟 Zombie</button>
      </div>
    );
  }

  if (impostaHP && avversario) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h2>Imposta Punti Vita Iniziali</h2>
        <div style={{ marginBottom: 20 }}>
          <label>Giocatore 1: </label>
          <input type="number" value={hpIniziali.g1} onChange={(e) => setHpIniziali({ ...hpIniziali, g1: parseInt(e.target.value) })} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Avversario: </label>
          <input type="number" value={hpIniziali.g2} onChange={(e) => setHpIniziali({ ...hpIniziali, g2: parseInt(e.target.value) })} />
        </div>
        <button onClick={() => {
          setGiocatore1({ hp: hpIniziali.g1, turno: true });
          setGiocatore2({ hp: hpIniziali.g2, turno: false });
          setImpostaHP(false);
        }}>
          Inizia il Duello
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h2>Combattimento ({modalita === "cpu" ? "Giocatore vs Mostro" : "PvP"})</h2>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 80, marginBottom: 30 }}>
        <motion.div
          key={Math.random()}
          animate={{ x: giocatore1.turno && tipoAzione === "attacco" ? [0, -30, 0] : 0 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: "center" }}
        >
          <img src={`${process.env.PUBLIC_URL}/img/combattente.png`} alt="Combattente" style={{ height: 150, border: "2px solid #444", borderRadius: "8px" }} />
          <div><strong>Giocatore 1</strong></div>
          <div>❤️ {giocatore1.hp}</div>
        </motion.div>

        <motion.div
          key={Math.random()}
          animate={{ x: !giocatore1.turno && tipoAzione === "attacco" ? [0, 30, 0] : 0 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: "center" }}
        >
          <img src={getAvversarioImg()} alt="Avversario" style={{ height: 150, border: "2px solid #444", borderRadius: "8px" }} />
          <div><strong>{modalita === "cpu" ? "Mostro" : "Giocatore 2"}</strong></div>
          <div>❤️ {giocatore2.hp}</div>
        </motion.div>
      </div>

      <div style={{ marginBottom: 10, minHeight: 30 }}>{messaggio}</div>

      <AnimatePresence>
        {danno !== null && (
          <motion.div
            key={tipoAzione + Math.random()}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -30, scale: 1.2 }}
            exit={{ opacity: 0, y: -60 }}
            style={{ fontSize: "28px", color: tipoAzione === "cura" ? "lime" : "red", fontWeight: "bold", marginBottom: 20 }}
          >
            {tipoAzione === "cura" ? "+" : "-"}{danno}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginBottom: 15 }}>
        <span>Scegli il dado: </span>
        {dadi.map((d) => (
          <button key={d} onClick={() => setDadoSelezionato(d)} style={{ margin: "0 5px", padding: "5px 10px", backgroundColor: dadoSelezionato === d ? "#ffd700" : "transparent", color: "#000", border: "1px solid #aaa", borderRadius: "6px", cursor: "pointer" }}>
            d{d}
          </button>
        ))}
      </div>

      {!isGiocoFinito && (
        <div style={{ marginBottom: 30 }}>
          {giocatore1.turno ? (
            <>
              <button onClick={() => eseguiAzione("attacco")}>🗡️ Attacco</button>
              <button onClick={() => eseguiAzione("magia")}>🔮 Magia</button>
              <button onClick={() => eseguiAzione("cura")}>💊 Cura</button>
              <br /><br />
              <button onClick={passaTurno}>➡️ Passa Turno</button>
            </>
          ) : modalita === "cpu" ? (
            <>
              <h4>🎯 CPU: scegli dado</h4>
              {dadi.map((d) => (
                <button key={d} onClick={() => setCpuDadoSelezionato(d)} style={{ margin: "0 5px", padding: "5px 10px", backgroundColor: cpuDadoSelezionato === d ? "#90ee90" : "transparent", color: "#000", border: "1px solid #aaa", borderRadius: "6px", cursor: "pointer" }}>
                  d{d}
                </button>
              ))}
              <br /><br />
              <button onClick={() => eseguiAzione("attacco")}>🤖 CPU Attacca</button>
              <button onClick={() => eseguiAzione("magia")}>🔮 CPU Magia</button>
              <button onClick={() => eseguiAzione("cura")}>💊 CPU Cura</button>
              <br /><br />
              <button onClick={passaTurno}>➡️ Passa Turno</button>
            </>
          ) : (
            <>
              <button onClick={() => eseguiAzione("attacco")}>🗡️ Attacco</button>
              <button onClick={() => eseguiAzione("magia")}>🔮 Magia</button>
              <button onClick={() => eseguiAzione("cura")}>💊 Cura</button>
              <br /><br />
              <button onClick={passaTurno}>➡️ Passa Turno</button>
            </>
          )}
        </div>
      )}

      {isGiocoFinito && (
        <>
          <h3 style={{ color: "gold" }}>{vincitore}</h3>
          <button onClick={reset}>🔄 Ricomincia</button>
        </>
      )}
    </div>
  );
}

export default Combattimento;