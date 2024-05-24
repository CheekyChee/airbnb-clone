'use client';

import { FC, useEffect, useState } from 'react';

interface IClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: FC<IClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div>
      <>{children}</>
    </div>
  );
};

export default ClientOnly;
