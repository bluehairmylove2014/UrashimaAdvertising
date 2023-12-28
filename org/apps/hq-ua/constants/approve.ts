import { modernSelectOptionType } from '@presentational/atoms/ModernSelect';

export const APPROVE_TIME_FILTER_OPTIONS: modernSelectOptionType[] = [
  {
    name: 'Tất cả thời hạn',
    value: null,
    defaultChecked: true,
  },
  {
    name: 'Đã quá hạn',
    value: 'Đã quá hạn',
    defaultChecked: false,
  },
  {
    name: 'Chưa hoạt động',
    value: 'Chưa hoạt động',
    defaultChecked: false,
  },
  {
    name: 'Đang hoạt động',
    value: 'Đang hoạt động',
    defaultChecked: false,
  },
];
export const APPROVE_STATUS_FILTER_OPTIONS: modernSelectOptionType[] = [
  {
    name: 'Tất cả tình trạng',
    value: null,
    defaultChecked: true,
  },
  {
    name: 'Đang xử lý',
    value: 'inprocess',
    defaultChecked: false,
  },
  {
    name: 'Đã cấp phép',
    value: 'accepted',
    defaultChecked: false,
  },
  {
    name: 'Bị từ chối',
    value: 'rejected',
    defaultChecked: false,
  },
];
