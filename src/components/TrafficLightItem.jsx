import cn from 'classnames';
import '../styles/app.css';

const TrafficLightItem = ({data, onSelect}) =>{
const activeClass = data.mode === 'on' ? 'status_active' : '';
  return (
  <li className='item'  onClick={() => onSelect(data)}>
    <div className='item__header'>
      <span className={cn(`status ${activeClass}`)} />
      <span>{data.name}</span>
    </div>
    <span>{data.address}</span>
    <span>{`Статус: ${data.mode === 'on' ? 'Активен' : 'Неактивен'}`}</span>
  </li>
)}
export default TrafficLightItem;