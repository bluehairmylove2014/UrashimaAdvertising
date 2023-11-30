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

type locationType =
  | {
    lat: number;
    lon: number;
  }
  | undefined;

interface AdsPoint {
  hinhThuc: string,
  phanLoat: string,
  diaChi: string,
  daQuyHoach: boolean,
  long: number,
  lat: number
}

function Home() {
  const adsData = useGetAllAds();
  const mapRef = useRef<MapRef>(null);

  const [isShowCluster, setIsShowCluster] = useState<boolean>(true);

  //Create state for checking if the cursor is pointing to an advertisement point or not
  const [isAdsPoint, setIsAdsPoint] = useState<boolean>(false);

  //Create state for saving information advertisement point 
  const [infoHoverAdsPoint, setInfoHoverAdsPoint] = useState<IAdsPoint>();

  const [cursor, setCursor] = useState('pointer');
  const [currentLocation, setCurrentLocation] =
    useState<locationType>(undefined);
  const { onGetAdDetail, isLoading } = useGetAdDetail();

  useEffect(() => {
    onGetAdDetail(13)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

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

    const features = mapRef.current.queryRenderedFeatures(event.point);

    const feature = features.find((f) => f.layer.id === 'clusters');
    if (feature && feature.geometry.type === 'Point') {
      const [long, lat] = feature.geometry.coordinates;
      mapRef.current.flyTo({ zoom: 16, center: [long, lat], duration: 1500 });
      return;
    }

    //Find clicked Point is advertisement point
    const unclusteredPoint = features.find((f) => f.layer.id === 'unclustered-point');
    if (unclusteredPoint && unclusteredPoint.geometry.type === 'Point') {
      const [long, lat] = unclusteredPoint.geometry.coordinates;
      mapRef.current.flyTo({ zoom: 16, center: [long, lat], duration: 1500 });
      setIsAdsPoint(true);
    }
    else
      setIsAdsPoint(false);
  }, []);

  //Catch Mouse Douwn
  const handleMouseDown = useCallback((event: MapLayerMouseEvent) => {
    setCursor('grabbing');
  }, []);

  //Catch Mouse Up
  const handleMouseUp = useCallback((event: MapLayerMouseEvent) => {
    setCursor('pointer');
  }, []);


  //Bắt sự kiện chuột di chuyển đến các điểm quảng cáo
  const handleMouseMove = useCallback((event: MapLayerMouseEvent) => {
    if (!mapRef.current) return;

    const features = mapRef.current.queryRenderedFeatures(event.point);

    const unclusteredPoint = features.find((f) => f.layer.id === 'unclustered-point');
    let [long, lat] = [0, 0]
    if (unclusteredPoint && unclusteredPoint.geometry.type === 'Point') {
      [long, lat] = [event.point.x, event.point.y];
    }

    if (!unclusteredPoint) {
      setInfoHoverAdsPoint(undefined);
    }
    else {
      setInfoHoverAdsPoint({
        id: 1,
        adsForm: 'Cổ phần chính trị',
        locationType: 'Đất công/Công viên/Hành lang an toàn giao thông',
        address: 'Đồng Khởi - Nguyễn Huệ (Sở Văn hóa và Thể thao), Phường Bến Nghé, Quận 1',
        planned: true,
        longtitude: long,
        latitude: lat
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
