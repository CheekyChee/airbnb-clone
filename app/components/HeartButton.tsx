'use client';
import { FC } from 'react';
import { TSafeUser } from '../types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavorite from '../hooks/useFavorite';

export interface HeartButtonProps {
  listingId: string;
  currentUser?: TSafeUser | null;
}

export const HeartButton: FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  // const hasFavorite = currentUser?.favoriteIds?.includes(listingId);
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className="relative transition cursor-pointer hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />

      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500'}
      />
    </div>
  );
};
