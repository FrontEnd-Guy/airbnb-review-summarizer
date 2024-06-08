import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
  Autocomplete,
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

function MapComponent() {
  const { lat, lng } = useSelector((state) => state.summary.currentSummary);

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');
  const [destination, setDestination] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [modalOpen, setModalOpen] = useState(false);
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
        return;
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
        travelMode: window.google.maps.TravelMode[travelMode],
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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} libraries={libraries}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}>
        {!isNaN(numericLat) && !isNaN(numericLng) && <Marker position={center} />}
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
          <button onClick={openModal}>Add Destination</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <h3>Distance: {distance}</h3>
            <h3>Duration: {duration}</h3>
          </div>
        </div>
      </GoogleMap>

      {modalOpen && (
        <div className="commutes-modal-container" onClick={closeModal}>
          <div
            className="commutes-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-edit-heading"
            onClick={(e) => e.stopPropagation()}>
            <div className="content">
              <h2 id="add-edit-heading" className="heading">
                Add destination
              </h2>
              <form id="destination-form">
                <Autocomplete
                  onLoad={(ref) => (autocompleteRef.current = ref)}
                  onPlaceChanged={onPlaceChanged}
                  options={{
                    bounds: {
                      north: numericLat + 0.1,
                      south: numericLat - 0.1,
                      east: numericLng + 0.1,
                      west: numericLng - 0.1,
                    },
                    fields: ['place_id', 'geometry', 'name'],
                  }}>
                  <input
                    type="text"
                    id="destination-address-input"
                    name="destination-address"
                    placeholder="Enter a place or address"
                    autoComplete="off"
                    required
                  />
                </Autocomplete>
                <div className="travel-modes">
                  <input
                    type="radio"
                    name="travel-mode"
                    id="driving-mode"
                    value="DRIVING"
                    checked={travelMode === 'DRIVING'}
                    onChange={() => setTravelMode('DRIVING')}
                  />
                  <label htmlFor="driving-mode" className="left-label" title="Driving travel mode">
                    <svg aria-label="Driving icon">
                      <use href="#commutes-driving-icon" />
                    </svg>
                  </label>
                  <input
                    type="radio"
                    name="travel-mode"
                    id="transit-mode"
                    value="TRANSIT"
                    checked={travelMode === 'TRANSIT'}
                    onChange={() => setTravelMode('TRANSIT')}
                  />
                  <label htmlFor="transit-mode" title="Public transit travel mode">
                    <svg aria-label="Public transit icon">
                      <use href="#commutes-transit-icon" />
                    </svg>
                  </label>
                  <input
                    type="radio"
                    name="travel-mode"
                    id="bicycling-mode"
                    value="BICYCLING"
                    checked={travelMode === 'BICYCLING'}
                    onChange={() => setTravelMode('BICYCLING')}
                  />
                  <label htmlFor="bicycling-mode" title="Bicycling travel mode">
                    <svg aria-label="Bicycling icon">
                      <use href="#commutes-bicycling-icon" />
                    </svg>
                  </label>
                  <input
                    type="radio"
                    name="travel-mode"
                    id="walking-mode"
                    value="WALKING"
                    checked={travelMode === 'WALKING'}
                    onChange={() => setTravelMode('WALKING')}
                  />
                  <label htmlFor="walking-mode" className="right-label" title="Walking travel mode">
                    <svg aria-label="Walking icon">
                      <use href="#commutes-walking-icon" />
                    </svg>
                  </label>
                </div>
              </form>
              <div className="modal-action-bar">
                <button className="cancel-button" type="reset" onClick={closeModal}>
                  Cancel
                </button>
                <button
                  className="add-destination-button"
                  type="button"
                  onClick={() => {
                    calculateRoute();
                    closeModal();
                  }}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </LoadScript>
  );
}

export default React.memo(MapComponent);
