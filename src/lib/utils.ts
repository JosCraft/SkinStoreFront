import { Tipo } from '../components/interface/interface';

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}


export const filterItems = (originalItems:Tipo[], selectedCategoria:number , selectedCurtiembre:number ) => {
  let filteredItems = originalItems;

  if (selectedCategoria !== -1) {
    filteredItems = filteredItems.filter(item => item.idCategoria === selectedCategoria);
 
  }

  if (selectedCurtiembre !== -1) {
    filteredItems = filteredItems.filter(item => item.idCurtiembre === selectedCurtiembre);
   
  }

  return filteredItems;
}
