import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dadi = [4, 6, 8, 12, 20];

function Combattimento() {
  const [modalita, setModalita] = useState(null);
  const [giocatore1, setGiocatore1] = useState({ hp: 30, turno: true });
  const [giocatore2, setGiocatore2] = useState({ hp: 30, turno: false });
  const [dadoSelezionato, setDadoSelezionato] = useState(6);
  const [danno, setDanno] = useState(null);
  const [messaggio, setMessaggio] = useState("");
  const [tipoAzione, setTipoAzione] = useState(null);

  const reset = () => {
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
    setTipoAzione(tipo);
    const attaccante = giocatore1.turno ? "Giocatore 1" : "Giocatore 2";
    let valore = 0;

    if (tipo === "attacco") {
      valore = lanciaDado(dadoSelezionato);
      setMessaggio(`${attaccante} attacca con d${dadoSelezionato} → ${valore} danni`);
      infliggiDanno(valore);
    } else if (tipo === "cura") {
      valore = lanciaDado(dadoSelezionato);
      setMessaggio(`${attaccante} si cura di ${valore}`);
      cura(valore);
    } else if (tipo === "magia") {
      valore = lanciaDado(dadoSelezionato) + 2;
      setMessaggio(`${attaccante} lancia una magia! → ${valore} danni`);
      infliggiDanno(valore);
    }

    setDanno(valore);
    setTimeout(() => {
      setDanno(null);
      passaTurno();
    }, 1200);
  }, [giocatore1.turno, dadoSelezionato, lanciaDado, infliggiDanno, cura]);

  useEffect(() => {
    if (modalita === "cpu" && !giocatore1.turno && giocatore2.hp > 0) {
      setTimeout(() => {
        let scelta = "attacco";
        if (giocatore2.hp <= 10 && Math.random() < 0.5) scelta = "cura";
        else if (giocatore2.hp <= 8 && Math.random() < 0.5) scelta = "magia";
        eseguiAzione(scelta);
      }, 1000);
    }
  }, [giocatore1.turno, giocatore2.hp, modalita, eseguiAzione]);

  const isGiocoFinito = giocatore1.hp <= 0 || giocatore2.hp <= 0;
  const vincitore =
    giocatore1.hp <= 0 ? "Giocatore 2 vince!" : giocatore2.hp <= 0 ? "Giocatore 1 vince!" : "";

  if (!modalita) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h2>Scegli la modalità di combattimento</h2>
        <button onClick={() => setModalita("cpu")}>🧠 Giocatore vs Mostro</button>
        <button onClick={() => setModalita("pvp")}>👥 Giocatore vs Giocatore</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h2>Combattimento ({modalita === "cpu" ? "Giocatore vs Mostro" : "PvP"})</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 30 }}>
        <div>
          <strong>Giocatore 1</strong>
          <div>❤️ {giocatore1.hp}</div>
        </div>
        <div>
          <strong>{modalita === "cpu" ? "Mostro" : "Giocatore 2"}</strong>
          <div>❤️ {giocatore2.hp}</div>
        </div>
      </div>

      <div style={{ marginBottom: 10, minHeight: 30 }}>{messaggio}</div>

      <AnimatePresence>
        {danno !== null && (
          <motion.div
            key={tipoAzione}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -30, scale: 1.2 }}
            exit={{ opacity: 0, y: -60 }}
            style={{
              fontSize: "28px",
              color: tipoAzione === "cura" ? "lime" : "red",
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            {tipoAzione === "cura" ? "+" : "-"}{danno}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginBottom: 15 }}>
        <span>Scegli il dado: </span>
        {dadi.map((d) => (
          <button
            key={d}
            onClick={() => setDadoSelezionato(d)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: dadoSelezionato === d ? "#ffd700" : "transparent",
              color: "#000",
              border: "1px solid #aaa",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            d{d}
          </button>
        ))}
      </div>

      {!isGiocoFinito && (
        <div style={{ marginBottom: 30 }}>
          <button onClick={() => eseguiAzione("attacco")}>🗡️ Attacco</button>
          <button onClick={() => eseguiAzione("magia")}>🔮 Magia</button>
          <button onClick={() => eseguiAzione("cura")}>💊 Cura</button>
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