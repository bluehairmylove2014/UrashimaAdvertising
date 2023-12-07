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
  Popup,
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
import DetaiLoader from '@presentational/atoms/DetailLoader';
import CustomImage from '@presentational/atoms/CustomImage';

import ReportForm, {
  reportAdditionDataType,
  reportTargetType,
} from '@presentational/molecules/ReportForm';
import { SearchBox } from '@mapbox/search-js-react';

import { IAds, IAdsDetail } from '@business-layer/services/entities/ads';
import InfoAdsPoint from '@presentational/molecules/InfoAdsPoint';
import DetailAds from '@presentational/molecules/DetailAds';
import DetailAdsPoint from '@presentational/molecules/DetailAdsPoint';

import ReportHistory from '@presentational/molecules/ReportHistory';
import ReportDetail from '@presentational/molecules/ReportDetail';

import 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useGetReportForm } from '@business-layer/business-logic/lib/reportForm';
import {
  useGetAdReports,
  useGetLocationReports,
} from '@business-layer/business-logic/lib/report';

type locationType =
  | {
      lat: number;
      lon: number;
    }
  | undefined;

type markerParamsType =
  | {
      latitude: number;
      longitude: number;
    }
  | undefined;
function Home() {
  const adsData = useGetAllAds();
  const mapRef = useRef<MapRef>(null);
  const [isShowCluster, setIsShowCluster] = useState<boolean>(true);

  const [isClickAdsPoint, setIsClickAdsPoint] = useState<boolean>(false);
  const [isActiveAdsBoard, setIsActiveAdsBoard] = useState<boolean>(false);
  const [idAdsBoard, setIdAdsBoard] = useState(-1);

  const [infoClickAdsPoint, setInfoClickAdsPoint] = useState<IAdsDetail>();
  const [idAdsPointClick, setIdAdsPointClick] = useState(-1);

  //Create state for getting id advertisement point
  const [idAdsPoint, setIdAdsPoint] = useState(-1);
  //Create state for getting info advertisement point
  const [infoHoverAdsPoint, setInfoHoverAdsPoint] = useState<IAds>();
  //Create state for getting position mouse previous
  const [posPrevMouse, setPosPrevMouse] = useState<locationType>(undefined);

  const [cursor, setCursor] = useState('pointer');
  const { onGetAdDetail, isLoading } = useGetAdDetail();
  const [currentLocation, setCurrentLocation] =
    useState<locationType>(undefined);
  const [searchKey, setSearchKey] = useState<string>('');
  const [marker, setMarker] = useState<markerParamsType>(undefined);

  const locationReportList = useGetLocationReports();

  // Report controller
  const { isReportFormActive, reportTarget, reportAdditionData } =
    useGetReportForm();

  useEffect(() => {
    if (idAdsPoint > -1) {
      if (!infoClickAdsPoint && isClickAdsPoint)
        setInfoHoverAdsPoint(undefined);
      else setInfoHoverAdsPoint(adsData?.find((ads) => ads.id === idAdsPoint));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAdsPoint]);

  useEffect(() => {
    if (idAdsPointClick > -1) {
      onGetAdDetail(idAdsPointClick)
        .then((data) => {
          setInfoClickAdsPoint(data);
        })
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAdsPointClick]);

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

    setIsActiveAdsBoard(false);

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
    const adsPoint = featuresAllPoint.find(
      (f) =>
        f.layer.id === 'unclustered-point-planned' ||
        f.layer.id === 'unclustered-point-unplanned'
    );
    if (adsPoint && adsPoint.geometry.type === 'Point') {
      const [long, lat] = adsPoint.geometry.coordinates;
      setIdAdsPointClick(adsPoint.properties?.id);
      setIsClickAdsPoint(true);
      setCurrentLocation({
        lat: lat,
        lon: long,
      });
      setInfoHoverAdsPoint(undefined);
    } else {
      setIdAdsPointClick(-1);
      setIsClickAdsPoint(false);
    }
    return;
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
    const adsPoint = features.find(
      (f) =>
        f.layer.id === 'unclustered-point-planned' ||
        f.layer.id === 'unclustered-point-unplanned'
    );
    if (!adsPoint) {
      setInfoHoverAdsPoint(undefined);
      setIdAdsPoint(-1);
    }
    if (adsPoint && adsPoint.geometry.type === 'Point') {
      const [long, lat] = adsPoint.geometry.coordinates;

      if (
        posPrevMouse &&
        posPrevMouse.lon === Math.abs(long) &&
        posPrevMouse.lat === lat
      ) {
        return;
      }

      setIdAdsPoint(adsPoint.properties?.id);
      setPosPrevMouse({
        lat: lat,
        lon: long,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="relative w-screen h-screen">
      <div className="relative z-0">
        <ReactMapGL
          mapboxAccessToken={ACCESS_TOKEN}
          initialViewState={MAP_DEFAULT_VIEW_PORT}
          onZoom={handleZoom}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          dragRotate={false}
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
          <div className=" w-1/2 m-4">
            <SearchBox
              marker={true}
              accessToken={ACCESS_TOKEN}
              placeholder="Tìm kiếm ở đây..."
              value={searchKey}
              onChange={(value) => {
                setSearchKey(value);
              }}
              onRetrieve={(retrieve) => {
                const coord = retrieve?.features[0]?.geometry?.coordinates;
                if (Array.isArray(coord)) {
                  setMarker({ longitude: coord[0], latitude: coord[1] });
                  mapRef.current &&
                    mapRef.current.flyTo({
                      zoom: 14,
                      center: {
                        lng: coord[0],
                        lat: coord[1],
                      },
                      duration: 5000,
                    });
                }
              }}
            />

            {marker ? (
              <Marker {...marker}>
                <CustomImage
                  src="/assets/placeholder.png"
                  alt="placeholder"
                  width="40px"
                  height="40px"
                />
              </Marker>
            ) : (
              <></>
            )}
          </div>

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
                    reported: locationReportList
                      ? locationReportList.findIndex(
                          (lr) =>
                            lr.latitude === m.latitude &&
                            lr.longitude === m.longitude
                        ) !== -1
                      : false,
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

          {infoHoverAdsPoint ? (
            <Popup
              longitude={infoHoverAdsPoint.longitude}
              latitude={infoHoverAdsPoint.latitude}
              closeButton={false}
              closeOnClick={false}
              maxWidth="50vh"
            >
              <InfoAdsPoint
                info={infoHoverAdsPoint}
                onClick={(id) => {
                  setIsActiveAdsBoard(false);
                  setIdAdsPointClick(id);
                  setIsClickAdsPoint(true);
                  setInfoHoverAdsPoint(undefined);
                }}
              />
            </Popup>
          ) : (
            <></>
          )}

          {/* Check Loading Ads Point*/}

          {isClickAdsPoint ? (
            infoClickAdsPoint ? (
              <DetailAdsPoint
                detailAdsPoint={infoClickAdsPoint}
                onClick={(id) => {
                  setIdAdsBoard(id);
                  setIsActiveAdsBoard(true);
                  setIsClickAdsPoint(false);
                }}
              />
            ) : (
              <></>
            )
          ) : (
            <></>
          )}

          {isActiveAdsBoard ? (
            infoClickAdsPoint ? (
              <DetailAds
                adsPoint={infoClickAdsPoint}
                id={idAdsBoard}
              ></DetailAds>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}

          {/* <ReportHistory /> */}
          {/* <ReportDetail /> */}

          {isLoading ? <DetaiLoader /> : <></>}

          {currentLocation ? (
            <Marker
              latitude={currentLocation.lat}
              longitude={currentLocation.lon}
            >
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
      </div>
      <ReportForm
        isActive={isReportFormActive}
        reportTarget={reportTarget}
        reportAdditionData={reportAdditionData}
      />
    </div>
  );
}

export default Home;
