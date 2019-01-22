import * as React from "react";
import { Component } from "react-simplified";
import {statisticsService} from "../services";
import Charts from "./Charts";
import {Loading} from "./widgets";

export default class StatisticsPage extends Component{
	
	loaded = false;
	
	registeredCases = [];
	labelsRegCases = [];
	dataSetsRegCases = [];
	headlineRegCases = "Registrerte saker de siste 7 dagene";
	displayRegCase = false;
	colorRegCAse = [
		'rgba(255, 99, 132, 0.6)',
		'rgba(255, 99, 132, 0.6)',
		'rgba(255, 99, 132, 0.6)',
		'rgba(255, 99, 132, 0.6)',
		'rgba(255, 99, 132, 0.6)',
		'rgba(255, 99, 132, 0.6)',
		'rgba(255, 99, 132, 0.6)'
	];
	
	caseCountCat = [];
	labelsCaseCount = [];
	dataSetsCaseCount = [];
	headlineCaseCount = "Antall saker per kategori det siste året";
	displayCaseCount = false;
	colorCaseCount = [
		'rgba(75, 192, 192, 0.6)'
	];
	
	render(){
		if (this.loaded) {
			
			return (
				<div id="statistics-page">
					
					<div className = "case-chart">
						<Charts type={"bar"}
										labels = {this.labelsRegCases}
										dataSets = {this.dataSetsRegCases}
										headline = {this.headlineRegCases}
						 				display = {this.displayRegCase}
						 				color={this.colorRegCAse}
						/>
					</div>
					
					<div className = "case-chart">
						<Charts type={"line"}
										labels = {this.labelsCaseCount}
										dataSets = {this.dataSetsCaseCount}
										headline = {this.headlineCaseCount}
						 				display = {this.displayCaseCount}
						 				color={this.colorCaseCount}
						/>
					</div>
					
				</div>
			)
		}else {
			return <Loading/>
		}
	}
	
	
	componentDidMount () {
		statisticsService.getRegisteredCases()
			.then(result => {
				this.registeredCases = result;
				
				this.registeredCases.map(item => {
					this.labelsRegCases.push(item.Dag)
				});
				
				this.registeredCases.map(item => {
					this.dataSetsRegCases.push(item.Registrerte)
				});
				
				statisticsService.getAllCasesCategory()
					.then(res => {
						this.caseCountCat = res;
						console.log(this.caseCountCat, "NOE");
						this.caseCountCat.map(item => {
							this.labelsCaseCount.push(item.description)
						});
						
						this.caseCountCat.map(item => {
							this.dataSetsCaseCount.push(item.antall)
						});
						
						this.loaded = true;
					});
				
			})
	}
	
}