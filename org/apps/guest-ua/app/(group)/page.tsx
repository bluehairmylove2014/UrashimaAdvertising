'use client';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
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
  nonclusteredReportedAdsBoardLayer,
  nonclusteredReportedPointLayer,
  nonclusteredReportedUnknownPointLayer,
  nonclusteredUnplannedPointLayer,
} from '../../mapgl/layers';
import { MAP_DEFAULT_VIEW_PORT } from '../../mapgl/viewPort';
import { ACCESS_TOKEN, MAP_STYLE } from '../../constants/mapbox_key';
import {
  useFetchAllAds,
  useGetAdDetail,
} from '@business-layer/business-logic/lib/ads';
import ScreenLoader from '@presentational/atoms/ScreenLoader';
import DetailLoader from '@presentational/atoms/DetailLoader';
import CustomImage from '@presentational/atoms/CustomImage';

import ReportForm from '@presentational/molecules/ReportForm';

import {
  IAdLocation,
  IAdLocationDetail,
} from '@business-layer/services/entities/ads';
import InfoAdsPoint from '@presentational/molecules/InfoAdsPoint';
import DetailAds from '@presentational/molecules/DetailAds';
import DetailAdsPoint from '@presentational/molecules/DetailAdsPoint';

import 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useGetReportForm } from '@business-layer/business-logic/non-service-lib/reportForm';
import {
  useGetLocationReports,
  useGetAdReports,
} from '@business-layer/business-logic/lib/report';
import { useGetLocationDetail } from '@business-layer/business-logic/lib/geocode';
import { useNotification } from '@presentational/atoms/Notification';

import LocationDetail from '@presentational/molecules/LocationDetail';
import { ILocation } from '@business-layer/services/entities';
import ReportHistory from '@presentational/molecules/ReportHistory';
import CustomSearchBox from '@presentational/atoms/CustomSearchBox';
import ReportDetailAdsBoard from '@presentational/molecules/ReportDetailAdsBoard';
import ReportDetailPoint from '@presentational/molecules/ReportDetailPoint';

import { IAdReport, ILocationReport } from '@business-layer/services/entities';

import { FeatureCollection, Point } from 'geojson';

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
function Home(): ReactElement {
  const { showError } = useNotification();
  const { data: adsData } = useFetchAllAds();
  const mapRef = useRef<MapRef>(null);
  const [isShowCluster, setIsShowCluster] = useState<boolean>(true);

  const [isActiveAdsBoard, setIsActiveAdsBoard] = useState<boolean>(false);
  const [idAdsBoard, setIdAdsBoard] = useState(-1);

  const [isClickAdsPoint, setIsClickAdsPoint] = useState<boolean>(false);
  const [infoClickAdsPoint, setInfoClickAdsPoint] =
    useState<IAdLocationDetail>();
  const [idAdsPointClick, setIdAdsPointClick] = useState(-1);

  //Create state for getting id advertisement point
  const [idAdsPoint, setIdAdsPoint] = useState(-1);
  //Create state for getting info advertisement point
  const [infoHoverAdsPoint, setInfoHoverAdsPoint] = useState<IAdLocation>();
  //Create state for getting position mouse previous
  const [posPrevMouse, setPosPrevMouse] = useState<locationType>(undefined);

  //Create state for checking ads is reported
  const [isReported, setIsReported] = useState(false);
  const [isClickReported, setIsClickReported] = useState(false);

  //Create state for checking ads board is click detail
  const [adsBoardReportedDetail, setAdsBoardReportedDetail] =
    useState<IAdReport>();
  const [isClickReportedAdsBoard, setIsClickReportedAdsBoard] = useState(false);
  const [infoAdsPointOfAdsBoard, setInfoAdsPointOfAdsBoard] =
    useState<IAdLocation>();

  //Create state for checking point is click detail
  const [adsPointReportedDetail, setAdsPointReportedDetail] =
    useState<ILocationReport>();
  const [isClickReportedPoint, setIsClickReportedPoint] = useState(false);

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
  const adsReportList = useGetAdReports();
  const { onGetLocationDetail } = useGetLocationDetail();
  const [isReportHistoryActive, setIsReportHistoryActive] =
    useState<boolean>(false);

  // Report controller
  const {
    isReportFormActive,
    reportTarget,
    reportData,
    reportIdentificationData,
  } = useGetReportForm();

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
    const fakeFeatures = mapRef.current.queryRenderedFeatures(event.point, {
      layers: ['unclustered-unknown-point-reported'],
    });
    console.log(fakeFeatures);

    setIsActiveAdsBoard(false);
    setIsClickAdsPoint(false);
    setIsReportHistoryActive(false);
    setIsClickReported(false);
    setIsClickReportedAdsBoard(false);
    setIsClickReportedPoint(false);

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
      setIsReportHistoryActive(false);
      //Check ADS Point is reported
      if (featuresAllPoint[0].layer.id === 'unclustered-point-reported')
        setIsClickReported(true);
      else setIsClickReported(false);

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
        setIsReported(true);
      else setIsReported(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (adsData) {
  //   console.log(
  //     [
  //       ...adsData.map((m) => ({
  //         type: 'Feature',
  //         properties: {
  //           id: m.id,
  //           cluster: false,
  //           name: m.address,
  //           planned: m.planned,
  //           isAdsLocation: true,
  //           isAdsBoardReport: adsReportList
  //             ? adsReportList.some((ar) => ar.adsPointID === m.id)
  //             : false,

  //           reported: Boolean(
  //             (locationReportList &&
  //               locationReportList.some(
  //                 (lr) =>
  //                   lr.latitude === m.latitude && lr.longitude === m.longitude
  //               )) ||
  //               (adsReportList &&
  //                 adsReportList.some((ar) => {
  //                   if (m.id === 900) {
  //                     console.log(ar.adsPointID, '____', m.id);
  //                   }
  //                   return ar.adsPointID === m.id;
  //                 }))
  //           ),
  //         },
  //         geometry: {
  //           type: 'Point',
  //           coordinates: [m.longitude, m.latitude],
  //         },
  //       })),
  //       ...(locationReportList
  //         ? locationReportList
  //             .filter((locationReport) => locationReport.reportData === null)
  //             .map((m, index) => ({
  //               type: 'Feature',
  //               properties: {
  //                 id: adsData.length + index + 1,
  //                 cluster: false,
  //                 name: '',
  //                 planned: false,
  //                 reported: true,
  //                 isAdsLocation: false,
  //                 isAdsBoardReport: false,
  //               },
  //               geometry: {
  //                 type: 'Point',
  //                 coordinates: [m.longitude, m.latitude],
  //               },
  //             }))
  //         : []),
  //     ].filter((e) => !e.properties.isAdsLocation)
  //   );
  // }

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
          <div className="flex flex-row justify-between w-full my-4 z-40 relative gap-3 overflow-hidden">
            <div className="w-1/2 h-fit pl-4">
              <CustomSearchBox
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

            <div className="pr-4">
              <button
                onClick={() => {
                  setIsClickAdsPoint(false);
                  setIsReportHistoryActive(true);
                  setIsClickReported(false);
                  setIsClickReportedAdsBoard(false);
                  setIsClickReportedPoint(false);
                }}
                className=" bg-white rounded px-4 py-0 h-[36px] text-xs font-medium shadow-black hover:bg-gray-300 hover:shadow-lg transition-colors"
              >
                <i className="fi fi-ss-triangle-warning mr-1"></i> Báo cáo của
                bạn
              </button>
              <button className="bg-white rounded px-2 py-0 h-[36px] text-xs font-medium ml-2">
                <i className="fi fi-ss-bell"></i>
              </button>
            </div>
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
              data={
                {
                  type: 'FeatureCollection',
                  features: [
                    ...adsData.map((m) => ({
                      type: 'Feature',
                      properties: {
                        id: m.id,
                        cluster: false,
                        name: m.address,
                        planned: m.planned,
                        isAdsLocation: true,
                        isAdsBoardReport: adsReportList
                          ? adsReportList.some((ar) => ar.adsPointID === m.id)
                          : false,
                        reported: Boolean(
                          (locationReportList &&
                            locationReportList.some(
                              (lr) =>
                                lr.latitude === m.latitude &&
                                lr.longitude === m.longitude
                            )) ||
                            (adsReportList &&
                              adsReportList.some((ar) => {
                                if (m.id === 900) {
                                  console.log(ar.adsPointID, '____', m.id);
                                }
                                return ar.adsPointID === m.id;
                              }))
                        ),
                        longLatArr: [m.longitude, m.latitude],
                      },
                      geometry: {
                        type: 'Point',
                        coordinates: [m.longitude, m.latitude],
                      },
                    })),
                    ...(locationReportList
                      ? locationReportList
                          .filter(
                            (locationReport) =>
                              locationReport.reportData === null
                          )
                          .map((m, index) => ({
                            type: 'Feature',
                            properties: {
                              id: adsData.length + index + 1,
                              cluster: false,
                              name: '',
                              planned: false,
                              reported: true,
                              isAdsLocation: false,
                              isAdsBoardReport: false,
                              longLatArr: [m.longitude, m.latitude],
                            },
                            geometry: {
                              type: 'Point',
                              coordinates: [m.longitude, m.latitude],
                            },
                          }))
                      : []),
                  ],
                } as FeatureCollection<Point>
              }
              cluster={true}
              clusterMaxZoom={14}
              clusterRadius={40}
            >
              {/* Cluster layer */}
              <Layer {...clusterLayer} />
              <Layer {...clusterCountLayer} />

              {/* Planned ads point layer */}
              <Layer {...nonClusteredPlannedPointLayer} />

              {/* Unplanned ads point layer */}
              <Layer {...nonclusteredUnplannedPointLayer} />

              {/* Report layer */}
              <Layer {...nonclusteredReportedAdsBoardLayer} />
              <Layer {...nonclusteredReportedPointLayer} />
              <Layer {...nonclusteredReportedUnknownPointLayer} />

              {/* Symbol "!" for report layer */}
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
                isOfficer={false}
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
                isOfficer={false}
                onClick={(id) => {
                  setIdAdsBoard(id);
                  setIsActiveAdsBoard(true);
                }}
                handleClose={() => {
                  setIsClickAdsPoint(false);
                }}
                handleDetailReport={() => {
                  setIsClickReportedPoint(true);

                  const pos = adsData?.find(
                    (ads) => ads.id === infoClickAdsPoint.id
                  );
                  const reportData = locationReportList?.find(
                    (lr) =>
                      lr.latitude === pos?.latitude &&
                      lr.longitude === pos.longitude
                  );
                  setAdsPointReportedDetail(reportData);
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
                isOfficer={false}
                handleClose={() => {
                  setIsActiveAdsBoard(false);
                  setIsClickAdsPoint(false);
                }}
                handleBack={() => {
                  setIsActiveAdsBoard(false);
                  setIsClickAdsPoint(true);
                }}
              ></DetailAds>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}

          {isReportHistoryActive ? (
            <ReportHistory
              handleClose={() => {
                setIsReportHistoryActive(false);
              }}
              handleDetailAdsBoard={(adsBoard) => {
                setAdsBoardReportedDetail(adsBoard);
                setIsClickReportedAdsBoard(true);
                setInfoAdsPointOfAdsBoard(
                  adsData?.find((ads) => ads.id === adsBoard.adsPointID)
                );
              }}
              handleDetailAdsPoint={(point) => {
                setAdsPointReportedDetail(point);
                setIsClickReportedPoint(true);
                if (mapRef.current !== null)
                  mapRef.current.flyTo({
                    zoom: 14,
                    center: [point.longitude, point.latitude],
                    duration: 1500,
                  });
              }}
            />
          ) : (
            <></>
          )}

          {isClickReportedAdsBoard ? (
            adsBoardReportedDetail ? (
              infoAdsPointOfAdsBoard ? (
                <ReportDetailAdsBoard
                  infoAdsBoardReport={adsBoardReportedDetail}
                  infoAdsPoint={infoAdsPointOfAdsBoard}
                  handleClose={() => {
                    setIsClickReportedAdsBoard(false);
                    setIsReportHistoryActive(false);
                    setIsClickAdsPoint(false);
                  }}
                  handleBack={() => {
                    setIsClickReportedAdsBoard(false);
                  }}
                />
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          ) : (
            <></>
          )}

          {isClickReportedPoint ? (
            adsPointReportedDetail ? (
              <ReportDetailPoint
                infoPointReport={adsPointReportedDetail}
                handleClose={() => {
                  setIsClickReportedPoint(false);
                  setIsReportHistoryActive(false);
                  setIsClickAdsPoint(false);
                }}
                handleBack={() => {
                  setIsClickReportedPoint(false);
                }}
              />
            ) : (
              <></>
            )
          ) : (
            <></>
          )}

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
        reportData={reportData}
        reportIdentificationData={reportIdentificationData}
      />
    </div>
  );
}

export default Home;
