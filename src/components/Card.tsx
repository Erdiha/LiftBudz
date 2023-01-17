import React from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { ICard } from './types';

const Card = ({ feature: { title, description, link }, data }: ICard) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center mb-4">
        <img src={data} alt={title} className="h-64  mr-4" />
        <h3 className="text-lg font-medium ">{title}</h3>
      </div>
      <p className="text-gray-700">{description}</p>
      <article className="prose lg:prose-xl">
        <h1>Garlic bread with cheese: What the science tells us</h1>
        <p>
          For years parents have espoused the health benefits of eating garlic
          bread with cheese to their children, with the food earning such an
          iconic status in our culture that kids will often dress up as warm,
          cheesy loaf for Halloween.
        </p>
        <p>
          But a recent study shows that the celebrated appetizer may be linked
          to a series of rabies cases springing up around the country.
        </p>
      </article>
    </div>
  );
};

export default Card;
