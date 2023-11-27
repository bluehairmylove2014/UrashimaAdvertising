'use client';
import { useCallback, useRef, useState } from 'react';
import ReactMapGL, {
  Source,
  Layer,
  ViewStateChangeEvent,
  MapLayerMouseEvent,
  MapRef,
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
import { useGetAllAds } from '@business-layer/business-logic/lib/ads/process/hooks';
import ScreenLoader from '@presentational/atoms/ScreenLoader';

function Home() {
  const adsData = useGetAllAds();
  const mapRef = useRef<MapRef>(null);
  const [isShowCluster, setIsShowCluster] = useState<boolean>(true);
  const [cursor, setCursor] = useState('pointer');
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
    const features = mapRef.current.queryRenderedFeatures(event.point, {
      layers: ['clusters'],
    });
    const feature = features.find((f) => f.layer.id === 'clusters');
    if (feature && feature.geometry.type === 'Point') {
      const [long, lat] = feature.geometry.coordinates;
      mapRef.current.flyTo({ zoom: 16, center: [long, lat], duration: 1500 });
    }
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
      maxBounds={[
        [106.317521, 10.321631], // Tọa độ góc dưới cùng bên trái của hình chữ nhật giới hạn
        [107.042629, 11.210448], // Tọa độ góc trên cùng bên phải của hình chữ nhật giới hạn
      ]}
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
                reported: true,
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
    </ReactMapGL>
  );
}

export default Home;
