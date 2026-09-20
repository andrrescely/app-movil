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
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { filmOutline, filmSharp, film, filmSharp as filmIcon } from 'ionicons/icons';
import { IonNote } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonNote, 
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
    { title: 'Mis Favoritas', url: '/folder/favoritas', icon: 'heart' },
  ];

  constructor() {
    addIcons({ filmOutline, filmSharp, film });
  }
}