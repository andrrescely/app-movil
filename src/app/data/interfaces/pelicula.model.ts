import { Rating } from './rating.model';

export interface Pelicula {
  id: number;
  titulo: string;
  poster: string;
  anio: number;
  seleccionada: boolean;
  descripcion?: string;
  rating?: Rating;
}