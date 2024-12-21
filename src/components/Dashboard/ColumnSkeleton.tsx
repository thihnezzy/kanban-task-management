import { Skeleton } from '@mantine/core';
import React from 'react';

function ColumnSkeleton(): React.ReactElement {
  return (
    <div className="flex space-x-12">
      {Array.from({ length: 3 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="py-4" key={index}>
          <Skeleton height={30} width={280} className="mb-6" />
          <div className="space-y-4 *:rounded-lg">
            <Skeleton height={70} width={280} className="mb-4" />
            <Skeleton height={70} width={280} className="mb-4" />
            <Skeleton height={70} width={280} className="mb-4" />
            <Skeleton height={70} width={280} className="mb-4" />
            <Skeleton height={70} width={280} className="mb-4" />
            <Skeleton height={70} width={280} className="mb-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ColumnSkeleton;
