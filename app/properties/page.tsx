import ClientOnly from '@/app/components/ClientOnly';

import getCurrentUser from '@/app/actions/getCurrentUser';
import getListings from '@/app/actions/getListings';

import PropertiesClient from './PropertiesClient';
import { EmptyState } from '../components/EmptyState';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subTitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
