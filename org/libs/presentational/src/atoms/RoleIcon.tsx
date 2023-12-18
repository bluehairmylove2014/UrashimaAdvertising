import WardOfficerIcon from '@assets/wardofficer.png';
import DistrictOfficerIcon from '@assets/districtofficer.png';
import HeadQuaterIcon from '@assets/hqofficer.png';
import Image from 'next/image';

export type roleIconType = 'WardOfficer' | 'DistrictOfficer' | 'HeadQuater';

const roleIcon = {
  WardOfficer: {
    icon: WardOfficerIcon,
    label: 'Cán bộ phường',
  },
  DistrictOfficer: {
    icon: DistrictOfficerIcon,
    label: 'Cán bộ quận',
  },
  HeadQuater: {
    icon: HeadQuaterIcon,
    label: 'Cán bộ sở VH - TT',
  },
};

function RoleIcon({ role }: { role: roleIconType }) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Image src={roleIcon[role].icon} alt={role} width={50} height={50} />
      <span className="text-xs font-medium">{roleIcon[role].label}</span>
    </div>
  );
}

export default RoleIcon;
