'use client';
import { OFFICER_PAGES } from '@constants/officerPages';
import IconButton from '@presentational/atoms/IconButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function OfficerNavAvatar() {
  const router = useRouter();
  return (
    <IconButton
      type="button"
      shape="circle"
      callback={() => {
        router.push(OFFICER_PAGES.ME);
      }}
      customSize="2rem"
    >
      <Image
        src={
          'https://urashima.sirv.com/UrashimaAds%20Hub/defaultAvatars/avatar_default_1.png'
        }
        alt="user"
        fill
        sizes="2rem"
      />
    </IconButton>
  );
}

export default OfficerNavAvatar;
