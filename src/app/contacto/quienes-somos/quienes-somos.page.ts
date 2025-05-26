import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.page.html',
  styleUrls: ['./quienes-somos.page.scss'],
})
export class QuienesSomosPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}
