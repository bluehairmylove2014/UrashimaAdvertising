'use client';
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MapLayerMouseEvent, MapRef, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useGetAdDetail } from '@business-layer/business-logic/lib/ads';
import DetailLoader from '@presentational/atoms/DetailLoader';
import CustomImage from '@presentational/atoms/CustomImage';

import {
  IAdLocation,
  IAdLocationDetail,
} from '@business-layer/services/entities/ads';
import InfoAdsPoint from '@presentational/molecules/InfoAdsPoint';
import DetailAds from '@presentational/molecules/DetailAds';
import DetailAdsPoint from '@presentational/molecules/DetailAdsPoint';

import 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useGetLocationReports } from '@business-layer/business-logic/lib/report';
import { useGetLocationDetail } from '@business-layer/business-logic/lib/geocode';
import { useNotification } from '@presentational/atoms/Notification';

import LocationDetail from '@presentational/molecules/LocationDetail';
import { ILocation } from '@business-layer/services/entities';
import { useFetchAllOfficerAds } from '@business-layer/business-logic/lib/officerAds/process/hooks';
import CustomMap from '@presentational/organisms/CustomMap';
import {
  useGetCoord,
  useGetIsSelecting,
  useSetIsSelecting,
} from '@business-layer/business-logic/non-service-lib/viewLocationMap';
import { useGetIsActive } from '@business-layer/business-logic/non-service-lib/viewLocationMap';
import { useSetCoord } from '@business-layer/business-logic/non-service-lib/viewLocationMap';
import { useSetIsActive } from '@business-layer/business-logic/non-service-lib/viewLocationMap';

const useViewLocationMap = () => {
  const coord = useGetCoord();
  const isActive = useGetIsActive();
  const isSelectingLocation = useGetIsSelecting();
  const { setCoord } = useSetCoord();
  const { setIsActive } = useSetIsActive();
  const { setIsSelecting } = useSetIsSelecting();
  const openMap = (lat?: number, long?: number) => {
    lat && long && setCoord(lat, long);
    setIsActive(true);
  };
  const closeMap = () => {
    setIsActive(false);
    setCoord(10.762538, 106.682448);
  };
  const enableSelecting = (lat?: number, long?: number) => {
    setIsSelecting(true);
  };
  const disableSelecting = () => {
    setIsSelecting(false);
  };
  return {
    coord,
    isActive,
    isSelectingLocation,
    openMap,
    closeMap,
    enableSelecting,
    disableSelecting,
  };
};
type locationType =
  | {
      latitude: number;
      longitude: number;
    }
  | undefined;

function ViewLocationMap(): ReactElement {
  const {
    coord: initialLatLong,
    isActive,
    closeMap,
    isSelectingLocation,
  } = useViewLocationMap();
  const { showError } = useNotification();
  const { data: adsData } = useFetchAllOfficerAds();
  const mapRef = useRef<MapRef>(null);

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
  const [isAdsPointReported, setIsAdsPointReported] = useState(false);
  const [isClickReported, setIsClickReported] = useState(false);

  const { onGetAdDetail, isLoading } = useGetAdDetail();
  const [userClickMarker, setUserClickMarker] =
    useState<locationType>(undefined);
  const [locationOnClickDetail, setLocationOnClickDetail] = useState<
    ILocation | undefined
  >(undefined);
  const [isLocationOnClickPopupActive, setIsLocationOnClickPopupActive] =
    useState<boolean>(false);

  const locationReportList = useGetLocationReports();
  const { onGetLocationDetail } = useGetLocationDetail();

  useEffect(() => {
    mapRef.current &&
      Array.isArray(initialLatLong) &&
      initialLatLong.length === 2 &&
      mapRef.current.flyTo({
        zoom: 16,
        center: [initialLatLong[1], initialLatLong[0]],
        duration: 1500,
      });
  }, [initialLatLong]);

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

    setIsActiveAdsBoard(false);
    setIsClickAdsPoint(false);
    setIsClickReported(false);

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

    if (featuresAllPoint[0] && featuresAllPoint[0].geometry.type === 'Point') {
      //Check ADS Point is reported
      if (featuresAllPoint[0].layer.id === 'unclustered-reported')
        setIsClickReported(true);
      else setIsClickReported(false);

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
  const handleMouseMove = useCallback((event: MapLayerMouseEvent) => {
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
      setInfoHoverAdsPoint(undefined);
      setIdAdsPoint(-1);
    }
    if (adsPoint && adsPoint.geometry.type === 'Point') {
      const [long, lat] = adsPoint.geometry.coordinates;

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

      setIdAdsPoint(adsPoint.properties?.id);
      setPosPrevMouse({
        latitude: lat,
        longitude: long,
      });

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`fixed top-0 left-[20vw] w-[80vw] h-screen z-40 overflow-hidden ${
        isActive ? '' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <div className="relative z-30">
        <CustomMap
          mapProps={{
            onClick: handleClick,
            onMouseMove: handleMouseMove,
            initialViewState: {
              ...{
                zoom: 17,
                bearing: 90, // look to east
                pitch: 0, // 2D view
                padding: { top: 0, bottom: 0, left: 0, right: 0 },
              },
              longitude: initialLatLong[1],
              latitude: initialLatLong[0],
            },
          }}
          sourceData={{
            type: 'FeatureCollection',
            features: adsData
              ? adsData.map((m) => ({
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
                }))
              : [],
          }}
          ref={mapRef}
        >
          <button
            onClick={() => closeMap()}
            className="bg-white w-8 h-8 rounded absolute top-4 right-4 transition-colors hover:bg-zinc-100 shadow-md"
          >
            x
          </button>
          <Marker latitude={initialLatLong[0]} longitude={initialLatLong[1]}>
            <CustomImage
              src="/assets/circle.png"
              alt="location"
              width="40px"
              height="40px"
            />
          </Marker>
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
                isOfficer={true}
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
                isOfficer={true}
                onClick={(id) => {
                  setIdAdsBoard(id);
                  setIsActiveAdsBoard(true);
                }}
                handleClose={() => {
                  setIsClickAdsPoint(false);
                }}
                handleDetailReport={() => {}}
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
                isOfficer={true}
                handleClose={() => {
                  setIsActiveAdsBoard(false);
                  setIsClickAdsPoint(false);
                }}
                handleBack={() => {
                  setIsActiveAdsBoard(false);
                  setIsClickAdsPoint(true);
                }}
                handleDetailReportAdsBoard={() => {}}
              ></DetailAds>
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
        isOfficer={true}
        isSelecting={isSelectingLocation}
      />
    </div>
  );
}

export { useViewLocationMap };
export default ViewLocationMap;
