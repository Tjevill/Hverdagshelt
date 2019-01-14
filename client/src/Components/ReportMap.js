import * as React from "react";
import { Component } from "react-simplified";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const style = {
    width: '100%',
    height: '100%',
    position: "relative"
}

export class MapContainer extends Component<{lat: number, long: number}> {

    infoShowing = false;
    activeMarker: {};
    lat = 63;
    lng = 10;

    render() {
        return (
            <Map
                className="report-map"
                google={this.props.google}
                zoom={8}
                initialCenter={{
                    lat: 63,
                    lng: 10
                }}
                style={style}
                onClick={this.onMapClick}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={"current location"}
                    draggable={true}
                    position={{ lat: this.lat, lng: this.lng }}
                    onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
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

    onMarkerDragEnd = (coord) => {
      console.log(coord.latLng.lat());
      console.log(coord.latLng.lng());
    };

    onMarkerClick = (props, marker, e) => {
        console.log("onMarkerClick");
        this.activeMarker = marker;
        this.infoShowing = true;
    }

    onMapClick(props, map, e){
        console.log("onMapClick");
        this.infoShowing = false;
        this.activeMarker = {};
    }

}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDJEriw-U4wGtoFxuXALVyYLboVWl3wyhc"
})(MapContainer);
