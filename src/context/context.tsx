import { atom } from 'jotai';
import { Tipo, Curtiembre } from '../components/interface/interface';


export const itemsAtom = atom<Tipo[]>([]);
export const selectedCurtiembreAtom = atom<Curtiembre | null>(null);
