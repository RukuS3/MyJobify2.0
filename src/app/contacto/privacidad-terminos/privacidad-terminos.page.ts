import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacidad-terminos',
  templateUrl: './privacidad-terminos.page.html',
  styleUrls: ['./privacidad-terminos.page.scss'],
})
export class PrivacidadTerminosPage implements OnInit {


  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
