import * as React from "react";
import { Component } from "react-simplified";
import Map from "./Map";
import { caseService, mapService } from "../services";

export default class Case extends Component {

  loaded = false;
  openMap = false;
  case = {};
  map = <></>;
  mapData = {};
  province = "";
  test = <h1>test</h1>;

  render() {
    if(this.loaded){
      return (
        <div id="case-page">
          <div id="info">
            <Card
              title={this.case.headline}
              province={this.province}
              address={this.mapData.formatted_address.split(",")[0]}
              zip={this.case.zipcode}
              date={this.case.timestamp}
            />
            <img id="picture" src="https://tinyurl.com/y9qzpzwy" alt="Case" />
            <p id="description">{this.case.description}</p>
          </div>
          {this.map}
        </div>
        );
      } else {
        return (
          <h1>Loading</h1>
        );
      }
    }

  mounted(){

    if(this.openMap) document.location.reload();
    this.openMap = true;
    let casePromise = caseService.getCaseById(this.props.match.params.id);
    casePromise.then(caseData => (
      //console.log(caseData[0]),
      this.case = caseData[0],
      mapService.getMapInfo(this.case.latitude, this.case.longitude).then(
        mapData => (
          this.mapData = mapData.results[0],
          //console.log(this.mapData),
          mapService.getProvince(this.case.zipcode).then(
            zipData => (
              this.province = zipData.result.postnr[0].kommune,
              this.loaded = true
            )
          )
        )
      ),
      this.map = <Map lat={this.case.latitude} long={this.case.longitude}/>
    ));

  }

}


export class Card extends Component<{
    title: string,
    province: number,
    zip: number,
    address: string,
    date: string,
    description: string
}> {

  render() {
    return (
      <div className="card details">
        <div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Kommune: {this.props.province}</li>
              <li className="list-group-item">Adresse: {this.props.address}</li>
              <li className="list-group-item">Zip: {this.props.zip}</li>
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
