import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  listingId?: string;
}

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: IParams;
  }
) {
  const currentUser = await getCurrentUser();
  const { listingId } = params;

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid listingId');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favoriteIds,
    },
  });

  return NextResponse.json(user);
}

//* delete favorite

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: IParams;
  }
) {
  const currentUser = await getCurrentUser();
  const { listingId } = params;

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid listingId');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favoriteIds,
    },
  });

  return NextResponse.json(user);
}
