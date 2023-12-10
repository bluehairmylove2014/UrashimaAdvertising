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
import DetailLoader from '@presentational/atoms/DetailLoader';
import CustomImage from '@presentational/atoms/CustomImage';

import ReportForm from '@presentational/molecules/ReportForm';
import { SearchBox } from '@mapbox/search-js-react';

import { IAds, IAdsDetail } from '@business-layer/services/entities/ads';
import InfoAdsPoint from '@presentational/molecules/InfoAdsPoint';
import DetailAds from '@presentational/molecules/DetailAds';
import DetailAdsPoint from '@presentational/molecules/DetailAdsPoint';

import 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useGetReportForm } from '@business-layer/business-logic/lib/reportForm';
import { useGetLocationReports } from '@business-layer/business-logic/lib/report';
import { useGetLocationDetail } from '@business-layer/business-logic/lib/geocode';
import { useNotification } from '@presentational/atoms/Notification';

import LocationDetail from '@presentational/molecules/LocationDetail';
import { ILocation } from '@business-layer/services/entities';

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
  const { showError } = useNotification();
  const adsData = useGetAllAds();
  const mapRef = useRef<MapRef>(null);
  const [isShowCluster, setIsShowCluster] = useState<boolean>(true);

  const [isActiveAdsBoard, setIsActiveAdsBoard] = useState<boolean>(false);
  const [idAdsBoard, setIdAdsBoard] = useState(-1);

  const [isClickAdsPoint, setIsClickAdsPoint] = useState<boolean>(false);
  const [infoClickAdsPoint, setInfoClickAdsPoint] = useState<IAdsDetail>();
  const [idAdsPointClick, setIdAdsPointClick] = useState(-1);

  //Create state for getting id advertisement point
  const [idAdsPoint, setIdAdsPoint] = useState(-1);
  //Create state for getting info advertisement point
  const [infoHoverAdsPoint, setInfoHoverAdsPoint] = useState<IAds>();
  //Create state for getting position mouse previous
  const [posPrevMouse, setPosPrevMouse] = useState<locationType>(undefined);

  //Create state for checking ads is reported
  const [isReported, setIsReported] = useState(false);
  const [isClickReported, setIsClickReported] = useState(false);


  const [cursor, setCursor] = useState('pointer');
  const { onGetAdDetail, isLoading } = useGetAdDetail();
  const [currentLocation, setCurrentLocation] =
    useState<locationType>(undefined);
  const [searchKey, setSearchKey] = useState<string>('');
  const [marker, setMarker] = useState<markerParamsType>(undefined);
  const [userLocationMarker, setUserLocationMarker] =
    useState<markerParamsType>(undefined);
  const [userClickMarker, setUserClickMarker] =
    useState<markerParamsType>(undefined);
  const [locationOnClickDetail, setLocationOnClickDetail] = useState<
    ILocation | undefined
  >(undefined);
  const [isLocationOnClickPopupActive, setIsLocationOnClickPopupActive] =
    useState<boolean>(false);

  const locationReportList = useGetLocationReports();
  const { onGetLocationDetail } = useGetLocationDetail();

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
      setUserLocationMarker({
        latitude: currentLocation.lat,
        longitude: currentLocation.lon,
      });
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
    setIsClickAdsPoint(false);

    //Check the point is cluster? Move and zoom
    const features = mapRef.current.queryRenderedFeatures(event.point, {
      layers: ['clusters'],
    });
    if (features[0] && features[0].geometry.type === 'Point') {
      setIsLocationOnClickPopupActive(false);
      const [long, lat] = features[0].geometry.coordinates;
      mapRef.current.flyTo({ zoom: 16, center: [long, lat], duration: 1500 });
      return;
    }

    //Click ads point
    const featuresAllPoint = mapRef.current.queryRenderedFeatures(event.point, {
      layers: [
        'unclustered-point-planned',
        'unclustered-point-unplanned',
        'unclustered-point-reported',
      ],
    });
    if (featuresAllPoint[0] && featuresAllPoint[0].geometry.type === 'Point') {
      //Check ADS Point is reported
      if (featuresAllPoint[0].layer.id === 'unclustered-point-reported')
        setIsClickReported(true)
      else
        setIsClickReported(false)

      mapRef.current.flyTo({
        zoom: 14,
        center: [event.lngLat.lng, event.lngLat.lat],
        duration: 1500,
      });

      setIsLocationOnClickPopupActive(false);
      setIdAdsPointClick(featuresAllPoint[0].properties?.id);
      setIsClickAdsPoint(true);

      setInfoHoverAdsPoint(undefined);
      return;
    } else {
      setIdAdsPointClick(-1);
      setIsClickAdsPoint(false);
    }

    // Click to normal location
    const { lng, lat } = event.lngLat;
    setUserClickMarker({
      latitude: lat,
      longitude: lng,
    });
    setIsLocationOnClickPopupActive(true);
    onGetLocationDetail({ latitude: lat, longitude: lng })
      .then((data) => {
        setLocationOnClickDetail(data);
      })
      .catch((error) => {
        showError('Lỗi lấy dữ liệu địa điểm');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    //Handle hover ads point
    const adsPoint = features.find(
      (f) =>
        f.layer.id === 'unclustered-point-planned' ||
        f.layer.id === 'unclustered-point-unplanned' ||
        f.layer.id === 'unclustered-point-reported'
    );

    if (!adsPoint) {
      setInfoHoverAdsPoint(undefined);
      setIdAdsPoint(-1);
    }
    if (adsPoint && adsPoint.geometry.type === 'Point') {
      //Check ADS Point is reported
      if (adsPoint.layer.id === 'unclustered-point-reported')
        setIsReported(true)
      else
        setIsReported(false)

      const [long, lat] = adsPoint.geometry.coordinates;

      if (
        posPrevMouse &&
        event.lngLat.lng < posPrevMouse.lon + 5 &&
        event.lngLat.lng > posPrevMouse.lon - 5
      ) {
        if (
          event.lngLat.lat < posPrevMouse.lat + 5 &&
          event.lngLat.lng > posPrevMouse.lat - 5
        )
          return;
      }

      setIdAdsPoint(adsPoint.properties?.id);
      setPosPrevMouse({
        lat: lat,
        lon: long,
      });

      return;
    }

    //Handle hover ads report point
    const adsReportPoint = features.find(
      (f) =>
        f.layer.id === 'non-clustered-reported-point-symbol' ||
        f.layer.id === 'unclustered-point-reported'
    );
    if (!adsReportPoint) {

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
          </div>
          {marker ? (
            <Marker {...marker}>
              <CustomImage
                src="/assets/placeholder.png"
                alt="placeholder"
                width="30px"
                height="30px"
              />
            </Marker>
          ) : (
            <></>
          )}
          {userLocationMarker ? (
            <Marker {...userLocationMarker}>
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
          {userClickMarker ? (
            <Marker {...userClickMarker}>
              <CustomImage
                src="/assets/gps.png"
                alt="location"
                width="20px"
                height="20px"
              />
            </Marker>
          ) : (
            <></>
          )}

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
                isReported={isReported}
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
                isReported={isClickReported}
                onClick={(id) => {
                  setIdAdsBoard(id);
                  setIsActiveAdsBoard(true);
                }}
                handleClose={() => {
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
                handleClose={() => {
                  setIsActiveAdsBoard(false)
                  setIsClickAdsPoint(false)
                }}
                handleBack={() => {
                  setIsActiveAdsBoard(false)
                }}
              ></DetailAds>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}

          {/* <ReportHistory /> */}
          {/* <ReportDetail /> */}

          {isLoading ? <DetailLoader /> : <></>}

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
      <LocationDetail
        locationData={locationOnClickDetail}
        isActive={isLocationOnClickPopupActive}
        handleClose={() => {
          setIsLocationOnClickPopupActive(false);
          setUserClickMarker(undefined);
        }}
      />
      <ReportForm
        isActive={isReportFormActive}
        reportTarget={reportTarget}
        reportAdditionData={reportAdditionData}
      />
    </div >
  );
}

export default Home;
