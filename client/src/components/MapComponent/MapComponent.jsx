import React, { useState, useEffect, useRef } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const libraries = ['places'];

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

function MapComponent({ lat, lng }) {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');
  const [destination, setDestination] = useState(null);
  const destinationRef = useRef(null);
  const autocompleteRef = useRef(null);

  const numericLat = parseFloat(lat);
  const numericLng = parseFloat(lng);

  const center = { lat: numericLat, lng: numericLng };

  useEffect(() => {
    if (map && !isNaN(numericLat) && !isNaN(numericLng)) {
      map.setOptions({
        center: { lat: numericLat, lng: numericLng },
        zoom: 14,
      });
    }
  }, [numericLat, numericLng, map]);

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (!place || !place.geometry || !place.geometry.location) {
        return; // Do nothing if place is not valid
      }
      setDestination(place.geometry.location);
    }
  };

  async function calculateRoute() {
    if (!destination) {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    try {
      const results = await directionsService.route({
        origin: center,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
      setError('');
    } catch (error) {
      console.error(`Error fetching directions ${error}`);
      setError('Unable to find a route. Please try a different destination.');
      setDirectionsResponse(null);
      setDistance('');
      setDuration('');
    }
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} libraries={libraries}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}>
        {numericLat && numericLng && <Marker position={center} visible={true} />}
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 1,
          }}>
          <Autocomplete
            onLoad={(ref) => (autocompleteRef.current = ref)}
            onPlaceChanged={onPlaceChanged}
            bounds={{
              north: numericLat + 0.1,
              south: numericLat - 0.1,
              east: numericLng + 0.1,
              west: numericLng - 0.1,
            }}>
            <input type="text" placeholder="Destination" ref={destinationRef} />
          </Autocomplete>
          <button onClick={calculateRoute}>Calculate Route</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <h3>Distance: {distance}</h3>
            <h3>Duration: {duration}</h3>
          </div>
        </div>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapComponent);
