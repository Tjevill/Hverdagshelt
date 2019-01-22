import * as React from "react";
import { Component } from "react-simplified";
import {Bar, Line, Pie} from "react-chartjs-2";
import {caseService} from "../services";
import Charts from "./Charts";

export default class StatisticsPage extends Component{
	
	cases = [];
	
	testLabels = ["Joey", "Ben", "Mathias", "Aria", "Erling", "Øyvind"];
	testLabel = "Awesomeness";
	testDataSets = [123, 321, 345, 200, 999, 231, 167, 211];
	testHeadline = "Team 5 er awesome";
	
	render(){
		return(
			<div>
				
				<Charts labels={this.testLabels} label={this.testLabel} dataSets={this.testDataSets}  headline={this.testHeadline}/>
				
			</div>
		)
	}
	
	
	
	componentDidMount(){
		caseService.getAllCases()
			.then(res => this.cases = res);
	}
	
}