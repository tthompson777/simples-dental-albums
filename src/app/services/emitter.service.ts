import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

export class EmitterService {
  static listAlbumPhotosEmitter = new EventEmitter();
  static listPhotoEmitter = new EventEmitter();
}
