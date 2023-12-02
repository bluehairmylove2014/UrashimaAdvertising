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
  Popup
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
import {
  useGetAdDetail,
  useGetAllAds,
} from '@business-layer/business-logic/lib/ads';
import ScreenLoader from '@presentational/atoms/ScreenLoader';
import CustomImage from '@presentational/atoms/CustomImage';

import { IAdsDetail } from '@business-layer/services/entities/ads'
import InfoAdsPoint from '@presentational/molecules/InfoAdsPoint'

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

  //Create state for getting id advertisement point
  const [idAdsPoint, setIdAdsPoint] = useState(-1);
  //Create state for getting info advertisement point
  const [infoHoverAdsPoint, setInfoHoverAdsPoint] = useState<IAdsDetail>();
  //Create state for getting position Advertisement Point
  const [posAdsHover, setPosAdsHover] = useState<locationType>(undefined);

  const [cursor, setCursor] = useState('pointer');
  const [currentLocation, setCurrentLocation] = useState<locationType>(undefined);
  const { onGetAdDetail, isLoading } = useGetAdDetail();

  useEffect(() => {
    if (idAdsPoint > -1) {
      onGetAdDetail(idAdsPoint)
        .then((data) => {
          setInfoHoverAdsPoint(data)
        })
        .catch((error) => console.log(error));
    }
  }, [idAdsPoint]);

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

  //Catch click mouse event
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

  //Catch Mouse Down
  const handleMouseDown = useCallback((event: MapLayerMouseEvent) => {
    setCursor('grabbing');
  }, []);

  //Catch Mouse Up
  const handleMouseUp = useCallback((event: MapLayerMouseEvent) => {
    setCursor('pointer');
  }, []);

  //Catch Mouse Move
  const handleMouseMove = useCallback((event: MapLayerMouseEvent) => {
    if (!mapRef.current) return;

    const features = mapRef.current.queryRenderedFeatures(event.point);
    const adsPoint = features.find((f) => f.layer.id === 'unclustered-point-planned' || f.layer.id === 'unclustered-point-unplanned');
    if (!adsPoint) {
      setInfoHoverAdsPoint(undefined)
      setIdAdsPoint(-1);
    }
    if (adsPoint && adsPoint.geometry.type === 'Point') {
      const [long, lat] = adsPoint.geometry.coordinates
      setIdAdsPoint(adsPoint.properties?.id)
      setPosAdsHover({
        lat: lat,
        lon: long,
      });
    }

  }, []);
  return (
    <ReactMapGL
      mapboxAccessToken={ACCESS_TOKEN}
      initialViewState={MAP_DEFAULT_VIEW_PORT}
      onZoom={handleZoom}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
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
                id: m.id,
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

      {/* Check Loading Ads Point*/}
      {isLoading ?
        (
          // Loading success
          <> {posAdsHover ?
            <Popup
              longitude={posAdsHover.lon}
              latitude={posAdsHover.lat}
              closeButton={false}
              closeOnClick={false}
              maxWidth='45vh'>

              <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>

            </Popup> : <></>}
          </>)
        :
        (
          // Loading Fail
          <> {infoHoverAdsPoint ?
            <Popup
              longitude={infoHoverAdsPoint.longitude}
              latitude={infoHoverAdsPoint.latitude}
              closeButton={false}
              closeOnClick={false}
              maxWidth='50vh'>
              <InfoAdsPoint info={infoHoverAdsPoint} />
            </Popup> : <></>}
          </>)
      }

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
