'use client';
import Container from '@/app/components/Container';
import { ListingHead } from '@/app/components/listings/ListingHead';
import { ListingInfo } from '@/app/components/listings/ListingInfo';
import { ListingReservation } from '@/app/components/listings/ListingReservation';
import { categories } from '@/app/components/navbar/Categories';
import useLoginModal from '@/app/hooks/useLoginModal';
import { TSafeListing, TSafeReservation, TSafeUser } from '@/app/types';
import axios from 'axios';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { toast } from 'react-hot-toast';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};
export interface ListingClientProps {
  listing: TSafeListing & {
    user: TSafeUser;
  };
  reservation?: TSafeReservation[];
  currentUser?: TSafeUser | null;
}

export const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservation = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success('Reservation created');
        setDateRange(initialDateRange);
        // redirect
        router.push('/trips');
        router.refresh();
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing.id,
    loginModal,
    router,
    totalPrice,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const disableDates = useMemo(() => {
    let date: Date[] = [];

    reservation.forEach((r) => {
      const range = eachDayOfInterval({
        start: new Date(r.startDate),
        end: new Date(r.endDate),
      });
      date = [...date, ...range];
    });

    return date;
  }, [reservation]);

  const category = useMemo(() => {
    return categories.find((c) => c.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10">
            <ListingInfo
              user={listing.user}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              category={category}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disableDates={disableDates}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>{' '}
    </Container>
  );
};
