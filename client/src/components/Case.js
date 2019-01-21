import * as React from "react";
import { Component } from "react-simplified";
import Map from "./CaseMap";
import { caseService, mapService } from "../services";
import { Loading } from "./widgets";

export default class Case extends Component {

  loaded = false;
  openMap = false;
  case = {};
  map = <></>;
  mapData = {};
  province = "";
  status = '';

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
                status={this.status}
                comment={this.case.comment}
              />

              <img id="case-picture" src={this.case.picture} alt="case_picture" onClick={this.openModal} />

              <div id="myModal" className="modal">
                <span id="close-modal" className="close" onClick={this.closeModal}>&times;</span>
                <img className="modal-content" id="img01" />
                <div id="caption">test</div>
              </div>

          <p id="description">{this.case.description}</p>
        </div>
          {this.map}
        </div>
      );
    } else {
      return (
        <Loading />
      );
    }
  }

  componentDidMount(){

    window.addEventListener("resize", this.onResize.bind(this));

    if(this.openMap) document.location.reload();
    this.openMap = true;

    let casePromise = caseService.getCaseById(this.props.match.params.id);
    casePromise.then(caseData => {
      //console.log(caseData[0]);
      this.case = caseData[0];
      this.map = <Map lat={this.case.latitude} long={this.case.longitude}/>;
      mapService.getMapInfo(this.case.latitude, this.case.longitude).then(
        mapData => {
          this.mapData = mapData.results[0];
          //console.log(this.mapData);
          if(this.mapData == null){
            this.mapData = {
              formatted_address: "none"
            }
          }
          if(this.case.zipcode == "0000"){
            this.province = "Ukjent"
            this.loaded = true;
            return;
          }
          mapService.getProvince(this.case.zipcode).then(
            zipData => {
              this.province = zipData.result.postnr[0].kommune;
              this.loaded = true;
            }
          );
            if (this.case.status_id == 1) {
                //console.log('test');
                this.status = 'Registrert';
            } else if (this.case.status_id == 2) {
                this.status = 'Under vurdering';
            } else if (this.case.status_id == 3) {
                this.status = 'Satt på vent';
            } else if (this.case.status_id == 4) {
                this.status = 'Arbeid pågår';
            } else if(this.case.status_id == 5){
                this.status = 'Avvist';
            } else if(this.case.status_id == 6) {
                this.status = 'Løst';
            }else if (this.case.status_id == 7) {
                this.status = 'Sak slettet';
            }
            else {
                console.log('Error, status invalid!');
            }
        }
      );
    });
  }

  openModal(){
    //console.log("modalEvent");
    let casePage = document.getElementById("case-page");
    let picture = document.getElementById("case-picture");
    let modal = document.getElementById("myModal");
    let modalImg = document.getElementById("img01");
    let captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = picture.src;
    captionText.innerHTML = this.case.description;

    var close = document.getElementById("close-modal");
    close.style.right = String((casePage.offsetWidth / 2) - (modalImg.offsetWidth / 2) - 40) + "px";
  }

  closeModal(){
    //console.log("closing");
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  onResize(){
    let close = document.getElementById("close-modal");
    if(close != null){
      let casePage = document.getElementById("case-page");
      let modalImg = document.getElementById("img01");
      close.style.right = String((casePage.offsetWidth / 2) - (modalImg.offsetWidth / 2) - 40) + "px";
    }
  }

}


export class Card extends Component<{
    title: string,
    province: number,
    zip: number,
    address: string,
    date: string,
    status: string,
    description: string,
    comment: string
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
              <li className="list-group-item">Status: {this.props.status}</li>
              <div className="card-body comment-card">
                  {this.props.comment}
              </div>
            </ul>
        </div>
      </div>
    );
  }

}

function getDate(date) {
  if(date === "" || date == null) return "";
  let dateObject = new Date(date);
  dateObject.setSeconds(0, 0);
  return dateObject
    .toISOString()
    .replace('T', ' ')
    .replace(':00.000Z', '');
}
