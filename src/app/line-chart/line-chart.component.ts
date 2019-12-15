import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { IChartDataSet } from '../models/ChartDataPoint';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  chart: Chart;
  @Input('data')
  chartData: IChartDataSet;
  chartNode: HTMLCanvasElement;
  constructor() { }
  update = () => {
    this.chart.data = {
      labels: this.chartData.xAxis,
      datasets: this.chartData.ChartLines
    };
    this.chart.update();
  }
  ngOnInit() {
    this.chartNode = document.getElementById('myChart') as HTMLCanvasElement;
    this.chart = new Chart(this.chartNode, {
      type: 'line',
      data: {
        labels: this.chartData.xAxis,
        datasets: this.chartData.ChartLines
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'hour',
              displayFormats: {
                minute: 'HH:mm'
              }
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
