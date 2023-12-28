import { modernSelectOptionType } from '@presentational/atoms/ModernSelect';

export const ADS_FORM: modernSelectOptionType[] = [
  {
    name: 'Tất cả hình thức',
    value: null,
    defaultChecked: true,
  },
  {
    name: 'Cổ động chính trị',
    value: 'Cổ động chính trị',
    defaultChecked: false,
  },
  {
    name: 'Quảng cáo thương mại',
    value: 'Quảng cáo thương mại',
    defaultChecked: false,
  },
  {
    name: 'Xã hội hoá',
    value: 'Xã hội hoá',
    defaultChecked: false,
  },
];
