import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pelicula } from '../interfaces/pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class Datos {
  
  // Arreglo privado en memoria como lo explicó el profesor
  private listaPeliculasService: Pelicula[] = [];
  private http = inject(HttpClient);
  
  // Tu URL exacta de TMDb
  private url = 'https://api.themoviedb.org/3/movie/popular?api_key=c2f13e80292869683c5c8d9668f4b909&language=es-ES';
  
  // URL de prueba para el método POST (similar a la de clase)
  private urlPost = 'https://jsonplaceholder.typicode.com/posts';

  constructor() {}

  // Agregar película a la lista en memoria
  agregarService(pelicula: Pelicula): void {
    if (!this.listaPeliculasService.some(p => p.id === pelicula.id)) {
      this.listaPeliculasService.push(pelicula);
    }
  }

  // Quitar película de la lista en memoria
  quitarService(pelicula: Pelicula): void {
    const index = this.listaPeliculasService.findIndex(p => p.id === pelicula.id);
    if (index > -1) {
      this.listaPeliculasService.splice(index, 1);
    }
  }

  // Obtener toda la lista
  obtenerLista(): Pelicula[] {
    return this.listaPeliculasService;
  }

  // Obtener las favoritas marcadas
  obtenerFavoritas(): Pelicula[] {
    return this.listaPeliculasService.filter(p => p.seleccionada);
  }

  // 1. MÉTODO GET: Consultar el API de películas
  consultarPeliculasAPI(): Observable<Pelicula[]> {
    return this.http.get<any>(this.url).pipe(
      map(response => {
        return response.results.map((item: any) => ({
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
      })
    );
  }

  // 2. MÉTODO POST: Enviar datos al servidor tal como lo explicó el profesor
  guardarPeliculaAPI(pelicula: Pelicula): Observable<any> {
    return this.http.post<any>(this.urlPost, pelicula);
  }
}