import * as React from "react";
import { Component } from "react-simplified";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component<{lat: number, long: number}> {

  infoShowing = false;
  activeMarker: {};


  render() {
      return (
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.long
          }}
          onClick={this.onMapClick}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={"current location"}
          />

          <InfoWindow
            marker={this.activeMarker}
            visible={this.infoShowing}
          >
              <div>
                <h6>Lat: {this.props.lat}</h6>
                <h6>long: {this.props.long}</h6>
              </div>
          </InfoWindow>

        </Map>
      );
  }

  componentDidMount(){
    console.log(this.props.lat + ", " + this.props.long);
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
