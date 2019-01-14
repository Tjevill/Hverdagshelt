import * as React from "react";
import { Component } from "react-simplified";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const style = {
    width: '80%',
    height: '60%'
}

export class MapContainer extends Component<{lat: number, long: number}> {

    infoShowing = false;
    activeMarker: {};
    lat = 63;
    lng = 10;

    render() {
        return (
            <Map
                google={this.props.google}
                style={style}
                zoom={8}
                initialCenter={{
                    lat: 63,
                    lng: 10
                }}
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


    onPositionChanged(e){
        console.log('Changed position');
        console.log(this.refs.marker.getPosition());
        //const position = this.refs.getPosition();
        //console.log(position.toString());
        //console.log('position changed test');
    }

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
