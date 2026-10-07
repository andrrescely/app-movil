import { Injectable } from '@angular/core';
import { Pelicula } from '../interfaces/pelicula.model';

@Injectable({
  providedIn: 'root'
})
export class Datos {
  private listaPeliculas: Pelicula[] = [
    {
      id: 1,
      titulo: 'Up',
      poster: 'https://i.pinimg.com/236x/8f/7f/cd/8f7fcdb8804bcd69a48aad5c91dd9aaf.jpg',
      año: 2009,
      seleccionada: false,
      rating: { rate: 4.8, count: 2500 },
      descripcion: 'Up (titulada Up: Una aventura de altura en Hispanoamérica) es una película de animación de Pixar estrenada en 2009 y dirigida por Pete Docter'
    },
    {
      id: 2,
      titulo: 'El caballero oscuro',
      poster: 'https://hips.hearstapps.com/es.h-cdn.co/fotoes/images/media/imagenes/reportajes/los-20-posters-de-peliculas-mas-creativos/caballero-oscuro-joker/7055604-1-esl-ES/CABALLERO-OSCURO-JOKER.jpg',
      año: 2008,
      seleccionada: false,
      rating: { rate: 4.8, count: 2500 },
      descripcion: 'El caballero oscuro (The Dark Knight, 2008) es una película de acción y drama dirigida por Christopher Nolan que sigue a Batman mientras enfrenta al caótico y sádico Joker'
    },
    {
      id: 3,
      titulo: 'Lo Imposible',
      poster: 'https://imagenes.20minutos.es/files/image_640_auto/uploads/imagenes/2023/02/07/lo-imposible-j-a-bayona-2012.jpeg',
      año: 2012,
      seleccionada: false,
      rating: { rate: 4.8, count: 2500 },
      descripcion: 'Lo Imposible (2012), dirigida por J.A. Bayona, es un drama de catástrofes basado en la historia real de una familia española que survived al devastador tsunami en el océano Índico en diciembre de 2004'
    },
    {
      id: 4,
      titulo: 'Jumanji',
      poster: 'https://i.pinimg.com/236x/4b/c6/f0/4bc6f0460257639823de408c2136106e.jpg',
      año: 2017,
      seleccionada: false,
      rating: { rate: 4.8, count: 2500 },
      descripcion: 'Jumanji: En la selva (Jumanji: Welcome to the Jungle, 2017) es una comedia de aventuras y acción protagonizada por Dwayne Johnson La Roca dirigida por Jake Kasdan.'
    },
    {
      id: 5,
      titulo: 'Socias por accidente',
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbQwvCDhGvoiKMSV8PMiuSFE1X0BKn6J8v_F4OwfPgkmtq9jp6dJGEBCh1&s=10',
      año: 2026,
      seleccionada: false,
      rating: { rate: 4.8, count: 2500 },
      descripcion: 'Socias por accidente es una comedia mexicana de 2026 dirigida por Ihtzi Hurtado'
    },
    {
      id: 6,
      titulo: 'Elemental',
      poster: 'https://lumiere-a.akamaihd.net/v1/images/image_def91c72.jpeg?region=0,0,540,810&width=480',
      año: 2023,
      seleccionada: false,
      rating: { rate: 4.8, count: 2500 },
      descripcion: 'Elemental (titulada Elementos en Hispanoamérica) es una película animada de Disney y Pixar dirigida por Peter Sohn'
    },
    {
      id: 7,
      titulo: 'El Rey León',
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_OEgITUPAMEYUbwNfwUIVi8_n9K4yKueuJuYjAiLD3UwV3_nMWUMk3m0&s=10',
      año: 1994,
      seleccionada: false,
      rating: { rate: 4.8, count: 2500 },
      descripcion: 'El Rey León es una aclamada película de animación de Disney estrenada en 1994 que narra la historia de Simba, un joven león cachorro heredero al trono de la sabana africana'
    },
    {
      id: 8,
      titulo: 'Dragon Ball Z: La Película',
      poster: 'https://www.selecta-vision.com/wp-content/uploads/2025/05/thumbnail_DBZ-13.jpg',
      año: 1995,
      seleccionada: false,
      rating: { rate: 4.8, count: 2500 },
      descripcion: 'Dragon Ball Z: El ataque del dragón (estrenada en 1995) narra la historia de un anciano llamado Hoi que engaña a los Guerreros Z para liberar a Tapion, un noble héroe encerrado en una caja de música, liberando accidentalmente al monstruo gigante Hildegarn'
    },
    {
      id: 9,
      titulo: 'Capitán América: Un Nuevo Mundo',
      poster: 'https://lumiere-a.akamaihd.net/v1/images/image_9d414f1c.jpeg?region=0,0,540,810&width=480',
      año: 2025,
      seleccionada: false,
      rating: { rate: 4.8, count: 2500 },
      descripcion: 'Capitán América: Un Nuevo Mundo es un thriller político de superhéroes de 2025 donde Sam Wilson asume oficialmente el manto del Capitán América y se ve envuelto en una peligrosa conspiración internacional'
    }
  ];

  obtenerLista(): Pelicula[] {
    return this.listaPeliculas;
  }

  obtenerFavoritas(): Pelicula[] {
    return this.listaPeliculas.filter(pelicula => pelicula.seleccionada);
  }

  agregarService(pelicula: Pelicula): void {
    const encontrada = this.listaPeliculas.find(
      item => item.id === pelicula.id
    );

    if (encontrada) {
      encontrada.seleccionada = true;
    }
  }

  quitarService(pelicula: Pelicula): void {
    const encontrada = this.listaPeliculas.find(
      item => item.id === pelicula.id
    );

    if (encontrada) {
      encontrada.seleccionada = false;
    }
  }
}