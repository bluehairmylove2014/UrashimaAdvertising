'use client';
import { useCallback, useRef, useState } from 'react';
import ReactMapGL, {
  Source,
  Layer,
  ViewStateChangeEvent,
  MapLayerMouseEvent,
  MapRef,
  Popup
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from '../../config/layer';
import { MAP_DEFAULT_VIEW_PORT } from '../../constants/map';
import { ACCESS_TOKEN, MAP_STYLE } from '../../constants/mapbox_key';
import InfoAds from '@presentational/molecules/InfoAds';
import CustomButtonIcon from '@presentational/atoms/CustomButtonIcon';


const adsData = [
  {
    name: 'Quan5_Marker_1',
    long: 106.66394922628781,
    lat: 10.764547226260765,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_2',
    long: 106.6644766279374,
    lat: 10.763815179659433,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_3',
    long: 106.66487201747714,
    lat: 10.75932014490004,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_4',
    long: 106.6631290865419,
    lat: 10.758735067714273,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_5',
    long: 106.6584305470727,
    lat: 10.767027737680895,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_6',
    long: 106.65613764128027,
    lat: 10.76610717784905,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_7',
    long: 106.66334227443784,
    lat: 10.75838595987722,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_8',
    long: 106.65591548891372,
    lat: 10.765710963862704,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_9',
    long: 106.6644054950861,
    lat: 10.7673820015878,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_10',
    long: 106.66151679356346,
    lat: 10.762056913457505,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_11',
    long: 106.66049465811462,
    lat: 10.763167076537165,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_12',
    long: 106.65767319705006,
    lat: 10.766307505345976,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_13',
    long: 106.65828451724504,
    lat: 10.761284882666233,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_14',
    long: 106.65980565826663,
    lat: 10.758881850180869,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_15',
    long: 106.66115993470648,
    lat: 10.759581645069193,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_16',
    long: 106.66051066289361,
    lat: 10.76355886826676,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_17',
    long: 106.65595145463112,
    lat: 10.762134899938966,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_18',
    long: 106.66361786921435,
    lat: 10.764183205308495,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_19',
    long: 106.65742598321305,
    lat: 10.759574902761088,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_20',
    long: 106.66232756339461,
    lat: 10.757894726281531,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_21',
    long: 106.6633285192525,
    lat: 10.76313437254404,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_22',
    long: 106.65784798984832,
    lat: 10.76293581385605,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_23',
    long: 106.66293172357472,
    lat: 10.765573756008033,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_24',
    long: 106.65932696860773,
    lat: 10.763580367717413,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_25',
    long: 106.66174943005798,
    lat: 10.761244013699056,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_26',
    long: 106.66084614079062,
    lat: 10.765587923440268,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_27',
    long: 106.66280253832956,
    lat: 10.764823677056661,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_28',
    long: 106.6645171267063,
    lat: 10.766684373132613,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_29',
    long: 106.65812547708373,
    lat: 10.76424462548116,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_30',
    long: 106.6600183994304,
    lat: 10.761203225206346,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_31',
    long: 106.66368058197203,
    lat: 10.766602130303932,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_32',
    long: 106.65736786003038,
    lat: 10.762991701643832,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_33',
    long: 106.65632308535406,
    lat: 10.766606223686068,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_34',
    long: 106.65780633887967,
    lat: 10.764221317720233,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_35',
    long: 106.6626661172782,
    lat: 10.76695854291092,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_36',
    long: 106.6613332995724,
    lat: 10.76257761234295,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_37',
    long: 106.6631452979197,
    lat: 10.761006049866403,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_38',
    long: 106.6631335428497,
    lat: 10.76754780804156,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_39',
    long: 106.66308651917105,
    lat: 10.759259054682856,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_40',
    long: 106.66410369869989,
    lat: 10.763137016481611,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_41',
    long: 106.66087032784672,
    lat: 10.764866529166975,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_42',
    long: 106.66340551128614,
    lat: 10.763167094949614,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_43',
    long: 106.66192999349809,
    lat: 10.761081610171724,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_44',
    long: 106.66350870856344,
    lat: 10.765897432889235,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_45',
    long: 106.66477365004401,
    lat: 10.7635575575812,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_46',
    long: 106.65703125387073,
    lat: 10.766568050704779,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_47',
    long: 106.65996340350148,
    lat: 10.766565777522937,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_48',
    long: 106.65582132518452,
    lat: 10.765499518090403,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_49',
    long: 106.66483214274079,
    lat: 10.76216062211494,
    city: 'hcm',
  },
  {
    name: 'Quan5_Marker_50',
    long: 106.65754527293713,
    lat: 10.758093538490762,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_1',
    long: 106.65956282146736,
    lat: 10.758059445885591,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_2',
    long: 106.66548479635674,
    lat: 10.763339953584909,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_3',
    long: 106.66488162118927,
    lat: 10.75690843098014,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_4',
    long: 106.66068017925454,
    lat: 10.75925938063704,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_5',
    long: 106.66672529254885,
    lat: 10.759956162998932,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_6',
    long: 106.66521365616158,
    lat: 10.75838119280878,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_7',
    long: 106.66295928978434,
    lat: 10.760254234491594,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_8',
    long: 106.6603039567376,
    lat: 10.757353350423045,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_9',
    long: 106.65803403157852,
    lat: 10.75682708857942,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_10',
    long: 106.66414991729535,
    lat: 10.762031842463813,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_11',
    long: 106.66475308526292,
    lat: 10.759938255248873,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_12',
    long: 106.6658135533853,
    lat: 10.763741188723586,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_13',
    long: 106.6640415901917,
    lat: 10.756728594226818,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_14',
    long: 106.66156856132413,
    lat: 10.76064456631451,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_15',
    long: 106.66550907939383,
    lat: 10.75774258837359,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_16',
    long: 106.66294543762785,
    lat: 10.755641352919078,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_17',
    long: 106.66745812340537,
    lat: 10.75577433087394,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_18',
    long: 106.66348600907436,
    lat: 10.759983879340098,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_19',
    long: 106.662432621124,
    lat: 10.755190238732371,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_20',
    long: 106.6592483906088,
    lat: 10.757834271518913,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_21',
    long: 106.66599981988327,
    lat: 10.754717202666223,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_22',
    long: 106.65902465701085,
    lat: 10.758829202921763,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_23',
    long: 106.66241457727362,
    lat: 10.758619859629832,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_24',
    long: 106.65871108308548,
    lat: 10.761687697825442,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_25',
    long: 106.65870524383502,
    lat: 10.758316133714654,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_26',
    long: 106.66344606993898,
    lat: 10.754405221723573,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_27',
    long: 106.66418314011668,
    lat: 10.756424741100469,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_28',
    long: 106.66134754656677,
    lat: 10.75543176666701,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_29',
    long: 106.66319161650563,
    lat: 10.762533208399764,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_30',
    long: 106.66712017267612,
    lat: 10.762956671271553,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_31',
    long: 106.66373526166328,
    lat: 10.763586732658448,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_32',
    long: 106.66686984485695,
    lat: 10.759257854802739,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_33',
    long: 106.65980118916315,
    lat: 10.761853545145014,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_34',
    long: 106.66500068222847,
    lat: 10.763045245130384,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_35',
    long: 106.66470085341263,
    lat: 10.761247262712342,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_36',
    long: 106.66455741854844,
    lat: 10.76011238629611,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_37',
    long: 106.66612278109703,
    lat: 10.760440493564907,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_38',
    long: 106.66137735029984,
    lat: 10.757907918066255,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_39',
    long: 106.65884420534266,
    lat: 10.759587083854164,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_40',
    long: 106.66002205963089,
    lat: 10.757111684520877,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_41',
    long: 106.65942393813341,
    lat: 10.763655704738586,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_42',
    long: 106.66530455120402,
    lat: 10.757540605358143,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_43',
    long: 106.66321214801336,
    lat: 10.760260839731092,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_44',
    long: 106.66607159957093,
    lat: 10.763367481871267,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_45',
    long: 106.66561117774283,
    lat: 10.7605528168618,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_46',
    long: 106.66460543143695,
    lat: 10.76254982068395,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_47',
    long: 106.66137889564015,
    lat: 10.76213089279875,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_48',
    long: 106.65955743630191,
    lat: 10.759516308702807,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_49',
    long: 106.6604070580157,
    lat: 10.755884884330333,
    city: 'hcm',
  },
  {
    name: 'Quan10_Marker_50',
    long: 106.66638303704353,
    lat: 10.757380823449347,
    city: 'hcm',
  },
];

interface AdsPoint {
  hinhThuc: string,
  phanLoat: string,
  diaChi: string,
  daQuyHoach: boolean,
  long: number,
  lat: number
}

function Home() {
  const mapRef = useRef<MapRef>(null);
  const [isShowCluster, setIsShowCluster] = useState<boolean>(true);

  //Đặt biến state kiểm tra vị trí con trỏ trỏ đến có là điểm đặt quảng cáo hay không
  const [isAdsPoint, setIsAdsPoint] = useState<boolean>(false);

  //Đặt biến state lưu thông tin sơ bộ địa điểm quảng cáo
  const [infoHoverAdsPoint, setInfoHoverAdsPoint] = useState<AdsPoint>();

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

  //Bắt sự kiện click chuột
  const handleClick = useCallback((event: MapLayerMouseEvent) => {
    if (!mapRef.current) return;

    // const features = mapRef.current.queryRenderedFeatures(event.point, {
    //   layers: ['clusters'],
    // });

    const features = mapRef.current.queryRenderedFeatures(event.point);

    const feature = features.find((f) => f.layer.id === 'clusters');
    if (feature && feature.geometry.type === 'Point') {
      const [long, lat] = feature.geometry.coordinates;
      mapRef.current.flyTo({ zoom: 16, center: [long, lat], duration: 1500 });
      return;
    }

    //Điểm click chuột là điểm đặt các bảng quảng cáo
    const unclusteredPoint = features.find((f) => f.layer.id === 'unclustered-point');
    if (unclusteredPoint && unclusteredPoint.geometry.type === 'Point') {
      setIsAdsPoint(true);
    }
    else
      setIsAdsPoint(false);
  }, []);

  //Bắt sự kiện chuột nhấn xuống
  const handleMouseDown = useCallback((event: MapLayerMouseEvent) => {
    setCursor('grabbing');
  }, []);

  //Bắt sự kiện chuột nhất lên
  const handleMouseUp = useCallback((event: MapLayerMouseEvent) => {
    setCursor('pointer');
  }, []);

  const [hoverInfo, setHoverInfo] = useState(null);

  interface AdsPosition {
    long: number;
    lat: number;
  }

  //Bắt sự kiện chuột di chuyển đến các điểm quảng cáo
  const handleMouseMove = useCallback((event: MapLayerMouseEvent) => {
    if (!mapRef.current) return;

    const features = mapRef.current.queryRenderedFeatures(event.point);

    const unclusteredPoint = features.find((f) => f.layer.id === 'unclustered-point');
    let [long, lat] = [0, 0]
    if (unclusteredPoint && unclusteredPoint.geometry.type === 'Point') {
      [long, lat] = [event.point.x, event.point.y];
    }

    setInfoHoverAdsPoint(unclusteredPoint && {
      hinhThuc: 'string',
      phanLoat: 'string',
      diaChi: 'string',
      daQuyHoach: true,
      long: long,
      lat: lat
    });

  }, []);


  return (
    <div>
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
        maxBounds={[
          [106.317521, 10.321631], // Tọa độ góc dưới cùng bên trái của hình chữ nhật giới hạn
          [107.042629, 11.210448], // Tọa độ góc trên cùng bên phải của hình chữ nhật giới hạn
        ]}
        // maxBounds={bounds}
        ref={mapRef}
        cursor={cursor}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle={MAP_STYLE}
      >

        {isShowCluster ? (
          <Source
            id="earthquakes"
            type="geojson"
            data={{
              type: 'FeatureCollection',
              features: adsData.map((m) => ({
                type: 'Feature',
                properties: { cluster: false, name: m.name },
                geometry: { type: 'Point', coordinates: [m.long, m.lat] },
              })),
            }}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={40}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>

        ) : (
          <></>
        )}
        {infoHoverAdsPoint && (
          <div className='max-w-[45vh] bg-white rounded-[5px] shadow-[1px_1px_3px_-2px] p-[0.4rem] absolute' style={{ left: infoHoverAdsPoint.long, top: infoHoverAdsPoint.lat }}>
            <InfoAds />
          </div>
        )}

      </ReactMapGL >
    </div >
  );
}

export default Home;
