import { Component, OnInit, Injectable } from '@angular/core';
import { EmitterService } from '../../services/emitter.service';

// Interface para fotos por album
export interface AlbumPhotos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class AlbumViewComponent implements OnInit {

  // Inmterfaces/Modelos
  listAlbumPhotos: AlbumPhotos[];

  // URL's
  private urlPhotos = 'https://jsonplaceholder.typicode.com/photos/';

  constructor() {}

  ngOnInit() {
    EmitterService.listAlbumPhotosEmitter.subscribe((data: AlbumPhotos[]) => {
      this.listAlbumPhotos = data;
    });
  }
}
