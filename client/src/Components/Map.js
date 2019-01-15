import * as React from "react";
import { Component } from "react-simplified";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { caseService } from "../services";


const style = {
    width: '100%',
    height: '100%'
}

export class MapContainer extends Component{

    activeMarker: {};
    cases = [];
    showing = [];

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
                          id={caseItem.case_id}
                          key={caseItem.case_id}
                          position={{
                              lat: caseItem.latitude,
                              lng: caseItem.longitude
                          }}
                          name={caseItem.case_id}
                          onClick={this.onMarkerClick}
                      />
                    ))}
                    {this.cases.map(caseItem => (
                      this.showing.includes(caseItem.case_id) &&
                      <InfoWindow
                        id={"case-info-" + caseItem.case_id}
                        key={caseItem.case_id}
                        marker={this.activeMarker}
                        visible={true}
                      >
                        <div>
                          <h6>Id: {caseItem.case_id}</h6>
                          {console.log(caseItem.case_id)}
                        </div>
                      </InfoWindow>
                    ))}
                </Map>
            </div>
        );
    }

    componentDidMount(){
        caseService.getAllCases().then(
            cases => {
                this.cases = cases;
            }
        );
    }

    onMarkerClick = (props, marker, e) => {
      //console.log("onMarkerClick");
      console.log(this.showing);
      if(!this.showing.includes(marker.id)){
        this.activeMarker = marker;
        this.showing.push(marker.id);
      }
    }

    onMapClick(){
      console.log("onMapClick");
    }

}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDJEriw-U4wGtoFxuXALVyYLboVWl3wyhc"
})(MapContainer);
