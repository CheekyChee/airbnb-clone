import ClientOnly from '../components/ClientOnly';
import { EmptyState } from '../components/EmptyState';

import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservation';

import ReservationsClient from './ReservationsClient';

const Reservations = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ authorId: currentUser?.id });

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subTitle="Please login" />
      </ClientOnly>
    );
  }

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subTitle="Look like you have no reservations on your properties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default Reservations;
