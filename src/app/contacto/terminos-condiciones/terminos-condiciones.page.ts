import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.page.html',
  styleUrls: ['./terminos-condiciones.page.scss'],
})
export class TerminosCondicionesPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }


  goBack() {
    this.location.back();
  }
}
