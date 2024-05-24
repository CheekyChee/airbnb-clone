import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  // if (!currentUser) return NextResponse.redirect('/login');
  if (!currentUser) return NextResponse.error();

  const body = await request.json();

  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;

  Object.keys(body).forEach((key) => {
    if (!body[key]) return NextResponse.error();
  });

  const listing = await prisma.listing.create({
    data: {
      userId: currentUser.id,
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price: parseInt(price),
      title,
      description,
    },
  });

  // return NextResponse.redirect(`/listings/${listing.id}`);
  return NextResponse.json(listing);
}
