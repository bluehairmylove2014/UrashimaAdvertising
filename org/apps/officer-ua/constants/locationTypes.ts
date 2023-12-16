export const LOCATION_TYPES: {
  name: string;
  value: null | string;
  defaultChecked: boolean;
}[] = [
  {
    name: 'Tất cả loại địa điểm',
    value: null,
    defaultChecked: true,
  },
  {
    name: 'Đất công/Công viên/Hành lang an toàn giao thông',
    value: 'Đất công/Công viên/Hành lang an toàn giao thông',
    defaultChecked: false,
  },
  {
    name: 'Đất tư nhân/Nhà ở riêng lẻ',
    value: 'Đất tư nhân/Nhà ở riêng lẻ',
    defaultChecked: false,
  },
  {
    name: 'Trung tâm thương mại',
    value: 'Trung tâm thương mại',
    defaultChecked: false,
  },
  {
    name: 'Chợ',
    value: 'Chợ',
    defaultChecked: false,
  },
  {
    name: 'Cây xăng',
    value: 'Cây xăng',
    defaultChecked: false,
  },
  {
    name: 'Nhà chờ xe buýt',
    value: 'Nhà chờ xe buýt',
    defaultChecked: false,
  },
];
