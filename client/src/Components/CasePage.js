import * as React from "react";
import { Component } from "react-simplified";
import Map from "./Map";
import { caseService, mapService } from "../services";

export default class Main extends Component {

  case = [];
  map = [];

  render() {
    return (
      <div id="case-page">
        <Card title={this.case.headline} date={this.case.timestamp} />
        <img id="picture" src="https://tinyurl.com/y9qzpzwy" alt="Case" />
        <p id="description">{this.case.description}</p>
        <Map />
      </div>
      );
    }

  mounted(){
    let casePromise = caseService.getCaseById(this.props.match.params.id);
    casePromise.then(caseData => (/*console.log(caseData[0]),*/ this.case = caseData[0]));

    let mapInfoPromise = mapService.getMapInfo(63.4283065, 10.3876995);
    mapInfoPromise.then(mapData => (console.log(mapData["results"][0]["formatted_address"])));

  }

}


export class Card extends Component<{
    title: "Title",
    province: "Province",
    address: "Address",
    date: "Date",
    description: "Description"
}> {

  render() {
    return (
      <div className={"card article info"}>
        <div className="card-body article-body">
            <h5 className="card-title article-title">{this.props.title}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Kommune: </li>
              <li className="list-group-item">Adresse: </li>
              <li className="list-group-item">Lagt inn: {getDate(this.props.date)}</li>
            </ul>
        </div>
      </div>
    );
  }

}

function getDate(date) {
  if(date == "" || date == null) return "";
  var dateObject = new Date(date);
  dateObject.setSeconds(0, 0);
  return dateObject
    .toISOString()
    .replace('T', ' ')
    .replace(':00.000Z', '');
}
