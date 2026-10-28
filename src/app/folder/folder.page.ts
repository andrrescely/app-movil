import { Component, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonNote,
  IonModal,
  IonIcon,
  IonBadge
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import { closeOutline, starOutline } from 'ionicons/icons';
import { Pelicula } from '../data/interfaces/pelicula.model';
import { Datos } from '../data/seervice/datos';
import { PeliculaCardComponent } from '../componentes/pelicula-card/pelicula-card.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonNote,
    IonModal,
    IonIcon,
    IonBadge,
    FormsModule,
    PeliculaCardComponent
  ]
})
export class FolderPage implements OnInit {
  readonly folder = input.required<string>();
  
  public filtroBusqueda: string = '';
  public deshabilitarFiltro: boolean = false;
  public modalAbierto: boolean = false;
  public peliculaParaModal: Pelicula | null = null;
  public peliculas: Pelicula[] = [];

  constructor(private servicePelicula: Datos) {
    addIcons({ closeOutline, starOutline });
  }

  ngOnInit(): void {
    const listaActual = this.servicePelicula.obtenerLista();
    if (listaActual.length > 0) {
      this.peliculas = listaActual;
    } else {
      // Consumimos el GET básico de la API
      this.servicePelicula.consultarPeliculasAPI().subscribe({
        next: (response) => {
          // Adaptamos los resultados de TMDb al modelo
          this.peliculas = response.results.map((item: any) => ({
            id: item.id,
            title: item.title,
            poster_path: item.poster_path 
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
              : 'https://via.placeholder.com/500x750?text=Sin+Imagen',
            // Extraemos solo el año de forma segura (ej. "2026")
            release_date: item.release_date ? item.release_date.split('-')[0] : '2026',
            seleccionada: false,
            overview: item.overview,
            vote_average: item.vote_average,
            vote_count: item.vote_count
          }));
          
          this.servicePelicula.guardarListaCompleta(this.peliculas);
        },
        error: (error) => {
          console.error('Error al consumir el API de películas:', error);
        }
      });
    }
  }

  public guardarPadre(pelicula: Pelicula): void {
    pelicula.seleccionada = true;
    this.servicePelicula.agregarService(pelicula);
    
    // Método POST requerido por la rúbrica
    this.servicePelicula.guardarPeliculaAPI(pelicula).subscribe({
      next: (res) => console.log('POST exitoso:', res),
      error: (err) => console.error('Error en el POST:', err)
    });
  }

  public quitarFavorita(pelicula: Pelicula): void {
    pelicula.seleccionada = false;
    this.servicePelicula.quitarService(pelicula);
    // Forzamos la actualización local de la vista
    this.peliculas = [...this.servicePelicula.obtenerLista()];
  }

  public alternarEstadoFiltro(): void {
    this.deshabilitarFiltro = !this.deshabilitarFiltro;
  }

  public abrirModal(pelicula: Pelicula): void {
    this.peliculaParaModal = pelicula;
    this.modalAbierto = true;
  }

  public cerrarModal(): void {
    this.modalAbierto = false;
    this.peliculaParaModal = null;
  }

  public get peliculasFiltradas(): Pelicula[] {
    const busqueda = (this.filtroBusqueda ?? '').trim().toLowerCase();
    return this.peliculas.filter(p => 
      p.title.toLowerCase().includes(busqueda)
    );
  }

  public get peliculasSeleccionadas(): Pelicula[] {
    return this.servicePelicula.obtenerFavoritas();
  }
}