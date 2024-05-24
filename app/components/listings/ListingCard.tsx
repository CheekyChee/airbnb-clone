'use client';
import useCountries from '@/app/hooks/useCountry';
import { TSafeListing, TSafeReservation, TSafeUser } from '@/app/types';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useMemo } from 'react';
import { Button } from '../Button';
import { HeartButton } from '../HeartButton';

export interface ListingCardProps {
  data: TSafeListing;
  currentUser: TSafeUser | null;
  reservation?: TSafeReservation;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
  disabled?: boolean;
}

/**
 * This is a TypeScript React component for rendering a listing card with various props and
 * functionality.
 * @param  - - `data`: an object containing information about the listing
 * @returns An empty Fragment.
 */
export const ListingCard: FC<ListingCardProps> = ({
  data,
  currentUser,
  actionId = '',
  actionLabel,
  onAction,
  reservation,
  disabled,
}) => {
  const router = useRouter();

  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col w-full gap-2">
        <div className="relative w-full overflow-hidden aspect-square rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt="listing"
            className="object-cover w-full h-full transition group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500 ">
          {reservationDate || data?.category}
        </div>
        <div className="flex flex-row items-center gap-1 ">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          ></Button>
        )}
      </div>
    </div>
  );
};
