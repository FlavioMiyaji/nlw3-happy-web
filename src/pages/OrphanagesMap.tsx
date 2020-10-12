import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import '../styles/pages/orphanages-map.css';

import mapMarkerImg from '../images/map-marker.svg';

const OrphanagesMap = () => {
    return (
        <div id="page-orphanages-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy " />
                    <h2>Choose an orphanage on the map</h2>
                    <p>So many children are waiting for a visit.</p>
                </header>
                <footer>
                    <strong>Matão</strong>
                    <span>São Paulo - SP</span>
                </footer>
            </aside>
            <div className="content-wrapper">
                <h1>Orphanages Map</h1>
            </div>
            <Link to="" className="create-orphanage">
                <FiPlus size={26} color="rgba(0, 0, 0, 0.6)" />
            </Link>
        </div>
    );
};

export default OrphanagesMap;
