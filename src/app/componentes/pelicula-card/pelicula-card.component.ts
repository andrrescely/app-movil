import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonButton 
} from '@ionic/angular';
import { Pelicula } from '../../data/interfaces/pelicula.model';

@Component({
  selector: 'app-pelicula-card',
  templateUrl: './pelicula-card.component.html',
  styleUrls: ['./pelicula-card.component.scss'],
  standalone: true,
  imports: [
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent, 
    IonButton
  ],
})
export class PeliculaCardComponent implements OnInit {

  @Input({ required: true }) pelicula!: Pelicula;
  @Input() esSeleccionada: boolean = false;
  @Input() textoBoton: string = 'Seleccionar';

  @Output() seleccionar = new EventEmitter<Pelicula>();
  @Output() verDetalle = new EventEmitter<Pelicula>();

  constructor() { }

  ngOnInit() {}

  onAccionBoton(): void {
    this.seleccionar.emit(this.pelicula);
  }

  onAbrirModal(): void {
    this.verDetalle.emit(this.pelicula);
  }
}