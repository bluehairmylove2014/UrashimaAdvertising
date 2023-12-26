import { LayerProps } from 'react-map-gl';

const pointSize = 8;
const strokeWidth = 2;
const font = ['Montserrat Bold', 'Arial Unicode MS Bold'];
const symbolFont = ['Montserrat ExtraBold', 'Arial Unicode MS Bold'];
const fontSize = 12;
const strokeColor = '#FFFFFF';
export const sourceName = 'earthquakes';

/**
 * IMPORTANT NOTE!!!
 * custerColors.length MUST EQUAL TO custerRadius.length
 */
export const custerColors = [
  '#51bbd6', // màu sắc cho nhóm có ít hơn 10 điểm
  10,
  '#f1f075', // màu sắc cho nhóm có từ 10 đến 49 điểm
  50,
  '#f28cb1', // màu sắc cho nhóm có từ 50 đến 199 điểm
  200,
  '#223b53', // màu sắc cho nhóm có từ 200 đến 999 điểm
  1000,
  '#3bb2d0', // màu sắc cho nhóm có 1000 điểm trở lên
];
export const custerRadius = [
  15, // bán kính cho nhóm có ít hơn 10 điểm
  10,
  20, // bán kính cho nhóm có từ 10 đến 49 điểm
  50,
  30, // bán kính cho nhóm có từ 50 đến 199 điểm
  200,
  40, // bán kính cho nhóm có từ 200 đến 999 điểm
  1000,
  50, // bán kính cho nhóm có 1000 điểm trở lên
];

export const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  source: sourceName,
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], ...custerColors],
    'circle-radius': ['step', ['get', 'point_count'], ...custerRadius],
  },
};
export const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: sourceName,
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': font,
    'text-size': fontSize,
  },
};

export const nonClusteredPlannedPointLayer: LayerProps = {
  id: 'unclustered-point-planned',
  type: 'circle',
  source: sourceName,
  filter: [
    'all',
    ['!', ['has', 'point_count']],
    ['==', ['get', 'planned'], true],
    ['==', ['get', 'reported'], false],
  ],
  paint: {
    'circle-color': '#0000FF',
    'circle-radius': pointSize,
    'circle-stroke-width': strokeWidth,
    'circle-stroke-color': strokeColor,
  },
};

export const nonclusteredUnplannedPointLayer: LayerProps = {
  id: 'unclustered-point-unplanned',
  type: 'circle',
  source: sourceName,
  filter: [
    'all',
    ['!', ['has', 'point_count']],
    ['==', ['get', 'planned'], false],
    ['==', ['get', 'reported'], false],
  ],
  paint: {
    'circle-color': '#FF7F50',
    'circle-radius': pointSize,
    'circle-stroke-width': strokeWidth,
    'circle-stroke-color': strokeColor,
  },
};

export const nonclusteredReportedAdsBoardLayer: LayerProps = {
  id: 'unclustered-ads-board-reported',
  type: 'circle',
  source: sourceName,
  filter: [
    'all',
    ['!', ['has', 'point_count']],
    ['==', ['get', 'reported'], true],
    ['==', ['get', 'isAdsLocation'], true],
    ['==', ['get', 'isAdsBoardReport'], true],
  ],
  paint: {
    'circle-color': '#FB5001',
    'circle-radius': pointSize,
    'circle-stroke-width': strokeWidth,
    'circle-stroke-color': strokeColor,
  },
};
export const nonclusteredReportedUnknownPointLayer: LayerProps = {
  id: 'unclustered-unknown-point-reported',
  type: 'circle',
  source: sourceName,
  filter: [
    'all',
    ['!', ['has', 'point_count']],
    ['==', ['get', 'reported'], true],
    ['==', ['get', 'isAdsLocation'], false],
    ['==', ['get', 'isAdsBoardReport'], false],
  ],
  paint: {
    'circle-color': '#00098A',
    'circle-radius': pointSize,
    'circle-stroke-width': strokeWidth,
    'circle-stroke-color': strokeColor,
  },
};
export const nonclusteredReportedPointLayer: LayerProps = {
  id: 'unclustered-point-reported',
  type: 'circle',
  source: sourceName,
  filter: [
    'all',
    ['!', ['has', 'point_count']],
    ['==', ['get', 'reported'], true],
    ['==', ['get', 'isAdsLocation'], true],
    ['==', ['get', 'isAdsBoardReport'], false],
  ],
  paint: {
    'circle-color': '#8B0000',
    'circle-radius': pointSize,
    'circle-stroke-width': strokeWidth,
    'circle-stroke-color': strokeColor,
  },
};
export const nonClusteredReportedPointSymbolLayer: LayerProps = {
  id: 'non-clustered-reported-point-symbol',
  type: 'symbol',
  source: sourceName,
  filter: [
    'all',
    ['!', ['has', 'point_count']],
    ['==', ['get', 'reported'], true],
  ],
  paint: {
    'text-color': strokeColor,
  },
  layout: {
    'text-field': '!',
    'text-font': symbolFont,
    'text-size': fontSize,
  },
};
