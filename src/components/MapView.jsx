import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import '../styles/app.css';

const getMarkerIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const FocusOnSelected = ({ selected }) => {
  const map = useMap();

  useEffect(() => {
    if (selected) {
      map.closePopup();
      map.setView(
        [selected.coords[0], selected.coords[1]],
        20,
        { animate: true }
      );
    }
  }, [selected, map]);

  return null;
};

const MapView = ({ items, selected, onSelect }) => (
  <MapContainer
    center={[55.75, 37.61]}
    zoom={12}
    style={{ height: '94vh', width: '80%' }}
  >
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    <FocusOnSelected selected={selected} />

    {items.map(item => (
      <Marker
        key={item.id}
        position={[item.coords[0], item.coords[1]]}
        icon={getMarkerIcon(item.mode === 'on' ? 'green' : 'grey')}
      >
        <Popup>
          <div className='popup'>
            <div className="item__header">
              <span>{item.name}</span>
            </div>
            <span>{item.address}</span>
            <span>{`Статус: ${item.mode === 'on' ? 'Активен' : 'Неактивен'}`}</span>
          </div>
        </Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default MapView;
