import React, { ReactNode } from 'react';
import { JsxElement } from 'typescript';
interface IPopulate {
  item: ReactNode;
  howMany: number;
}

function populateJSX({ item, howMany }: IPopulate) {
  const store: ReactNode[] = [];
  for (let f = 0; f < howMany; f++) {
    store.push(item);
  }
  return store;
}

export default populateJSX;
