import * as React from "react";
import { Component } from "react-simplified";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { caseService, geoService } from "../services";
import { Alert, Loading } from "./widgets";


const style = {
    width: "90%",
    height: "80vh",
    margin: "5%"
}

class Info {
  index: number;
  html: string;
}

export class MapContainer extends Component {

    loaded = false;

    infoShowing = false;
    activeMarker: {};
    cases = [];
    casesShowing = [];
    infoTitle = "Ukjent";
    infoId = -1;

    places = [];

    commune = "";
    communes = [];
    communeOptions = [];

    async componentDidMount(){
        this.cases = await caseService.getAllCases();
        this.communes = await geoService.getCommunesKommune();
        console.log(this.communes);
        this.loaded = true;
        this.forceUpdate();
        this.casesByCommune("OSLO");
    }

    casesByCommune(name) {
        name = name.toUpperCase();
        let id = -1;
        for(let i = 0; i < this.communes.length; i++){
            if(this.communes[i].navn.toUpperCase() === name){
                id = this.communes[i].ID;
                break;
            }
        }
        console.log("id:", id);

    }

    render() {
        if(this.loaded){
            return (
                <div id="map-page" className="max">
                    <div>
                        Din lokasjon:
                        <input
                          id="map-commune-input"
                          className="form-control"
                          type="text"
                          defaultValue = ""
                          onChange={event => {
                            this.commune = event.target.value;
                            this.changeCommune(event);
                          }}
                        />
                        <div className="card" style={{minWidth: "19rem", width: "100%"}}>
                          <ul className="list-group list-group-flush" style={{marginBottom: "0", width: "100%"}}>
                            {
                              this.communeOptions.map(
                                commune => (
                                  <li key={commune} className="list-group-item commune-option" onClick={(event) => this.confirmCommune(event, commune)}>{commune}</li>
                                )
                              )
                            }
                          </ul>
                        </div>
                    </div>
                    <Map
                        google={this.props.google}
                        style={style}
                        zoom={6}
                        initialCenter={{
                            lat: 63.4283065,
                            lng: 10.3876995
                        }}
                        onClick={this.onMapClick}
                    >
                      {this.casesShowing.map(caseItem => (
                        <Marker
                            key={caseItem.case_id}
                            position={{
                                lat: caseItem.latitude,
                                lng: caseItem.longitude
                            }}
                            name={caseItem.case_id}
                            onClick={this.onMarkerClick}
                        />
                      ))}
                      <InfoWindow
                        marker={this.activeMarker}
                        visible={this.infoShowing}
                      >
                        <div>
                          <a href={"#case/" + this.infoId}>{this.infoTitle}</a>
                        </div>
                      </InfoWindow>
                    </Map>
                    <div id="map-spacer"/>
                </div>
            )
        } else {
            return <Loading/>
        }
    }

    changeCommune(event){
      if(event.target.value === ""){
        this.communeOptions = [];
        this.forceUpdate();
        return;
      }
      let options = []
      this.communes.map(
        commune => {
          if(commune.navn.toUpperCase().includes(event.target.value.toUpperCase())
          && !options.includes(commune.navn)){
            options.push(commune.navn);
          }
        }
      );
      //console.log(options);
      this.communeOptions = options.sort().slice(0, 3);
      //console.log(this.communeOptions);
      this.forceUpdate();
    }

    confirmCommune(event, commune){
      this.commune = commune;
      this.communeOptions = [];
      let communeField = document.getElementById("map-commune-input");
      communeField.value = commune;
      this.forceUpdate();
    }

    onMapClick(){
      console.log("onMapClick");
      this.infoShowing = false;
      this.activeMarker = {};
    }

    onMarkerClick = (props, marker, e) => {
      console.log("onMarkerClick");
      let selectedCase = this.cases.find(caseItem => {
        return caseItem.case_id == marker.name;
      });
      console.log(selectedCase);

      this.infoTitle = selectedCase.headline;
      this.infoId = selectedCase.case_id;
      this.activeMarker = marker;
      this.infoShowing = true;
    }

}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDJEriw-U4wGtoFxuXALVyYLboVWl3wyhc"
})(MapContainer);
