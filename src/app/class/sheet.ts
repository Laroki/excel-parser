import { ApexAxisChartSeries } from "ng-apexcharts";
import { ChartOptions } from "../model/apex.model";

export class Sheet {
	rawData!: any[];
	metaData!: any[];
	chartData!: any[];

	name!: string;

	private chartSeries!: ApexAxisChartSeries;
	public chartOptions!: Partial<ChartOptions>;

	constructor(rawData: any[], name: string) {
		this.rawData = rawData;
		this.name = name;
		this.metaData = this.rawData.slice(0, 6);
		this.chartData = this.rawData.slice(6, this.rawData.length);
		this.setChartSeries();
		this.setChartOptions();
	}

	private setChartSeries() {
		this.chartSeries = [
			{
				data: this.chartData.map(x => {
					const objValues = Object.values(x);
					return { x: objValues[1], y: objValues[0] }
				})
			}
		]
	}

	private setChartOptions() {
		this.chartOptions = {
			series: this.chartSeries,
			chart: {
				height: 350,
				type: "bar"
			},
			title: {
				text: this.getChartTitle().toUpperCase()
			}
		};
	}

	private getChartTitle(): string {
		return Object.values(this.metaData[0])[1] as string;
	}
}
