import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // [MODIFICADO PARA API]: Importado map para transformar la respuesta
import { Pelicula } from '../interfaces/pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class Datos {
  
  private listaPeliculasService: Pelicula[] = [];
  private http = inject(HttpClient);
  
  // URL de TMDb (asegúrate de colocar tu API Key real)
  private url = 'https://api.themoviedb.org/3/movie/popular?api_key=c2f13e80292869683c5c8d9668f4b909&language=es-ES';

  constructor() {}

  agregarService(pelicula: Pelicula): void {
    this.listaPeliculasService.push(pelicula);
  }

  quitarService(pelicula: Pelicula): void {
    const index = this.listaPeliculasService.indexOf(pelicula);
    if (index > -1) {
      this.listaPeliculasService.splice(index, 1);
    }
  }

  obtenerLista(): Pelicula[] {
    return this.listaPeliculasService;
  }

  obtenerFavoritas(): Pelicula[] {
    return this.listaPeliculasService.filter(p => p.seleccionada);
  }

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
}