import React from 'react'
import { MapContainer, TileLayer, Marker , Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import './map.css'
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import PlaceIcon from '@mui/icons-material/Place';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: new URL(iconUrl, import.meta.url).href,
  iconRetinaUrl: new URL(iconRetinaUrl, import.meta.url).href,
  shadowUrl: new URL(shadowUrl, import.meta.url).href,
});

const Map = ({point1,point2,origin,dest}) => {

  return (
    <div className='map'>
        <MapContainer center={point1} zoom={5} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <Marker position={point1} >
          <Popup>{origin}</Popup>
      
        </Marker>
        <Marker position={point2} >
          <Popup >{dest}</Popup>
        </Marker>
        <Polyline positions={[point1, point2]} color="blue" />
      </MapContainer>
      </div>
    
  );
}

export default Map