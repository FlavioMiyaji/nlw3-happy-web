import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import {
  Map,
  Popup,
  Marker,
  TileLayer,
} from 'react-leaflet';

import api from '../services/api';
import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';

import '../styles/pages/orphanages-map.css';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap = () => {
  const [orphanages, setOrphanages] = useState([] as Orphanage[]);
  useEffect(() => {
    const loadOrphanages = async () => {
      try {
        const { data } = await
          api.get<Orphanage[]>('orphanages');
        setOrphanages(data);
      } catch (err) {
        console.log(err);
      }
    };
    loadOrphanages();
  }, []);

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

        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            position={[orphanage.latitude, orphanage.longitude]}
            icon={mapIcon}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={26} color="rgba(0, 0, 0, 0.6)" />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
