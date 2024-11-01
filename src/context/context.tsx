import { atom } from 'jotai';
import { Tipo } from '../components/interface/interface';

export const itemsAtom = atom<Tipo[]>([]);