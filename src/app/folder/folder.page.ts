import { Component, input } from '@angular/core';
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
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonNote,
  IonModal,
  IonIcon
} from '@ionic/angular';
import { Pelicula } from './pelicula.model';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [IonModal, IonIcon, 
    IonHeader, 
    IonToolbar, 
    IonButtons, 
    IonMenuButton, 
    IonTitle, 
    IonContent, 
    IonButton, 
    IonInput, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonNote,
    FormsModule,
    IonModal
  ],
})
export class FolderPage {
  readonly folder = input.required<string>();

  public filtroBusqueda: string = '';
  public deshabilitarFiltro: boolean = false;

  public modalAbierto: boolean = false;
  public peliculaParaModal: Pelicula | null =null;

  public peliculas: Pelicula[] = [
    { id: 1, titulo: 'Up', poster: 'https://i.pinimg.com/236x/8f/7f/cd/8f7fcdb8804bcd69a48aad5c91dd9aaf.jpg', año: 2010, seleccionada: false },
    { id: 2, titulo: 'El caballero oscuro', poster: 'https://hips.hearstapps.com/es.h-cdn.co/fotoes/images/media/imagenes/reportajes/los-20-posters-de-peliculas-mas-creativos/caballero-oscuro-joker/7055604-1-esl-ES/CABALLERO-OSCURO-JOKER.jpg', año: 2014, seleccionada: false },
    { id: 3, titulo: 'Lo Imposible',poster: 'https://imagenes.20minutos.es/files/image_640_auto/uploads/imagenes/2023/02/07/lo-imposible-j-a-bayona-2012.jpeg', año: 2012, seleccionada: false},
    { id: 4, titulo: 'Jumanji', poster: 'https://i.pinimg.com/236x/4b/c6/f0/4bc6f0460257639823de408c2136106e.jpg', año: 2017, seleccionada: false },
    { id: 5, titulo: 'Socias por accidente', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbQwvCDhGvoiKMSV8PMiuSFE1X0BKn6J8v_F4OwfPgkmtq9jp6dJGEBCh1&s=10', año: 2020, seleccionada: false },
    { id: 6, titulo: 'Elemental', poster: 'https://lumiere-a.akamaihd.net/v1/images/image_def91c72.jpeg?region=0,0,540,810&width=480', año: 2023, seleccionada: false },
    { id: 7, titulo: 'El Rey León', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_OEgITUPAMEYUbwNfwUIVi8_n9K4yKueuJuYjAiLD3UwV3_nMWUMk3m0&s=10', año: 1994, seleccionada: false },
    { id: 8, titulo: 'Dragon Ball Z: La Película', poster: 'https://www.selecta-vision.com/wp-content/uploads/2025/05/thumbnail_DBZ-13.jpg', año: 1995, seleccionada: false },
    { id: 9, titulo: 'Capitán América: Un Nuevo Mundo', poster: 'https://lumiere-a.akamaihd.net/v1/images/image_9d414f1c.jpeg?region=0,0,540,810&width=480', año: 2025, seleccionada: false }
  ];

  constructor() {
    addIcons({ closeOutline });
  }

  public abrirModal(pelicula: Pelicula): void {
    this.peliculaParaModal = pelicula;
    this.modalAbierto = true;
  }

  
  public cerrarModal(): void {
    this.modalAbierto = false;
    this.peliculaParaModal = null;
  }

  public seleccionarPelicula(pelicula: Pelicula): void {
    pelicula.seleccionada = !pelicula.seleccionada;
  }

  public alternarEstadoFiltro(): void {
    this.deshabilitarFiltro = !this.deshabilitarFiltro;
  }

  public get peliculasFiltradas(): Pelicula[] {
    return this.peliculas.filter(p => 
      p.titulo.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
    );
  }

  public get peliculasSeleccionadas(): Pelicula[] {
    return this.peliculas.filter(p => p.seleccionada);
  }
}