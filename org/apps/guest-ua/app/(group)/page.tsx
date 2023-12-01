'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMapGL, {
  Source,
  Layer,
  ViewStateChangeEvent,
  MapLayerMouseEvent,
  MapRef,
  Marker,
  GeolocateControl,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  clusterCountLayer,
  clusterLayer,
  nonClusteredPlannedPointLayer,
  nonClusteredReportedPointSymbolLayer,
  nonclusteredReportedPointLayer,
  nonclusteredUnplannedPointLayer,
} from '../../mapgl/layers';
import { MAP_DEFAULT_VIEW_PORT } from '../../mapgl/viewPort';
import { ACCESS_TOKEN, MAP_STYLE } from '../../constants/mapbox_key';
import { useGetAllAds } from '@business-layer/business-logic/lib/ads';
import ScreenLoader from '@presentational/atoms/ScreenLoader';
import CustomImage from '@presentational/atoms/CustomImage';

import DetailAdsPoint from '@presentational/molecules/DetailAdsPoint';
import 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

type locationType =
  | {
    lat: number;
    lon: number;
  }
  | undefined;

function Home() {
  const adsData = useGetAllAds();
  const mapRef = useRef<MapRef>(null);
  const [isShowCluster, setIsShowCluster] = useState<boolean>(true);
  const [isClickAdsPoint, setIsClickAdsPoint] = useState<boolean>(false);


  const [cursor, setCursor] = useState('pointer');
  const [currentLocation, setCurrentLocation] =
    useState<locationType>(undefined);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const latitude = position.coords.latitude;
  //       const longitude = position.coords.longitude;
  //       console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  //     });
  //   } else {
  //     console.log('Geolocation is not supported by this browser.');
  //   }
  // }, []);

  useEffect(() => {
    if (
      currentLocation &&
      currentLocation.lat &&
      currentLocation.lon &&
      mapRef.current
    ) {
      mapRef.current.flyTo({
        zoom: 14,
        center: [currentLocation.lon, currentLocation.lat],
        duration: 1500,
      });
    }
  }, [currentLocation]);

  const handleZoom = useCallback(
    (e: ViewStateChangeEvent) => {
      if (e.viewState.zoom < 10 && isShowCluster === true) {
        setIsShowCluster(false);
      } else if (e.viewState.zoom > 10 && isShowCluster === false) {
        setIsShowCluster(true);
      }
    },
    [isShowCluster]
  );

  const handleClick = useCallback((event: MapLayerMouseEvent) => {
    if (!mapRef.current) return;

    //Check the point is cluster?
    const features = mapRef.current.queryRenderedFeatures(event.point, {
      layers: ['clusters'],
    });
    const cluster = features.find((f) => f.layer.id === 'clusters');
    if (cluster && cluster.geometry.type === 'Point') {
      const [long, lat] = cluster.geometry.coordinates;
      mapRef.current.flyTo({ zoom: 16, center: [long, lat], duration: 1500 });
      return;
    }

    //Check the point is ads point
    const featuresAllPoint = mapRef.current.queryRenderedFeatures(event.point);
    const adsPoint = featuresAllPoint.find((f) => f.layer.id === 'unclustered-point-planned' || f.layer.id === 'unclustered-point-unplanned');
    if (adsPoint && adsPoint.geometry.type === 'Point') {
      const [long, lat] = adsPoint.geometry.coordinates;
      setIsClickAdsPoint(true);
      setCurrentLocation({
        lat: lat,
        lon: long,
      });
      return;
    }
    else
      setIsClickAdsPoint(false);

  }, []);


  const handleMouseDown = useCallback((event: MapLayerMouseEvent) => {
    setCursor('grabbing');
  }, []);
  const handleMouseUp = useCallback((event: MapLayerMouseEvent) => {
    setCursor('pointer');
  }, []);
  return (
    <ReactMapGL
      mapboxAccessToken={ACCESS_TOKEN}
      initialViewState={MAP_DEFAULT_VIEW_PORT}
      onZoom={handleZoom}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      dragRotate={false}
      minZoom={10}
      maxZoom={18}
      // maxBounds={[
      //   [106.317521, 10.321631], // Tọa độ góc dưới cùng bên trái của hình chữ nhật giới hạn
      //   [107.042629, 11.210448], // Tọa độ góc trên cùng bên phải của hình chữ nhật giới hạn
      // ]}
      ref={mapRef}
      cursor={cursor}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle={MAP_STYLE}
    >
      {!Array.isArray(adsData) ? (
        <ScreenLoader />
      ) : isShowCluster ? (
        <Source
          id="earthquakes"
          type="geojson"
          data={{
            type: 'FeatureCollection',
            features: adsData.map((m) => ({
              type: 'Feature',
              properties: {
                cluster: false,
                name: m.address,
                planned: m.planned,
                reported: false,
              },
              geometry: {
                type: 'Point',
                coordinates: [m.longitude, m.latitude],
              },
            })),
          }}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={40}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...nonClusteredPlannedPointLayer} />
          <Layer {...nonclusteredUnplannedPointLayer} />
          <Layer {...nonclusteredReportedPointLayer} />
          <Layer {...nonClusteredReportedPointSymbolLayer} />
        </Source>
      ) : (
        <></>
      )}

      {currentLocation ? (
        <Marker latitude={currentLocation.lat} longitude={currentLocation.lon}>
          <CustomImage
            src="/assets/location.png"
            alt="location"
            width="30px"
            height="30px"
          />
        </Marker>
      ) : (
        <></>
      )}

      {isClickAdsPoint ? (
        <DetailAdsPoint />
      )
        :
        <></>}

      <ScaleControl
        position="bottom-left"
        maxWidth={200}
        style={{
          marginBottom: '2rem',
        }}
      />
      <FullscreenControl position="bottom-right" />
      <NavigationControl position="bottom-right" />
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        showAccuracyCircle={false}
        showUserLocation={false}
        showUserHeading={false}
        position="bottom-right"
        onGeolocate={(e) => {
          setCurrentLocation({
            lat: e.coords.latitude,
            lon: e.coords.longitude,
          });
        }}
      />

    </ReactMapGL>
  );
}

export default Home;
