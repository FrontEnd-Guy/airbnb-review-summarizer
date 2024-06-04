import React from 'react';
import { useLoadScript } from '@react-google-maps/api';

const MapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries: ['places'],
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <div>MapComponent</div>;
};

export default MapComponent;
