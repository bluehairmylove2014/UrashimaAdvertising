import { ViewState } from 'react-map-gl';

export const MAP_DEFAULT_VIEW_PORT: ViewState = {
  longitude: 106.682448,
  latitude: 10.762538,
  zoom: 14,
  bearing: 90, // look to east
  pitch: 0, // 2D view
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};
