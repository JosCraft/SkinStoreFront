import { atom } from 'jotai';
import { Tipo, Car, MaterialCar} from '../components/interface/interface';


export const itemsAtom = atom<Tipo[]>([]);
export const selectedCurtiembreAtom = atom<number>(-1);
export const selectedCategoriaAtom = atom<number>(-1);
export const selectedTipoAtom = atom<number>(-1);
export const priceTotalAtom = atom<number>(0);
export const listCarAtom = atom<Car>();
export const listMaterialAtom = atom<MaterialCar[]>([]);
