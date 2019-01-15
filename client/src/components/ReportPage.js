//@flow

import * as React from "react";
import { Component } from "react-simplified";
import {caseService, categoryService, mapService} from '../services';
import {Alert} from "./widgets"
import axios from 'axios';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const style = {
    width: '100%',
    height: '100%',
    position: "relative"
}

export class Report extends Component {
    categories = [];
    selectedFile: null;
    infoShowing = false;
    activeMarker: {};
    lat = 63.4283065;
    lng = 10.3876995;
    address = '';
    zipcode = '';
    mapData = {};
    country = '';

    state = {
        headline: "",
        description: "",
        latitude: "",
        longitude: "",
        picture: "",
        zipcode: "",
        category_id: "",
        user_id:"",
    };

    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
        this.selectedFile = event.target.files[0];
    };

    fileUploadHandler(){
        let fd = new FormData();
        if (this.selectedFile == null) {
            Alert.danger('Vennligst last opp bilde');
            console.log('Last opp fil');
        } else {
            fd.append('file', this.selectedFile, this.selectedFile.name);
            fd.append('upload_preset', 'elo47cnr');
            axios.post('https://api.cloudinary.com/v1_1/altair/image/upload', fd, 'elo47cnr')
                .then(res => {
                    this.state.picture = res.url;
                    this.register();
                });
        }
    };
    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState((state, props) => ({
            [name]: value
        }));
    };
    render(){
        return(
            <div className="row row-style" style={style}>
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <div className="Rapporter">
                        <h1>Meld feil</h1>
                        <div className="form-group form-group-style">
                            Tittel:{" "}
                            <input
                                className="form-control"
                                type="text"
                                name="headline"
                                defaultValue=""
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="map-container">
                            Spesifiser hvor problemet befinner seg:
                            <input
                                className="form-control address-field"
                                type="text"
                                name="headline"
                                defaultValue={this.address}
                                readOnly={true}
                            />
                            <Map
                                className="report-map"
                                google={this.props.google}
                                zoom={8}
                                initialCenter={{
                                    lat: this.lat,
                                    lng: this.lng
                                }}
                                style={style}
                                onClick={this.onMapClick}
                            >
                                <Marker
                                    name={"current location"}
                                    draggable={true}
                                    position={{ lat: this.lat, lng: this.lng }}
                                    onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
                                />

                            </Map>

                        </div>

                        <div className="form-group form-group-style">
                            Beskrivelse:{" "}
                            <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                name="description"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group form-group-style">
                            Last opp bilde:
                            <label className="file-upload-container" htmlFor="file-upload"></label>
                            <input id="file-upload" type="file" name="file-upload" onChange={this.fileSelectedHandler}></input>
                        </div>
                        <div className="form-group form-group-style">
                            Hvilken bruker? (temp):{" "}
                            <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                name="user_id"
                                onChange={this.handleChange}
                            />
                        </div>
                        <select className='selectpicker browser-default custom-select'
                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.state.category_id = event.target.value)}
                                defaultValue=''>
                            <option disabled value=''> -- velg kategori -- </option>
                            {this.categories.map(category => (
                                <option key={category.category_id} value={category.category_id}>
                                    {category.description}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={this.fileUploadHandler} className="btn btn-primary fullfør">
                            Fullfør
                        </button>
                        <h1>{this.message}</h1>
                    </div>
                </div>
            </div>
        );
    }

    onMarkerDragEnd = (coord) => {
        console.log(coord.latLng.lat());
        this.lat = coord.latLng.lat();
        console.log(coord.latLng.lng());
        this.lng = coord.latLng.lng();
        mapService.getMapInfo(this.lat, this.lng).then(
            mapData => {
                this.mapData = mapData.results[0];
                console.log(this.mapData);
                if(this.mapData == null){
                    this.mapData = {
                        formatted_address: "none"
                    }
                }
                let filter = [];
                this.address = this.mapData.formatted_address;
                if (this.mapData.address_components == null) {
                    console.log('Ikke i Norge!');
                } else {
                    filter = this.mapData.address_components.filter(e =>
                        e.types[0] == 'postal_code');
                }

                console.log(filter);
                if(filter[0] == null) {
                    this.zipcode = '0000';
                } else {
                    this.zipcode = filter[0].long_name;
                }
                console.log(this.zipcode);
                let countryFilter = [];
                let help = [];
                if (this.mapData.address_components == null) {
                    console.log('Fant ingen gyldig addresse her, vennligst velg et annet sted');
                }
                help = this.mapData.address_components.filter(e =>
                e.types[0] == 'country');
                this.country = help[0].long_name;
            }
        );
    };

    onMapClick(props, map, e){
        console.log("onMapClick");
        this.infoShowing = false;
        this.activeMarker = {};
    }

    register(){
        var valid = true;
        if (this.state.headline == ''){
            valid = false;
            Alert.danger('Tittel må fylles inn!');
        } else if (this.state.headline.length > 64){
            valid = false;
            Alert.danger('Max tittel lengde: 64 tegn');
        }
        if (this.state.category_id.trim() == ''){
            valid = false;
            Alert.danger('Kategori er påkrevd!');
        }
        if (this.state.picture.trim() == '') {
            valid = false;
            Alert.danger('Vennligst last opp et bilde');
        }
        if (this.country.trim() != 'Norway') {
            valid = false;
            Alert.danger('Vennligst plasser nåla innenfor Norge!');
        }



        const casedata = {
            headline: this.state.headline,
            description: this.state.description,
            latitude: this.lat,
            longitude: this.lng,
            zipcode: this.zipcode,
            picture: this.state.picture,
            category_id: this.state.category_id,
            user_id: this.state.user_id
        };

        const fd = new FormData();
        fd.append('file', this.selectedFile, this.selectedFile.name);
        fd.append('upload_preset', 'elo47cnr');
        axios.post('https://api.cloudinary.com/v1_1/altair/image/upload', fd, 'elo47cnr')
            .then(res => {
                this.state.picture = res.url;
            });

        if(valid){
            if (this.state.picture.trim() == '') this.state.picture = 'https://tinyurl.com/y73nxqn9';
            caseService.createUserCase(casedata)
                .then(window.location.reload())
                .catch((error: Error) => Alert.danger(error.message));
        }
    }

    componentDidMount(){
        categoryService.getAllCategories()
            .then((categories => (this.categories = categories)))
            .catch((error: Error) => console.log(error.message));


    }


}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDJEriw-U4wGtoFxuXALVyYLboVWl3wyhc"
})(Report);

