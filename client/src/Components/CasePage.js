import * as React from "react";
import { Component } from "react-simplified";
import Map from "./Map";
import { caseService, mapService } from "../services";

export default class Main extends Component {

  loaded = false;
  case = [];
  map = [];
  test = <h1>test</h1>;

  render() {
    return (
      <div id="case-page">
        <div style={{ marginBottom: "80px"}}>
          <Card title={this.case.headline} date={this.case.timestamp} />
          <img id="picture" src="https://tinyurl.com/y9qzpzwy" alt="Case" />
          <p id="description">{this.case.description}</p>
        </div>
        <Map lat={this.case.latitude} long={this.case.longitude}/>
      </div>
      );
    }

  mounted(){
    if(this.loaded) document.location.reload();
    this.loaded = true;
    let casePromise = caseService.getCaseById(this.props.match.params.id);
    casePromise.then(caseData => (
      console.log(caseData[0]),
      this.case = caseData[0]
    ));
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
