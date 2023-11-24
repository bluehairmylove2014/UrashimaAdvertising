import { LayerProps } from 'react-map-gl';
import {
  custerColors,
  custerRadius,
  clusterCountLayout,
  unclusteredPointPaint,
} from './cluster';

export const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], ...custerColors],
    'circle-radius': ['step', ['get', 'point_count'], ...custerRadius],
  },
};

export const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  layout: clusterCountLayout,
};

export const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'earthquakes',
  filter: ['!', ['has', 'point_count']],
  paint: unclusteredPointPaint,
};
