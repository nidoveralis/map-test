import TrafficLightItem from "./TrafficLightItem";
import '../styles/app.css';

const TrafficLightList = ({ items, onSelect }) => {
  return (
    <ul className='list'>
      {items.map((item) => (
        <TrafficLightItem key={item.id} data={item} onSelect={onSelect}/>
      ))}
    </ul>)
}

export default TrafficLightList;