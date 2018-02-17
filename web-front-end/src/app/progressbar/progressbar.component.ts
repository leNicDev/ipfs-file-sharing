import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ipfs-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

  @Input() value = 0;


  constructor() { }

  ngOnInit() {
  }

}
