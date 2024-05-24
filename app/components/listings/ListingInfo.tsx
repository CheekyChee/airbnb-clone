'use client';

import useCountries from '@/app/hooks/useCountry';
import { TSafeUser } from '@/app/types';
import { FC, Fragment } from 'react';
import { IconType } from 'react-icons/lib';
import { Avatar } from '../Avatar';
import { ListingCategory } from './ListingCategory';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map').then((mod) => mod.Map), {
  ssr: false,
});
export interface ListingInfoProps {
  user: TSafeUser;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}

export const ListingInfo: FC<ListingInfoProps> = ({
  user,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
  category,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="flex flex-col col-span-4 gap-8 ">
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          Hosted by {user?.name}
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
        <hr />
        {category && (
          <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
          />
        )}
        <hr />
        <div className="text-lg font-light text-neutral-500">{description}</div>
        <hr />
        <Map center={coordinates} />
      </div>
    </div>
  );
};
