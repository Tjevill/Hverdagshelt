import * as React from "react";
import { Component } from "react-simplified";
import {Bar, Line, Pie} from "react-chartjs-2";
import {caseService} from "../services";

/*<{ imgLink: string, title: React.Node, to: string, children?: React.Node }>*/

export default class Charts extends Component <{headline: string, labels: [], label: string, dataSets: [], children?: React.Node }>{
	
	labels = this.props.labels;
	data = {
		labels: this.props.labels,
		datasets: [
			{
				label: this.props.label,
				data: this.props.dataSets,
				backgroundColor: [
					'rgba(255, 99, 132, 0.6)',
					'rgba(54, 162, 235, 0.6)',
					'rgba(255, 206, 86, 0.6)',
					'rgba(75, 192, 192, 0.6)',
					'rgba(153, 102, 255, 0.6)',
					'rgba(255, 159, 54, 0.6)'
				
				]
				
			}
		]
	};

	
	options = {
		legend: {
			display: false
		},
		
		title: {
			display: true,
			text: this.props.headline,
			fontSize: 25
		}
	};
	
	
	render(){
		
		return(
			<div>
				
				<Bar data={this.data} options = {this.options} />
				
				
			</div>
		)
	}
	
	componentDidMount(){
		document.styleSheets[9].disabled = true;
	}
	
}