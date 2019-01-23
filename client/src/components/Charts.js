import * as React from "react";
import { Component } from "react-simplified";
import {Bar, Line, Pie, HorizontalBar} from "react-chartjs-2";


export default class Charts extends Component <{color: []; display: boolean, type: string, headline: string, labels: [], dataSets: [], children?: React.Node }>{
	
	data = {
		labels: this.props.labels,
		datasets: [
			{
				data: this.props.dataSets,
				backgroundColor: this.props.color
			}
		]
	};
	
	options = {
		legend: {
			display: this.props.display
		},
		title: {
			display: true,
			text: this.props.headline,
			fontSize: 25
		},
		layout: {
			padding: {
				left: 50,
				right: 0,
				bottom: 0,
				top: 0
			}
		},
		tooltips: {
			enabled: true,
			
		}
	};
	
	
	render(){
		if(this.props.type === "bar"){
			return (
				<div>
					
					<Bar data = {this.data} options = {this.options} />
					
				</div>
			)
		} else if(this.props.type === "line"){
			console.log(this.data);
			return(
				<div>
					<Line data={this.data} options={this.options} />
				</div>
			)
		} else if (this.props.type === "pie"){
			return(
				<div>
					<Pie data={this.data} options={this.options} />
				</div>
			)
		}
		
		
	}
	
	componentDidMount(){
		document.styleSheets[9].disabled = true;
	}
	
}