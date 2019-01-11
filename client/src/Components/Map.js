import * as React from "react";
import { Component } from "react-simplified";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {

  infoShowing = false;
  activeMarker: {};

  lat = this.props.lat;
  long = this.props.long;

  render() {
      return (
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: this.lat,
            lng: this.long
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
            onClose={this.onMapClick}
          >
              <div>
                <h6>Lat: {this.lat}</h6>
                <h6>long: {this.long}</h6>
              </div>
          </InfoWindow>

        </Map>
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
