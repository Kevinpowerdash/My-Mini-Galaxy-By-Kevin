import React, { useState, useEffect } from 'react';
import './App.css';
import Estrella from './Estrella';
import logo from './logo.svg';

function App() {
  const [estrellas, setEstrellas] = useState([]);
  const [mostrarTexto, setMostrarTexto] = useState(false);
  const [destelloVisible, setDestelloVisible] = useState(false);
  const [mostrarInicio, setMostrarInicio] = useState(true);

  useEffect(() => {
    // Después de 3 segundos, quita la clase de entrada para mostrar la página
    const timeout = setTimeout(() => {
      setMostrarInicio(false);
    }, 999999999);

    // Limpia el timeout al desmontar el componente
    return () => clearTimeout(timeout);
  }, []);

  const mostrarTextoCosmico = () => {
    setMostrarTexto(true);
    setTimeout(() => {
      setMostrarTexto(false);
    }, 5000);
  };

  const agregarEstrella = () => {
    const colores = ['white', 'blue', 'yellow', 'orange', 'red'];
    const nuevaEstrella = {
      left: `${Math.random() * (window.innerWidth - 50)}px`,
      top: `${Math.random() * (window.innerHeight - 50)}px`,
      color: colores[Math.floor(Math.random() * colores.length)],
    };

    setEstrellas([...estrellas, nuevaEstrella]);
    setMostrarTexto(false);
    setDestelloVisible(true);

    setTimeout(() => {
      setDestelloVisible(false);
    }, 500);
  };

  const explotarEstrellas = () => {
    const estrellasExplotando = estrellas.map((estrella) => ({ ...estrella, explotando: true }));
    setEstrellas(estrellasExplotando);

    setTimeout(() => {
      setEstrellas([]);
    }, 1000);
  };

  const mostrarCaritaFelizDetallada = () => {
    const caritaFelizDetallada = [
      { left: '150px', top: '180px', color: 'white' },
      { left: '250px', top: '180px', color: 'white' },
      { left: '200px', top: '215px', color: 'white' },
      { left: '170px', top: '250px', color: 'white' },
      { left: '200px', top: '260px', color: 'white' },
      { left: '230px', top: '250px', color: 'white' },
    ];

    setEstrellas(caritaFelizDetallada);
  };

  const handleKeyDown = (event) => {
    if (event.key.toLowerCase() === 'ñ' && event.getModifierState('Alt')) {
      mostrarTextoCosmico();
    } else if (event.key.toLowerCase() === 'x' && event.getModifierState('Alt')) {
      explotarEstrellas();
    } else if (event.key.toLowerCase() === 'k' && event.getModifierState('Alt')) {
      mostrarCaritaFelizDetallada();
    }
  };

  return (
    <div className={`App ${mostrarInicio ? 'App-entrada' : ''}`} onKeyDown={handleKeyDown} tabIndex={0}>
      {mostrarInicio && (
        <div className="App-fondo-negro">
          <div className="titulo-container">
            <h1 className={`titulo-juego titulo-juego-especial`}>My Mini-Galaxy</h1>
          </div>
          <button className="boton-inicio" onClick={() => setMostrarInicio(false)}>
            Start
          </button>
        </div>
      )}

      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{ fontFamily: 'Comic Sans MS', fontSize: '20px', color: '#FFD700', marginBottom: '45px', padding: '10px' }}>
        ¡Da Click En El Boton Y Crea Una Nueva Estrella! ^-^
        </p>
        <div className="container">
          <div className="instructions-icon">
            <span>?</span>
            <div className="tooltip">¡Presiona Alt + X para explotar las estrellas!</div>
          </div>
        </div>

        <button
          className={`boton ${destelloVisible ? 'destello-activo' : ''}`}
          onClick={() => {
            agregarEstrella();
          }}
          style={{ lineHeight: '1.5' }}
        >
          Agregar Estrella
          <span className="destello"></span>
        </button>
        {mostrarTexto && (
          <div style={{ fontSize: '24px', marginTop: '20px', fontFamily: 'Comic Sans MS', color: '#B0E0E6', paddingTop: '2px' }}>
            El Profesor Sebastian Es El Mejor!
          </div>
        )}
      </div>
      {estrellas.map((estrella, index) => (
        <Estrella key={index} {...estrella} />
      ))}
    </div>
  );
}

export default App;
