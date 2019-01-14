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
    info = [];

    render() {
        return (
            <div className="max">
                <Map
                    google={this.props.google}
                    style={style}
                    zoom={2}
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
                </Map>
            </div>
        );
    }

    componentDidMount(){
        caseService.getAllCases().then(
            cases => {
                this.cases = cases;
                this.cases.map(caseItem => {
                  this.info.push(
                    {

                    }
                  );
                });
            }
        );
    }

    onMarkerClick = (props, marker, e) => {
      console.log("onMarkerClick");
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
