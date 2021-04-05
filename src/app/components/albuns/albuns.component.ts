import { Component, OnInit, Output, Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmitterService } from '../../services/emitter.service';

export interface Albums {
  userId: number;
  id: number;
  title: string;
  thumbnail?: Thumbnail;
}

export interface Thumbnail {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface AlbumPhotos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-albuns',
  templateUrl: './albuns.component.html',
  styleUrls: ['./albuns.component.css'],
})

@Injectable({
  providedIn: 'root',
})

export class AlbunsComponent implements OnInit {

  constructor(private http: HttpClient) {}

  // URL's
  private urlAlbums = 'https://jsonplaceholder.typicode.com/albums/';

  // Inmterfaces/Modelos
  listAllAlbums: Albums[];
  listAlbumPhotos: AlbumPhotos[];

  // Obtendo todos os albums
  giveAllAlbums() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/albums';
    return this.http.get(apiUrl).subscribe((responseData: Albums[]) => {
      return (this.listAllAlbums = responseData);
    });
  }

  // Obtendo fotos por album
  public givePhotosToAlbums(id: number) {
    this.http.get(`${this.urlAlbums}${id}/photos`).subscribe((responseData: AlbumPhotos[]) => {
      (this.listAlbumPhotos = responseData);
      EmitterService.listAlbumPhotosEmitter.emit(this.listAlbumPhotos);
    });
  }

  ngOnInit() {
    this.giveAllAlbums();
  }
}
