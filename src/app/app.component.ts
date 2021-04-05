import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../app/_models';

export interface Thumbnail {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  currentUser: User;

  constructor(public location: Location) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.currentUser;
  }
}
