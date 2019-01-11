import * as React from "react";
import { Component } from "react-simplified";
import Map from "./Map";
import { caseService, mapService } from "../services";

export default class Main extends Component {

  loaded = false;
  case = [];
  map = <></>;
  mapData = {};
  test = <h1>test</h1>;

  render() {
    return (
      <div id="case-page">
        <div style={{ marginBottom: "80px"}}>
          <Card
            title={this.case.headline}
            province={this.case.province}
            address={this.case.address}
            date={this.case.timestamp}
          />
          <img id="picture" src={this.case.picture} alt="Case" />
          <p id="description">{this.case.description}</p>
        </div>
        {this.map}
      </div>
      );
    }

  mounted(){

    if(this.loaded) document.location.reload();
    this.loaded = true;
    let casePromise = caseService.getCaseById(this.props.match.params.id);
    casePromise.then(caseData => (
      console.log(caseData[0]),
      this.case = caseData[0],
      mapService.getMapInfo(this.case.latitude, this.case.longitude).then(
        mapData => (console.log(mapData.results[0]))
      )

      //this.map = <Map lat={this.case.latitude} long={this.case.longitude}/>
    ));

  }

}


export class Card extends Component<{
    title: string,
    province: number,
    address: string,
    date: string,
    description: string
}> {

  render() {
    return (
      <div className={"card article info"}>
        <div className="card-body article-body">
            <h5 className="card-title article-title">{this.props.title}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{this.props.province}</li>
              <li className="list-group-item">Adresse: {this.props.address}</li>
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
