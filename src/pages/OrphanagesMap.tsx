import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import Leaflet from 'leaflet';
import {
  Map,
  Popup,
  Marker,
  TileLayer,
} from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
});

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
      <Map
        center={[-21.6141084, -48.3591068]}
        zoom={14}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/> */}

        <Marker
          position={[-21.6141084, -48.3591068]}
          icon={mapIcon}
        >
          <Popup
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className="map-popup"
          >
            Lar das meninas
            <Link to="/orphanages/1">
              <FiArrowRight size={20} color="#fff" />
            </Link>
          </Popup>
        </Marker>
      </Map>
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={26} color="rgba(0, 0, 0, 0.6)" />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
