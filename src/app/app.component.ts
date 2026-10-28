import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { 
  IonApp, 
  IonSplitPane, 
  IonMenu, 
  IonContent, 
  IonList, 
  IonListHeader, 
  IonMenuToggle, 
  IonItem, 
  IonIcon, 
  IonLabel, 
  IonRouterOutlet, 
  IonRouterLink,
  IonNote
} from '@ionic/angular';
import { addIcons } from 'ionicons';
// Importamos también las versiones sharp que Ionic busca por debajo
import { 
  film, 
  filmOutline, 
  filmSharp, 
  star, 
  starOutline, 
  starSharp, 
  tv, 
  tvOutline, 
  tvSharp 
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    IonNote, 
    RouterLink, 
    RouterLinkActive, 
    IonApp, 
    IonSplitPane, 
    IonMenu, 
    IonContent, 
    IonList, 
    IonListHeader, 
    IonMenuToggle, 
    IonItem, 
    IonIcon, 
    IonLabel, 
    IonRouterLink, 
    IonRouterOutlet
  ],
})
export class AppComponent {
  protected readonly appPages = [
    { title: 'Películas', url: '/folder/Peliculas', icon: 'film' },
    { title: 'Mis Favoritas', url: '/folder/favoritas', icon: 'star' },
    { title: 'Series', url: '/folder/series', icon: 'tv' },
  ];

  constructor() {
    // Registramos todas las variantes para que Ionic no falle nunca
    addIcons({ 
      film, 
      filmOutline, 
      filmSharp, 
      star, 
      starOutline, 
      starSharp, 
      tv, 
      tvOutline, 
      tvSharp 
    });
  }
}