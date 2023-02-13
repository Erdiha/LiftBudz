import React from 'react';
import Card from './SegmentCards';
import { IPexelImages } from '@/pages/types';
import { titleANDdescFeatures } from '@/utils/texts';

function MainpageSegments({ data }: IPexelImages) {
  return (
    <section className="bg-gray-100 py-8">
      <div className="mx-auto max-w-screen-xl px-4">
        <h2 className="text-3xl font-medium text-center mb-6">
          Discover the Power of Our Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
          {data?.photos &&
            titleANDdescFeatures.map((feature, index) => (
              <div key={data?.photos[index]?.id}>
                <Card
                  feature={feature}
                  data={data?.photos[index]?.src?.original.toString()}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default MainpageSegments;
