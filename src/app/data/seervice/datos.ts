import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  consultarPeliculasAPI(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  guardarPeliculaAPI(pelicula: Pelicula): Observable<any> {
    return this.http.post<any>(this.urlPost, pelicula);
  }

  agregarService(pelicula: Pelicula): void {
    const item = this.listaPeliculasService.find(p => p.id === pelicula.id);
    if (item) {
      item.seleccionada = true;
    }
  }

  quitarService(pelicula: Pelicula): void {
    const item = this.listaPeliculasService.find(p => p.id === pelicula.id);
    if (item) {
      item.seleccionada = false;
    }
  }

  obtenerLista(): Pelicula[] {
    return this.listaPeliculasService;
  }

  obtenerFavoritas(): Pelicula[] {
    return this.listaPeliculasService.filter(p => p.seleccionada);
  }

  guardarListaCompleta(peliculas: Pelicula[]): void {
    this.listaPeliculasService = peliculas;
  }
}