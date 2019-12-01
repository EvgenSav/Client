import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartConfig } from '../chart-config';
import { IChartDataSet } from '../models/ChartDataPoint';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  LineChart: Chart;
  @Input('data')
  chartData: IChartDataSet;
  constructor() { }

  ngOnInit() {
    const chartNode = document.getElementById('myChart') as HTMLCanvasElement;
    this.LineChart = new Chart(chartNode, {
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
