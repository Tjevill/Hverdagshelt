import * as React from "react";
import { Component } from "react-simplified";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";


const style = {
  height: "60%",
  margin: "0 10% 0 10%"
}

export class MapContainer extends Component<{lat: number, long: number}> {

  infoShowing = false;
  activeMarker: {};


  render() {
      return (
        <Map
          google={this.props.google}
          style={style}
          zoom={14}
          gestureHandling="cooperative"
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
            onClose={() => this.onInfoClose()}
          >
              <div>
                <h6>Lat: {this.props.lat}</h6>
                <h6>long: {this.props.long}</h6>
              </div>
          </InfoWindow>

        </Map>
      );
  }

  onMarkerClick = (props, marker, e) => {
      this.activeMarker = marker;
      this.infoShowing = true;
  }

  onMapClick(){
      this.infoShowing = false;
      this.activeMarker = {};
  }

  onInfoClose(){
      this.infoShowing = false;
      this.activeMarker = {};
  }

}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDJEriw-U4wGtoFxuXALVyYLboVWl3wyhc"
})(MapContainer);
