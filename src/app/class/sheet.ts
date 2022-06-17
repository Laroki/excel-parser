import { ApexAxisChartSeries } from "ng-apexcharts";

export class Sheet {
	rawData!: any[];

	metaData!: any[];
	chartData!: any[];

	private chartSeries!: ApexAxisChartSeries;

	constructor(rawData: any[]) {
		this.rawData = rawData;
		this.metaData = this.rawData.slice(0, 6);
		this.chartData = this.rawData.slice(6, this.rawData.length);
		this.setChartSeries();
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

	public getChartTitle(): string {
		return Object.values(this.metaData[0])[1] as string;
	}

	public getChartSeries(): ApexAxisChartSeries {
		return this.chartSeries;
	}
}
