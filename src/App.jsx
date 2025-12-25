import { useState } from 'react';
import MapView from './components/MapView';
import TrafficLightList from './components/TrafficLightList';
import trafficLights from './data/tlo-list-mock.json';

function App() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState({
    name: '',
    address: '',
  });
  const [modes, setModes] = useState(['off', 'on']);

  const filteredLights = trafficLights.filter(item =>
    (search.name === '' || (item.name ?? '').toLowerCase().includes(search.name.toLowerCase())) &&
    (search.address === '' || (item.address ?? '').toLowerCase().includes(search.address.toLowerCase())) &&
    modes.includes(item.mode)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch(prev => ({ ...prev, [name]: value }))
  };

  const handleCheck = (data) => {
    setModes(prev =>
      prev.includes(data)
        ? prev.filter(item => item !== data)
        : [...prev, data]
    );
  };
  const onSelect = (item) => {
    setSelected(item);
  };
  return (
    <section className="main">
      <MapView items={filteredLights} selected={selected} />
      <div>
        <div className="controls">
          <div className="controls__header">
            <h1 className="controls__title">Светофорные объекты</h1>
          </div>

          <div className="filters filter__group">
            <div className="filter__group">
              <input
                type="text"
                className="filter__input"
                placeholder="Поиск по номеру"
                name="name"
                value={search.name ?? ''}
                onChange={(e) => handleInputChange(e)}
              />
              <input
                type="text"
                className="filter__input"
                placeholder="Поиск по адресу"
                name="address"
                value={search.address ?? ''}
                onChange={(e) => handleInputChange(e)}
              />
            </div>

            <div className="filter__group">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" checked={modes.includes('on')} onChange={() => handleCheck('on')} />
                  <span className="checkbox-text">Активные</span>
                </label>

                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" checked={modes.includes('off')} onChange={() => handleCheck('off')} />
                  <span className="checkbox-text">Неактивные</span>
                </label>
              </div>
            <button className="sort" disabled>Сортировать по номеру (по возрастанию)</button>
          </div>

          
        </div>
        <TrafficLightList items={filteredLights} onSelect={onSelect} />
      </div>
    </section>
  );
}

export default App;
