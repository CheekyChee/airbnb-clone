import Container from '@/app/components/Container';

import getListings, { IListingsParams } from '@/app/actions/getListings';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from './components/ClientOnly';
import { EmptyState } from './components/EmptyState';
import { ListingCard } from './components/listings/ListingCard';

interface HomeProps {
  searchParams: IListingsParams;
}
export const dynamic = 'force-dynamic';
const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
