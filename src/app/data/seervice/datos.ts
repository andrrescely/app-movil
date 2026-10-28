import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pelicula } from '../interfaces/pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class Datos {
  
  private listaPeliculasService: Pelicula[] = [];
  private http = inject(HttpClient);
  
  private url = 'https://api.themoviedb.org/3/movie/popular?api_key=c2f13e80292869683c5c8d9668f4b909&language=es-ES';
  private urlPost = 'https://jsonplaceholder.typicode.com/posts';

  constructor() {}

  // Inicializa o sincroniza la lista completa en memoria
  guardarListaCompleta(peliculas: Pelicula[]): void {
    if (this.listaPeliculasService.length === 0) {
      this.listaPeliculasService = peliculas;
    }
  }

  obtenerLista(): Pelicula[] {
    return this.listaPeliculasService;
  }

  // Retorna únicamente las que tienen seleccionada = true
  obtenerFavoritas(): Pelicula[] {
    return this.listaPeliculasService.filter(p => p.seleccionada);
  }

  // Alterna o actualiza el estado de selección de una película por su ID
  agregarService(pelicula: Pelicula): void {
    const item = this.listaPeliculasService.find(p => p.id === pelicula.id);
    if (item) {
      item.seleccionada = true;
    }
  }

  quitarService(pelicula: Pelicula): void {
    const item = this.listaPeliculasService.find(p => p.id === pelicula.id);
    if (item) {
      item.seleccionada = false; // Solo apaga la estrella, no la borra del catálogo principal
    }
  }

  consultarPeliculasAPI(): Observable<Pelicula[]> {
    return this.http.get<any>(this.url).pipe(
      map(response => {
        const nuevasPeliculas = response.results.map((item: any) => ({
          id: item.id,
          titulo: item.title,
          poster: item.poster_path 
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
            : 'https://via.placeholder.com/500x750?text=Sin+Imagen',
          anio: item.release_date ? new Date(item.release_date).getFullYear() : 2026,
          seleccionada: false,
          descripcion: item.overview || 'Sin descripción disponible',
          rating: {
            rate: item.vote_average || 0,
            count: item.vote_count || 0
          }
        }));

        // Si ya teníamos elementos guardados en memoria, respetamos su estado de favoritos
        if (this.listaPeliculasService.length > 0) {
          return this.listaPeliculasService;
        }

        this.listaPeliculasService = nuevasPeliculas;
        return this.listaPeliculasService;
      })
    );
  }

  guardarPeliculaAPI(pelicula: Pelicula): Observable<any> {
    return this.http.post<any>(this.urlPost, pelicula);
  }
}