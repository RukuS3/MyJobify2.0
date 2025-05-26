import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
})
export class ContactanosPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
