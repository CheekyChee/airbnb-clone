'use client';
import { FC, Fragment, useCallback, useState } from 'react';
import { TSafeReservation, TSafeUser } from '../types';
import Container from '../components/Container';
import { Heading } from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ListingCard } from '../components/listings/ListingCard';

export interface TripsClientProps {
  reservations: TSafeReservation[];
  currentUser: TSafeUser | null;
}

export const TripsClient: FC<TripsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled');
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong');
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where have you been and where you're going?"
      />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              onAction={onCancel}
              actionId={reservation.id}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel Reservation"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};
