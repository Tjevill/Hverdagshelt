import * as React from "react";
import { Component } from "react-simplified";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { caseService } from "../services";


const style = {
    width: '100%',
    height: '100%'
}

class Info {
  index: number;
  html: string;
}

export class MapContainer extends Component {

    infoShowing = false;
    activeMarker: {};
    cases = [];
    infoTitle = "Ukjent";
    infoId = -1;

    render() {
        return (
            <div className="max">
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
                  {this.cases.map(caseItem => (
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
            </div>
        );
    }

    componentDidMount(){
        caseService.getAllCases().then(
            cases => {
                this.cases = cases;
                console.log(this.cases);
            }
        );
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

    onMapClick(){
      console.log("onMapClick");
      this.infoShowing = false;
      this.activeMarker = {};
    }

}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDJEriw-U4wGtoFxuXALVyYLboVWl3wyhc"
})(MapContainer);
