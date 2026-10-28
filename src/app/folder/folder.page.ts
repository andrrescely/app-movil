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
    // Si ya hay datos en el servicio, los recuperamos de inmediato para que no se pierdan al navegar
    const listaActual = this.servicePelicula.obtenerLista();
    if (listaActual.length > 0) {
      this.peliculas = listaActual;
    } else {
      // Si no, consumimos la API por primera vez
      this.servicePelicula.consultarPeliculasAPI().subscribe({
        next: (data) => {
          this.peliculas = data;
          // Guardamos cada una en el servicio para mantener el estado en memoria
          data.forEach(p => this.servicePelicula.agregarService(p));
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
    
    // Ejemplo del uso del método POST que enseñó el profesor
    this.servicePelicula.guardarPeliculaAPI(pelicula).subscribe({
      next: (res) => console.log('Guardado en servidor con POST exitosamente:', res),
      error: (err) => console.error('Error en el POST:', err)
    });
  }

  public quitarFavorita(pelicula: Pelicula): void {
    pelicula.seleccionada = false;
    this.servicePelicula.quitarService(pelicula);
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
      p.titulo.toLowerCase().includes(busqueda)
    );
  }

  public get peliculasSeleccionadas(): Pelicula[] {
    return this.servicePelicula.obtenerFavoritas();
  }
}