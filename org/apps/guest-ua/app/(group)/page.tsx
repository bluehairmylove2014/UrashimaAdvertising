'use client';
import * as React from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const markers = [
  { name: 'Marker 1', long: 106.683647, lat: 10.76128 },
  { name: 'Marker 2', long: 106.682065, lat: 10.764336 },
  { name: 'Marker 3', long: 106.683283, lat: 10.763916 },
  { name: 'Marker 4', long: 106.681723, lat: 10.761895 },
  { name: 'Marker 5', long: 106.683989, lat: 10.762989 },
  { name: 'Marker 6', long: 106.681847, lat: 10.761417 },
  { name: 'Marker 7', long: 106.682841, lat: 10.764096 },
  { name: 'Marker 8', long: 106.683524, lat: 10.762573 },
  { name: 'Marker 9', long: 106.681276, lat: 10.762123 },
  { name: 'Marker 10', long: 106.682372, lat: 10.761654 },
];

function Home() {
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''}
      initialViewState={{
        longitude: 106.682448,
        latitude: 10.762538,
        zoom: 14,
      }}
      // style={{ width: '90vw', height: '100vh' }}
      mapStyle="mapbox://styles/phucdat4102/clpco840w00aj01qtffav2yef"
    >
      {Array.isArray(markers) ? (
        markers.map((m) => (
          <>
            <Marker longitude={m.long} latitude={m.lat} anchor="bottom">
              <div className=" w-4 h-4 bg-blue-500 rounded-full"></div>
            </Marker>
          </>
        ))
      ) : (
        <></>
      )}
    </Map>
  );
}
export default Home;
