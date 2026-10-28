export interface Pelicula {
  id: number;
  title: string;        
  poster_path: string;  
  release_date: string; 
  seleccionada?: boolean;
  overview?: string;    
  vote_average?: number;
  vote_count?: number;
}