import { useState, useEffect, useRef } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUtensils, faHeart, faBed, faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Tamagotchi.css';


library.add(faUtensils, faHeart, faBed, faGamepad);

const ONE_SECOND = 1000;

export function Tamagotchi() {
  const [estaVivo, setEstaVivo] = useState(true); // Agregamos estado para saber si la mascota está viva
  const [muertoPor, setMuertoPor] = useState("");
  const [hunger, setHunger] = useState(50);
  const [happiness, setHappiness] = useState(15);
  const [health, setHealth] = useState(100);
  const timer = useRef();

  useEffect(() => {
    timer.current = setInterval(() => {
      setHappiness((prevHappiness) => prevHappiness - 1);
      setHealth((prevHealth) => prevHealth - 1);
      setHunger((prevHunger) => prevHunger - 1);
    }, ONE_SECOND);
    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => {
    const checkIfDead = () => {
      if (hunger <= 0) {
        setEstaVivo(false); // Cambiamos el estado de estaVivo a false
        setMuertoPor("hambre");
        clearInterval(timer.current);
      } else if (health <= 0) {
        setEstaVivo(false); // Cambiamos el estado de estaVivo a false
        setMuertoPor("enfermedad");
        clearInterval(timer.current);
      } else if (happiness <= 0) {
        setEstaVivo(false); // Cambiamos el estado de estaVivo a false
        setMuertoPor("tristeza");
        clearInterval(timer.current);
      }
    };
    const interval = setInterval(checkIfDead, ONE_SECOND);
    return () => clearInterval(interval);
  }, [hunger, happiness, health]);

  const feed = () => {
    setHunger((prevHunger) => prevHunger + 20);
    setHealth((prevHealth) => prevHealth + 5);
    setHappiness((prevHappiness) => prevHappiness + 5);
  };

  const play = () => {
    setHappiness((prevHappiness) => prevHappiness + 20);
    setHunger((prevHunger) => prevHunger - 5);
    setHealth((prevHealth) => prevHealth - 5);
  };

  const sleep = () => {
    setHunger(hunger - 5);
    setHappiness(happiness - 5);
    setHealth(health + 10);
  };

  const getProgressColor = (value) => {
    if (value > 60) return "#00C853";
    if (value > 20) return "#FFB300";
    return "#B71C1C";
  };
  return (
    <div className="Tamagotchi">
      <h1>Tamagotchi by Eloi Pellin</h1>
      {muertoPor && <h2>¡Oh no! Tu Tamagotchi ha muerto por {muertoPor}.</h2>}
      {!muertoPor && (
        <div>
          <div className="stat">
            <label>Hambre:</label>
            <div
              className="value"
              style={{
                width: hunger + "%",
                backgroundColor: getProgressColor(hunger),
              }}
            />
          </div>

          <div className="stat">
            <label>Felicidad:</label>
            <div
              className="value"
              style={{
                width: happiness + "%",
                backgroundColor: getProgressColor(happiness),
              }}
            />
          </div>

          <div className="stat">
            <label>Salud:</label>
            <div
              className="value"
              style={{
                width: health + "%",
                backgroundColor: getProgressColor(health),
              }}
            />
          </div>

          <div className="actions">
            <button onClick={feed}>
              <FontAwesomeIcon icon={faUtensils} />
              Alimentar
            </button>
            <button onClick={play}>
              <FontAwesomeIcon icon={faGamepad} />
              Jugar
            </button>
            <button onClick={sleep}>
              <FontAwesomeIcon icon={faBed} />
              Dormir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}