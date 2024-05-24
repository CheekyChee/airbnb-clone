'use client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Heading } from './Heading';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

export const EmptyState: FC<EmptyStateProps> = ({
  title = 'No results found.',
  subTitle = 'Try adjusting your search or filter to find what you are looking for.',
  showReset = false,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subTitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filter"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  );
};
