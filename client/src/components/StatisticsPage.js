import * as React from "react";
import { Component } from "react-simplified";
import {statisticsService} from "../services";
import Charts from "./Charts";
import {Loading} from "./widgets";
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
	
	userCount = [];
	labelsUserCount = [];
	dataSetsUserCount = [];
	headlineUserCount = "Antall brukere per type bruker";
	displayUserCount = true;
	colorUserCount = [
		'rgba(255, 99, 132, 0.6)',
		'rgba(75, 192, 192, 0.6)',
		'rgba(54, 162, 235, 0.6)'
	];
	
	
	print() {
		const input = document.getElementById("statistics-page");
		const filename = "statistikk_Hverdags_Helt.pdf";
		
		html2canvas(input, {
				scale: 1
			}
		).then(canvas => {
			let pdf = new jsPDF('p', 'mm', 'a4');
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 200, 300);
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
						
						<div className = "case-chart">
							<Charts type = {"pie"}
											labels = {this.labelsUserCount}
											dataSets = {this.dataSetsUserCount}
											headline = {this.headlineUserCount}
											display = {this.displayUserCount}
											color = {this.colorUserCount}
							/>
						</div>
					
					</div>
					
					<div className="wrapper row1" style={{position: "inherit"}}>
						<div id="copyright" className="hoc clear">
							<p className="fl_left">Copyright &copy; 2019 - All Rights Reserved - Team 5</p>
							<p className="fl_right">I samarbeid med <a target="_blank" rel="noopener noreferrer" href="http://www.ntnu.no/" title="NTNU">NTNU</a></p>
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
				
				this.registeredCases.forEach(item => {
					this.labelsRegCases.push(item.Dag)
				});
				
				this.registeredCases.forEach(item => {
					this.dataSetsRegCases.push(item.Registrerte)
				});
				
				statisticsService.getAllCasesCategory()
					.then(res => {
						this.caseCountCat = res;
						this.caseCountCat.forEach(item => {
							this.labelsCaseCount.push(item.description)
						});
						
						this.caseCountCat.forEach(item => {
							this.dataSetsCaseCount.push(item.antall);
						});
						
						statisticsService.getCountAllUsers()
							.then(response => {
								this.userCount = response;
								
								this.userCount.forEach(item => {
									this.labelsUserCount.push(item.bruker);
									this.dataSetsUserCount.push(item.antall);
								});
								
								this.loaded = true;
								
							});
						
						
						
					});
				
			})
	}
	
}