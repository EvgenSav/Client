import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IChartDataSet, IChartLine } from 'src/app/models/ChartDataPoint';
import { Event } from '@angular/router';
import { Observable } from 'rxjs';
import { IActionLogItem } from 'src/app/models/ActionLogItem';
import { LineChartComponent } from 'src/app/line-chart/line-chart.component';

@Component({
  selector: 'app-measurement-chart',
  templateUrl: './measurement-chart.component.html',
  styleUrls: ['./measurement-chart.component.scss']
})
export class MeasurementChartComponent implements OnInit {
  @ViewChild(LineChartComponent, null) chart: LineChartComponent;
  title: string = "";
  deviceFk: number;
  dataset: IChartDataSet = { xAxis: [], ChartLines: [] };
  date: Date = new Date();
  onDateChange: (devId: number, date: Date) => Observable<IActionLogItem[]>;
  prepareChartData = (logItems: IActionLogItem[]) => {
    const lines: IChartLine[] = [];
    const measureKeys: string[] = [];
    if (logItems.length && logItems[0].State && logItems[0].State.MeasuredData) {
      measureKeys.push(...Object.keys(logItems[0].State.MeasuredData))
      if (measureKeys.includes('Temperature')) {
        lines.push({
          label: 'Temperature',
          data: logItems.map(r => r.State.MeasuredData.Temperature),
          borderColor: 'rgb(24, 237, 138)',
          borderWidth: 2
        })
      }
      if (measureKeys.includes('Humidity')) {
        lines.push({
          label: 'Humidity',
          data: logItems.map(r => r.State.MeasuredData.Humidity),
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2
        })
      }
    }
    return { lines, measureKeys };
  }
  dateChangeHandler = (date: Date) => {
    this.date = date;
    this.onDateChange(this.deviceFk, this.date).subscribe(res => {
      const { lines, measureKeys } = this.prepareChartData(res);
      this.dataset.ChartLines = lines;
      this.dataset.xAxis = res.map(r => r.TimeStamp);
      this.title = measureKeys.join('/');
      this.chart.update();
    });
  }
  constructor(public modalRef: BsModalRef, ) { }
  ngOnInit() {
    this.onDateChange(this.deviceFk, this.date).subscribe(res => {
      const { lines, measureKeys } = this.prepareChartData(res);
      this.dataset.ChartLines = lines;
      this.dataset.xAxis = res.map(r => r.TimeStamp),
      this.title = measureKeys.join('/');
      this.chart.update();
    });
  }
}
