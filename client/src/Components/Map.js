import * as React from "react";
import { Component } from "react-simplified";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {

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

        <InfoWindow marker={this.activeMarker} visible={this.infoShowing}>
            <div>
              <h6>InfoWindow stuff</h6>
            </div>
        </InfoWindow>

      </Map>

    );
  }

  onMarkerClick = (props, marker, e) => {
    console.log("onMarkerClick");
    this.activeMarker = marker;
    this.infoShowing = true;
    this.forceUpdate();
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
