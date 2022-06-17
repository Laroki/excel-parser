import { Component, ViewChild } from '@angular/core';

import * as xlsx from 'xlsx';
import { ChartComponent } from "ng-apexcharts";

import { Sheet } from './class/sheet';
import { ChartOptions } from './model/apex.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public sheets: Sheet[] = [];

  constructor() { }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: xlsx.WorkBook = xlsx.read(binarystr, { type: 'binary' });
      const sheetNames: string[] = wb.SheetNames;

      sheetNames.forEach(sheetName => {
        const ws: xlsx.WorkSheet = wb.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
        console.log(data); // Data will be logged in array format containing objects

        // Create sheet and push it in sheets array
        const sheet = new Sheet(data);
        this.sheets.push(sheet)
      });

      this.setChartOptions(this.sheets[1]);
    };
  }

  setChartOptions(sheet: Sheet) {
    this.chartOptions = {
      series: sheet.getChartSeries(),
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: sheet.getChartTitle().toUpperCase()
      }
    };
  }

}
