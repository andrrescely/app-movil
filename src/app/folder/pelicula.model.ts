export interface Pelicula {
  id: number;
  titulo: string;
  poster: string;
  año: number;
  seleccionada: boolean;
  descripcion? : string;
}