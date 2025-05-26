import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],

})
export class InformacionPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
