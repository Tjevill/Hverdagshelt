import * as React from "react";
import { Component } from "react-simplified";
import {statisticsService} from "../services";
import Charts from "./Charts";
import {Loading} from "./widgets";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import * as jsPDF from 'jspdf';

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
	
	
	print() {
		const input = document.getElementById("statistics-page");
		const filename = "statistikk_Hverdags_Helt.pdf";
		
		html2canvas(input, {
				scale: 1
			}
		).then(canvas => {
			let pdf = new jsPDF('p', 'mm', 'a4');
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 200, 200);
			pdf.save(filename);
		})
		
	}
	
	render(){
		if (this.loaded) {
			
			return (
				<div id="wrapper-chart">
					
					<div className = "button-wrapper" id="button-chart">
						<button className="save-pdf" onClick = {() => this.print()}> Save as PDF</button>
					</div>
					
					<div id = "statistics-page">
						<div className = "case-chart">
							<Charts type = {"bar"}
											labels = {this.labelsRegCases}
											dataSets = {this.dataSetsRegCases}
											headline = {this.headlineRegCases}
											display = {this.displayRegCase}
											color = {this.colorRegCAse}
							/>
						</div>
						
						<div className = "case-chart">
							<Charts type = {"line"}
											labels = {this.labelsCaseCount}
											dataSets = {this.dataSetsCaseCount}
											headline = {this.headlineCaseCount}
											display = {this.displayCaseCount}
											color = {this.colorCaseCount}
							/>
						</div>
					
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