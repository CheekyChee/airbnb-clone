'use client';
import Image from 'next/image';
import { FC, Fragment } from 'react';

export interface AvatarProps {
  src: string | null | undefined;
}

export const Avatar: FC<AvatarProps> = (props) => {
  return (
    <div>
      {' '}
      <Image
        className="rounded-full "
        height={30}
        width={30}
        alt="avatar"
        src={props.src || '/images/placeholder.jpg'}
      />
    </div>
  );
};
