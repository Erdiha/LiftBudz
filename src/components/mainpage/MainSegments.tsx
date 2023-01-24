import React from 'react';
import Card from '@/components/user/Card';
import { IPexelImages } from '@/pages/types';
import { titleANDdescFeatures } from '@/utils/texts';

function mainpageSegments({ data }: IPexelImages) {
  console.log('pexel images', data);
  return (
    <section className="bg-gray-100 py-8 w-full">
      <div className="container mx-auto">
        <h2 className="text-3xl font-medium text-center mb-6">
          Discover the Power of Our Features
        </h2>
        <div className="w-full grid grid-rows-3 px-10 gap-20">
          {data?.photos &&
            titleANDdescFeatures.map((feature, index) => (
              <div className="w-full" key={data?.photos[index]?.id}>
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

export default mainpageSegments;
