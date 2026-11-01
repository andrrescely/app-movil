import { Component, input, OnInit, inject } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  IonBadge,
  IonItem,
  IonCard,          
  IonCardHeader,    
  IonCardTitle,     
  IonCardContent
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import emailjs from 'emailjs-com';
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
    IonCard,        
    IonCardHeader,  
    IonCardTitle,   
    IonCardContent,
    IonIcon,
    IonBadge,
    IonItem,
    FormsModule,
    ReactiveFormsModule,
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

  public suscripcionForm!: FormGroup;

  private fb = inject(FormBuilder);
  private servicePelicula = inject(Datos);

  constructor() {
    addIcons({ closeOutline, starOutline });
  }

  ngOnInit(): void {
    const listaActual = this.servicePelicula.obtenerLista();
    if (listaActual.length > 0) {
      this.peliculas = listaActual;
    } else {
      this.servicePelicula.consultarPeliculasAPI().subscribe({
        next: (response) => {
          this.peliculas = response.results.map((item: any) => ({
            id: item.id,
            title: item.title,
            poster_path: item.poster_path 
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
              : 'https://via.placeholder.com/500x750?text=Sin+Imagen',
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

    this.suscripcionForm = this.fb.group({
      nombre: ['', [Validators.required]],   
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  public suscribirse(): void {
    if (this.suscripcionForm.valid) {
      const datosSuscripcion = this.suscripcionForm.value;

      const templateParams = {
        to_name: datosSuscripcion.nombre,
        to_email: datosSuscripcion.correo
      };

      emailjs.send('service_h2yibu4', 'template_zjqbbpb', templateParams, 'Df7NfnfMIDPAB5sCL')
        .then((response) => {
           console.log('Correo enviado con éxito!', response.status, response.text);
           alert(`¡Gracias ${datosSuscripcion.nombre}! Te has suscrito correctamente y se ha enviado un correo a ${datosSuscripcion.correo}.`);
           this.suscripcionForm.reset();
        }, (error) => {
           console.error('Error al enviar el correo:', error);
           alert('Hubo un error al enviar el correo. Revisa la consola.');
        });
    }
  }

  public guardarPadre(pelicula: Pelicula): void {
    pelicula.seleccionada = true;
    this.servicePelicula.agregarService(pelicula);
    
    this.servicePelicula.guardarPeliculaAPI(pelicula).subscribe({
      next: (res) => console.log('POST exitoso:', res),
      error: (err) => console.error('Error en el POST:', err)
    });
  }

  public quitarFavorita(pelicula: Pelicula): void {
    pelicula.seleccionada = false;
    this.servicePelicula.quitarService(pelicula);
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