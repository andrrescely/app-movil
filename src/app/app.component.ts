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
    { title: 'Suscríbete', url: '/folder/suscripcion', icon: 'mail' },
  ];

  constructor() {
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