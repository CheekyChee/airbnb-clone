'use client';
import useCountries from '@/app/hooks/useCountry';
import Image from 'next/image';
import { TSafeUser } from '@/app/types';
import { FC, Fragment } from 'react';
import { Heading } from '../Heading';
import { HeartButton } from '../HeartButton';

export interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: TSafeUser | null;
}

export const ListingHead: FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <Fragment>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.value}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative ">
        <Image
          alt="image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </Fragment>
  );
};
