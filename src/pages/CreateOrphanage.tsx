import React, {
  useState,
  useCallback,
  FormEvent,
  ChangeEvent,
} from "react";
import { useHistory } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from "leaflet";

import api from "../services/api";
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';

import '../styles/pages/create-orphanage.css';

export default function CreateOrphanage() {
  const history = useHistory();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat: latitude, lng: longitude } = event.latlng;
    setPosition({ latitude, longitude });
  }, []);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) {
      return;
    }
    const selected = Array.from(files);
    setImages(selected);
    setPreviewImages(selected.map(image => (
      URL.createObjectURL(image)
    )));
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { latitude, longitude } = position;
    const data = new FormData();
    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      data.append('images', image);
    });

    try {
      await api.post('orphanages', data);

      alert('Cadastro realizado com sucesso!');

      history.push('/app');
    } catch (err) {
      console.log(data, err);

    }
  };

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form
          onSubmit={handleSubmit}
          className="create-orphanage-form"
        >
          <fieldset>
            <legend>Data</legend>

            <Map
              center={[-21.6141084, -48.3591068]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {(position.latitude !== 0 && position.longitude !== 0) && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[
                    position.latitude,
                    position.longitude,
                  ]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Name *</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">About * <span>Maximum 300 characters</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={e => setAbout(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Photos *</label>

              <div className="images-container">
                {previewImages.map(image => (
                  <img key={image} src={image} alt={name} />
                ))}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple type="file" id="image[]" onChange={handleSelectImages} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitation</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instructions *</label>
              <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Opening hours *</label>
              <input id="opening_hours" value={opening_hours} onChange={e => setOpeningHours(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Open on weekend</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenWeekends(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenWeekends(false)}
                >
                  No
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirm
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
