import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IChartDataSet } from 'src/app/models/ChartDataPoint';

@Component({
  selector: 'app-measurement-chart',
  templateUrl: './measurement-chart.component.html',
  styleUrls: ['./measurement-chart.component.scss']
})
export class MeasurementChartComponent implements OnInit {
  title: string;
  deviceFk: number;
  dataset: IChartDataSet;
  constructor(public modalRef: BsModalRef, ) { }
  ngOnInit() {

  }

}
