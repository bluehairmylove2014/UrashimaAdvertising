'use client';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { MapLayerMouseEvent, MapRef, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  useFetchAllAds,
  useGetAdDetail,
} from '@business-layer/business-logic/lib/ads';
import DetailLoader from '@presentational/atoms/DetailLoader';
import CustomImage from '@presentational/atoms/CustomImage';
import ReportForm from '@presentational/molecules/ReportForm';
import Announcement from '@presentational/molecules/Announcement';
import CustomMap from '@presentational/organisms/CustomMap';

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
import ReportDetailAdsBoard from '@presentational/molecules/ReportDetailAdsBoard';
import ReportDetailPoint from '@presentational/molecules/ReportDetailPoint';

import { IAdReport, ILocationReport } from '@business-layer/services/entities';

import { FeatureCollection, Point } from 'geojson';
import { debounce } from '@business-layer/business-logic/helper';
import { useSocketConnect } from '@business-layer/business-logic/realtime';

type locationType =
  | {
    latitude: number;
    longitude: number;
  }
  | undefined;

function Home(): ReactElement {
  const { showError } = useNotification();
  const { data: adsData } = useFetchAllAds();
  const mapRef = useRef<MapRef>(null);

  //Create state for need back button
  const [isBackActive, setIsBackActive] = useState<boolean>(true);

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

  //Create state for checking ads point is reported
  const [isAdsPointReported, setIsAdsPointReported] = useState(false);
  //Create state for checking ads point is reported
  const [longLatUnknowPointReported, setLongLatUnknowPointReported] =
    useState<locationType>(undefined);
  const [infoUnknowPointReported, setInfoUnknowPointReported] = useState<
    ILocation | undefined
  >(undefined);

  // Create state for show notification
  const [isNotifications, setIsNotifications] = useState<boolean>(false);

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

  const { onGetAdDetail, isLoading } = useGetAdDetail();
  const [userClickMarker, setUserClickMarker] =
    useState<locationType>(undefined);
  const [locationOnClickDetail, setLocationOnClickDetail] = useState<
    ILocation | undefined
  >(undefined);
  const [isLocationOnClickPopupActive, setIsLocationOnClickPopupActive] =
    useState<boolean>(false);
  const prevUnknownPointLatLong = useRef<{ lat: number; long: number } | null>(
    null
  );

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
  const { handleConnect } = useSocketConnect();

  useEffect(() => {
    handleConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        .catch((error) => console.error(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idAdsPointClick]);

  //Catch click mouse event
  const handleClick = useCallback((event: MapLayerMouseEvent) => {
    if (!mapRef.current) return;

    setIsNotifications(false);
    setIsActiveAdsBoard(false);
    setIsClickAdsPoint(false);
    setIsReportHistoryActive(false);
    setIsClickReportedAdsBoard(false);
    setIsClickReportedPoint(false);
    setIsBackActive(true);
    setLongLatUnknowPointReported(undefined);
    setInfoHoverAdsPoint(undefined);
    setIsLocationOnClickPopupActive(false);

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
        'unclustered-reported',
      ],
    });

    if (
      featuresAllPoint[0] &&
      featuresAllPoint[0].geometry.type === 'Point' &&
      typeof featuresAllPoint[0].properties?.longLatArr === 'string'
    ) {
      const [long, lat] = featuresAllPoint[0].properties.longLatArr
        .slice(1, -1) // Remove the square brackets at the beginning and end
        .split(',') // Split the string into an array of substrings
        .map(Number);

      //Check ADS Point is reported
      if (
        featuresAllPoint[0].layer.id === 'unclustered-reported'
      ) {
        const report = locationReportList?.find((r) =>
          r.latitude == lat && r.longitude == long
        );
        if (report && !report.reportData) {
          mapRef.current.flyTo({
            zoom: 16,
            center: [event.lngLat.lng, event.lngLat.lat],
            duration: 1500,
          });


          setAdsPointReportedDetail(

            locationReportList?.find(
              (location) =>
                location.longitude === long && location.latitude === lat
            )
          );
          setIsClickReportedPoint(true);
          setIsBackActive(false);
          return;
        }
        else setIsClickReportedPoint(false);
      }
      else setIsClickReportedPoint(false);

      mapRef.current.flyTo({
        zoom: 16,
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

  //Catch Mouse Move
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMouseMove = useCallback(
    debounce((event: MapLayerMouseEvent) => {
      if (!mapRef.current) return;

      const features = mapRef.current.queryRenderedFeatures(event.point);

      //Handle hover ads point
      const adsPoint = features.find(
        (f) =>
          f.layer.id === 'unclustered-point-planned' ||
          f.layer.id === 'unclustered-point-unplanned' ||
          f.layer.id === 'unclustered-reported'
      );

      if (!adsPoint) {
        setLongLatUnknowPointReported(undefined);
        setInfoHoverAdsPoint(undefined);
        setIsAdsPointReported(false);
        setIdAdsPoint(-1);
        prevUnknownPointLatLong.current = null;
        return;
      }

      if (
        adsPoint &&
        adsPoint.geometry.type === 'Point' &&
        typeof adsPoint.properties?.longLatArr === 'string'
      ) {
        const [long, lat] = adsPoint.properties.longLatArr
          .slice(1, -1) // Remove the square brackets at the beginning and end
          .split(',') // Split the string into an array of substrings
          .map(Number);
        if (
          prevUnknownPointLatLong.current &&
          prevUnknownPointLatLong.current.lat === lat &&
          prevUnknownPointLatLong.current.long === long
        )
          return;
        prevUnknownPointLatLong.current = {
          long,
          lat,
        };

        //Detech mouse around
        if (
          posPrevMouse &&
          event.lngLat.lng < posPrevMouse.longitude + 5 &&
          event.lngLat.lng > posPrevMouse.longitude - 5
        ) {
          if (
            event.lngLat.lat < posPrevMouse.latitude + 5 &&
            event.lngLat.lng > posPrevMouse.latitude - 5
          )
            return;
        }

        //Check Report
        if (adsPoint.layer.id === 'unclustered-reported') {
          //Check report type
          const report = locationReportList?.find((r) =>
            r.latitude == lat && r.longitude == long
          );

          //Unknow report
          if (report && !report.reportData) {
            setLongLatUnknowPointReported({
              longitude: long,
              latitude: lat,
            });
            onGetLocationDetail({ latitude: lat, longitude: long })
              .then((data) => {
                setInfoUnknowPointReported(data);
              })
              .catch((error) => {
                showError('Lỗi lấy dữ liệu địa điểm');
              });

            setPosPrevMouse({
              latitude: lat,
              longitude: long,
            });
            return;
          }

          //Ads Report Point or Ads Board Report
          setIsAdsPointReported(true);
        }
        else setIsAdsPointReported(false);

        setIdAdsPoint(adsPoint.properties?.id);
        setPosPrevMouse({
          latitude: lat,
          longitude: long,
        });

        return;
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 10),
    []
  );

  return (
    <div className="relative w-screen h-screen">
      <div className="relative z-0">
        <CustomMap
          mapProps={{
            onClick: handleClick,
            onMouseMove: handleMouseMove,
          }}
          sourceData={
            {
              type: 'FeatureCollection',
              features: adsData
                ? [
                  ...adsData.map((m) => ({
                    type: 'Feature',
                    properties: {
                      id: m.id,
                      cluster: false,
                      name: m.address,
                      planned: m.planned,
                      isEmpty: m.isEmpty,
                      reported: Boolean(
                        (locationReportList &&
                          locationReportList.some(
                            (lr) =>
                              lr.latitude === m.latitude &&
                              lr.longitude === m.longitude
                          )) ||
                        (adsReportList &&
                          adsReportList.some(
                            (ar) => ar.adsPointID === m.id
                          ))
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
                          isEmpty: false,
                          longLatArr: [m.longitude, m.latitude],
                        },
                        geometry: {
                          type: 'Point',
                          coordinates: [m.longitude, m.latitude],
                        },
                      }))
                    : []),
                ]
                : [],
            } as FeatureCollection<Point>
          }
          ref={mapRef}
        >
          <div className="absolute top-0 right-0 pr-4 my-4">
            <button
              onClick={() => {
                setIsClickAdsPoint(false);
                setIsReportHistoryActive(true);
                setIsClickReportedAdsBoard(false);
                setIsClickReportedPoint(false);
              }}
              className="relative bg-white rounded shadow-md shadow-zinc-400 px-2 py-0 h-[36px] text-xs font-medium hover:bg-gray-100 transition-colors"
            >
              <i className="fi fi-ss-triangle-warning"></i>
              {/* Báo cáo của bạn */}
            </button>
            <button
              className="relative bg-white rounded shadow-md shadow-zinc-400 px-2 py-0 h-[36px] text-xs font-medium ml-2 hover:bg-gray-100 transition-colors"
              onClick={() => {
                setIsNotifications(!isNotifications);
              }}
            >
              <i className="fi fi-ss-bell"></i>
            </button>
            {isNotifications ? (
              <Announcement
                handleClose={() => {
                  setIsNotifications(false);
                }}
              />
            ) : (
              <></>
            )}
          </div>
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

          {/* Hover Unknow Point Reported */}
          {longLatUnknowPointReported ? (
            <Popup
              longitude={longLatUnknowPointReported.longitude}
              latitude={longLatUnknowPointReported.latitude}
              closeButton={false}
              closeOnClick={false}
              maxWidth="50vh"
            >
              {infoUnknowPointReported ? (
                <div className="text-[0.7rem]">
                  <p className="font-bold text-sm">Thông tin địa điểm</p>
                  <p className="font-semibold text-neutral-600 mt-1">
                    {infoUnknowPointReported.display_name}
                  </p>
                  <p className="text-neutral-500 mt-1">
                    Kinh độ:{' '}
                    <span className="">
                      {longLatUnknowPointReported.longitude}
                    </span>
                  </p>
                  <p className="text-neutral-500 mb-1">
                    Vĩ độ:{' '}
                    <span className="">
                      {longLatUnknowPointReported.latitude}
                    </span>
                  </p>
                  <p className="text-rose-600 text-sm font-semibold text-right">
                    Bạn đã báo cáo điểm này
                  </p>
                </div>
              ) : (
                <>
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </>
              )}
            </Popup>
          ) : (
            <></>
          )}

          {/* Hover Ads Point */}
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
                isAdsPointReported={isAdsPointReported}
                isOfficer={false}
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
                isOfficer={false}
                isHQ={false}
                listReport={undefined}
                handleListReport={() => { }}
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
                handleDetailReportAdsBoard={(adsBoard) => {
                  setAdsBoardReportedDetail(adsBoard);
                  setIsClickReportedAdsBoard(true);
                  setInfoAdsPointOfAdsBoard(
                    adsData?.find((ads) => ads.id === adsBoard.adsPointID)
                  );
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
                    zoom: 16,
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
                backActive={isBackActive}
                infoPointReport={adsPointReportedDetail}
                infoUnknowPoint={infoUnknowPointReported}
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
        </CustomMap>
      </div>

      <LocationDetail
        locationData={locationOnClickDetail}
        isActive={isLocationOnClickPopupActive}
        handleClose={() => {
          setIsLocationOnClickPopupActive(false);
          setUserClickMarker(undefined);
        }}
        isOfficer={false}
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
