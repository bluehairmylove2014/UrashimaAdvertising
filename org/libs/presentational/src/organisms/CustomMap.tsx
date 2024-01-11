import {
  ForwardRefRenderFunction,
  MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FeatureCollection, Point } from 'geojson';
import {
  FullscreenControl,
  GeolocateControl,
  Layer,
  LayerProps,
  MapLayerMouseEvent,
  MapRef,
  Marker,
  NavigationControl,
  Source,
  SourceProps,
  ViewState,
  ViewStateChangeEvent,
} from 'react-map-gl';
import ReactMapGL, { MapProps } from 'react-map-gl';
import { sourceLayersList } from '@constants/mapLayers';
import ScreenLoader from '@presentational/atoms/ScreenLoader';
import CustomImage from '@presentational/atoms/CustomImage';
import { ACCESS_TOKEN, MAP_STYLE } from '@constants/mapbox_key';
import CustomSearchBox from '@presentational/atoms/CustomSearchBox';
import PointFilterBtn from '@presentational/molecules/PointFilterBtn';

const MAP_DEFAULT_VIEW_PORT: ViewState = {
  longitude: 106.682448,
  latitude: 10.762538,
  zoom: 14,
  bearing: 90, // look to east
  pitch: 0, // 2D view
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

export type customMapProps = {
  mapProps?: MapProps;
  sourceProps?: SourceProps & { data: FeatureCollection<Point> };
  sourceData: FeatureCollection<Point>;
  children?: React.ReactNode;
};

type locationType =
  | {
      latitude: number;
      longitude: number;
    }
  | undefined;

function isMutableRefObject(ref: any): ref is MutableRefObject<MapRef | null> {
  return ref && 'current' in ref && ref.current !== null;
}

const CustomMap: ForwardRefRenderFunction<MapRef, customMapProps> = (
  { mapProps, sourceProps, sourceData, children },
  ref
) => {
  const [currentLocation, setCurrentLocation] =
    useState<locationType>(undefined);
  const [userLocationMarker, setUserLocationMarker] =
    useState<locationType>(undefined);
  const [searchKey, setSearchKey] = useState<string>('');
  const [marker, setMarker] = useState<locationType>(undefined);
  const [cursor, setCursor] = useState('pointer');
  const [isShowCluster, setIsShowCluster] = useState<boolean>(true);
  const [layers, setLayers] = useState<LayerProps[]>(sourceLayersList);
  const backupSourceData = useRef<FeatureCollection<Point>>(sourceData);
  const [displaySourceData, setDisplaySourceData] =
    useState<FeatureCollection<Point>>(sourceData);

  useEffect(() => {
    if (
      backupSourceData.current.features.length !== sourceData.features.length
    ) {
      setDisplaySourceData(sourceData);
      backupSourceData.current = sourceData;
      setLayers(sourceLayersList);
    }
  }, [sourceData]);

  useEffect(() => {
    if (currentLocation === undefined && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('LOCATION: ', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, [currentLocation]);
  useEffect(() => {
    if (
      currentLocation &&
      currentLocation.latitude &&
      currentLocation.longitude
    ) {
      setUserLocationMarker({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
    }
  }, [currentLocation]);

  useEffect(() => {
    if (
      userLocationMarker &&
      userLocationMarker.latitude &&
      userLocationMarker.longitude &&
      isMutableRefObject(ref) &&
      ref.current
    ) {
      ref.current.flyTo({
        zoom: 14,
        center: {
          lng: userLocationMarker.longitude,
          lat: userLocationMarker.latitude,
        },
        duration: 3000,
      });
    }
  }, [userLocationMarker]);

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
  //Catch Mouse Down
  const handleMouseDown = useCallback((event: MapLayerMouseEvent) => {
    setCursor('grabbing');
  }, []);

  //Catch Mouse Up
  const handleMouseUp = useCallback((event: MapLayerMouseEvent) => {
    setCursor('pointer');
  }, []);

  const handleFilterLayers = (layers: LayerProps[]) => {
    let newSourceData = { ...backupSourceData.current };
    if (!layers.find((l) => l.id === 'unclustered-point-planned')) {
      newSourceData.features = newSourceData.features.filter(
        (f) =>
          f.properties &&
          (f.properties.planned !== true || f.properties.reported !== false)
      );
    }
    if (!layers.find((l) => l.id === 'unclustered-point-unplanned')) {
      newSourceData.features = newSourceData.features.filter(
        (f) =>
          f.properties &&
          (f.properties.planned !== false || f.properties.reported !== false)
      );
    }
    if (!layers.find((l) => l.id === 'unclustered-ads-board-reported')) {
      newSourceData.features = newSourceData.features.filter(
        (f) =>
          f.properties &&
          (f.properties.reported !== true ||
            f.properties.isAdsLocation !== true ||
            f.properties.isAdsBoardReport !== true)
      );
    }
    if (!layers.find((l) => l.id === 'unclustered-unknown-point-reported')) {
      newSourceData.features = newSourceData.features.filter(
        (f) =>
          f.properties &&
          (f.properties.reported !== true ||
            f.properties.isAdsLocation !== false ||
            f.properties.isAdsBoardReport !== false)
      );
    }
    if (!layers.find((l) => l.id === 'unclustered-point-reported')) {
      newSourceData.features = newSourceData.features.filter(
        (f) =>
          f.properties &&
          (f.properties.reported !== true ||
            f.properties.isAdsLocation !== true ||
            f.properties.isAdsBoardReport !== false)
      );
    }
    setDisplaySourceData(newSourceData);
    setLayers(layers);
  };

  return (
    <ReactMapGL
      ref={ref}
      style={{ width: '100%', height: '100vh' }}
      mapStyle={MAP_STYLE}
      mapboxAccessToken={ACCESS_TOKEN}
      initialViewState={{
        ...MAP_DEFAULT_VIEW_PORT,
        latitude: currentLocation
          ? currentLocation.latitude
          : MAP_DEFAULT_VIEW_PORT.latitude,

        longitude: currentLocation
          ? currentLocation.longitude
          : MAP_DEFAULT_VIEW_PORT.longitude,
      }}
      dragRotate={false}
      maxZoom={18}
      cursor={cursor}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onZoom={handleZoom}
      {...mapProps}
      // maxBounds={[
      //   [106.317521, 10.321631], // Tọa độ góc dưới cùng bên trái của hình chữ nhật giới hạn
      //   [107.042629, 11.210448], // Tọa độ góc trên cùng bên phải của hình chữ nhật giới hạn
      // ]}
    >
      {!displaySourceData || !Array.isArray(displaySourceData.features) ? (
        <ScreenLoader />
      ) : isShowCluster ? (
        <Source
          {...sourceProps}
          id="earthquakes"
          type="geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={40}
          data={displaySourceData}
        >
          {layers.map((l) => (
            <Layer {...l} key={l.id} />
          ))}
        </Source>
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
      {children}
      <div className="pl-4 my-4 flex flex-row gap-4 items-start justify-start z-30">
        <div className="w-1/2 h-fit relative">
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
                isMutableRefObject(ref) &&
                  ref.current?.flyTo({
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
        <div className="relative">
          <PointFilterBtn onFilter={handleFilterLayers} />
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
      <FullscreenControl position="bottom-right" />
      <NavigationControl position="bottom-right" />
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        showAccuracyCircle={true}
        showUserLocation={false}
        showUserHeading={false}
        position="bottom-right"
        onGeolocate={(e) => {
          setCurrentLocation({
            latitude: e.coords.latitude,
            longitude: e.coords.longitude,
          });
        }}
      />
    </ReactMapGL>
  );
};

export default forwardRef(CustomMap);
