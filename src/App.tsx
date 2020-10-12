import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

import './styles/global.css';
import './styles/pages/landing.css';

import logoImg from './images/logo.svg';

function App() {
  return (
    <div className="App" id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy" />

        <main>
          <h1>Bring happiness to the world</h1>
          <p>visit orphanages and change many children's day.</p>
        </main>

        <div className="location">
          <strong>Matão</strong>
          <span>São Paulo - SP</span>
        </div>

        <a href="" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </a>
      </div>
    </div>
  );
}

export default App;
