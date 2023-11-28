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
export const clusterCountLayout = {
  'text-field': '{point_count_abbreviated}',
  'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
  'text-size': 12,
};
export const unclusteredPointPaint = {
  'circle-color': '#11b4da',
  'circle-radius': 8,
  'circle-stroke-width': 1,
  'circle-stroke-color': '#fff',
};
