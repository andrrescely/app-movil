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
    FormsModule,
    IonBadge,
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
    this.peliculas = this.servicePelicula.obtenerLista();
  }

  public guardarPadre(pelicula: Pelicula): void {
    this.servicePelicula.agregarService(pelicula);
  }

  public quitarFavorita(pelicula: Pelicula): void {
    this.servicePelicula.quitarService(pelicula);
  }

  public abrirModal(pelicula: Pelicula): void {
    this.peliculaParaModal = pelicula;
    this.modalAbierto = true;
  }

  public cerrarModal(): void {
    this.modalAbierto = false;
    this.peliculaParaModal = null;
  }

  public alternarEstadoFiltro(): void {
    this.deshabilitarFiltro = !this.deshabilitarFiltro;
  }

  public get peliculasFiltradas(): Pelicula[] {
    const busqueda = (this.filtroBusqueda ?? '').trim().toLowerCase();

    return this.peliculas.filter(pelicula =>
      pelicula.titulo.toLowerCase().includes(busqueda)
    );
  }

  public get peliculasSeleccionadas(): Pelicula[] {
    return this.servicePelicula.obtenerFavoritas();
  }
}