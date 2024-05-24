import { Listing, Reservation, User } from '@prisma/client';

export type TSafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type TSafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type TSafeReservation = Omit<
  Reservation,
  'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: TSafeListing;
};
