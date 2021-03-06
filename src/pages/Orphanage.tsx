import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import api from '../services/api';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';

import '../styles/pages/orphanage.css';

interface Image {
  id: number;
  url: string;
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<Image>;
}

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const { id } = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  useEffect(() => {
    const loadOrphanages = async () => {
      try {
        const { data } = await api.get<Orphanage>(`orphanages/${id}`);
        setOrphanage(data);
      } catch (err) {
        console.log(err);
      }
    };
    loadOrphanages();
  }, [id]);
  if (!orphanage) {
    return <p>Loading...</p>;
  }
  return (
    <div id="page-orphanage">
      <Sidebar />
      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />
          <div className="images">
            {orphanage.images.map((image, index) => (
              <button
                key={image.id}
                className={index === activeImageIndex ? 'active' : ''}
                type="button"
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={image.url} alt={orphanage.name} />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  View directions on Google Maps
                 </a>
              </footer>
            </div>

            <hr />

            <h2>Visiting instructions</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Week days <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends
                ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Open<br />on weekend
                  </div>
                ) : (
                  <div className="dont-open-on-weekends">
                    <FiInfo size={32} color="#ff669d" />
                    Closed<br />on weekend
                  </div>
                )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Contact us
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}