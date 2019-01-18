//@flow

import * as React from "react";
import { Component } from "react-simplified";
import {caseService, categoryService, mapService} from '../services';
import {Alert} from "./widgets"
import axios from 'axios';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { NavLink } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";

const style = {
    width: '100%',
    height: '100%',
    position: "relative"
}

const history = createHistory({
    forceRefresh: true
})

export class Report extends Component {
    message = " ";
    error = " ";

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
    zipBoo = true;
    zipcodePlaceholder = '';

    state = {
        headline: "",
        description: "",
        latitude: "",
        longitude: "",
        picture: "",
        zipcode: "",
        category_id: "",
        user_id: sessionStorage.getItem("userid"),
    };

    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
        this.selectedFile = event.target.files[0];
    };

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState((state, props) => ({
            [name]: value
        }));
    };

    isImage(myString) {
        let re = /\.(gif|jpg|jpeg|tiff|png)$/i;
        return re.test(myString);
    }

    onlyNumber(myString) {
        return /^\d+$/.test(myString);
    }

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
                                onClick={(t, map, coord) => this.onMarkerDragEnd(coord)}
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
                            Postnummer:{" "}
                            <input
                                className="form-control"
                                type="text"
                                defaultValue={this.state.zipcode}
                                name="zipcode"
                                maxLength="4"
                                onChange={this.handleChange}
                                readOnly={this.zipBoo}
                                placeholder={this.zipcodePlaceholder}
                            />
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
                            <button type="button" onClick={this.register} className="btn btn-primary fullfør">
                                Fullfør
                            </button>
                        <h2 className="feilmelding">{this.error}</h2>
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
                    this.state.zipcode = '';
                    this.zipBoo = false;
                    this.zipcodePlaceholder = 'Fant ikke postnummer for anngitt sted, vennligst fyll inn postnummer manuelt';
                } else {
                    this.state.zipcode = filter[0].long_name;
                }
                console.log(this.state.zipcode);
                let countryFilter = [];
                let help = [];
                if (this.mapData.address_components == null) {
                    this.error = 'Fant ingen gyldig addresse her, vennligst velg et annet sted';
                } else {
                    this.error = "";
                    help = this.mapData.address_components.filter(e =>
                        e.types[0] == 'country');
                    this.country = help[0].long_name;
                }

            }
        );
    };

    register(){
        if (this.state.headline == ''){
            this.error = "Tittel må fylles inn!";
            return null;
        } else if (this.state.headline.length > 64){
            this.error = "Max tittel lengde: 64 tegn";
            return null;
        } else {
            this.error = "";
        }

        if (this.country.trim() == 'Norge' || this.country.trim() == 'Norway') {
            this.error = "";
        } else {
            this.error = "Vennligst velg et sted i Norge";
            return null;
        }
        if (this.mapData.address_components == null) {
            this.error = 'Fant ingen gyldig addresse her, vennligst velg et annet sted';
            return null;
        } else {
            this.error = '';
        }
        if(this.state.zipcode.length < 4) {
            this.error = 'Postnummer må være nøyaktig 4 tall';
            return null;
        } else if (!(this.onlyNumber(this.state.zipcode))) {
            this.error = 'Postnummer kan bare bestå av tall!';
            return null;
        }
        // else if () {
        //     this.error = 'Postnummer må være et gyldig postnummer i Norge!'}
            else {
            this.error = '';
        }
        if (this.selectedFile == null) {
            this.error = "Vennligst last opp bilde!";
            return null;
        } else if(!this.isImage(this.selectedFile.name)) {
            this.error = "Du kan bare laste opp bildefiler";
            console.log('Ikke bilde!');
            return null;
        } else {
            this.error = '';
        }

        if (this.state.category_id.trim() == ''){
            this.error = "Kategori er påkrevd!";
            return null;
        } else {
            this.error = "";
        }
        let fd = new FormData();
        fd.append('file', this.selectedFile, this.selectedFile.name);
        fd.append('upload_preset', 'elo47cnr');
        axios.post('https://api.cloudinary.com/v1_1/altair/image/upload', fd, 'elo47cnr')
            .then(res => {
                this.state.picture = res.url;
                console.log('test');

                const casedata = {
                    headline: this.state.headline,
                    description: this.state.description,
                    latitude: this.lat,
                    longitude: this.lng,
                    zipcode: this.state.zipcode,
                    picture: this.state.picture,
                    category_id: this.state.category_id,
                    user_id: this.state.user_id
                };

                if (this.state.picture.trim() == '') this.state.picture = 'https://tinyurl.com/y73nxqn9';
                caseService.createUserCase(casedata)
                    .then(res => {
                        console.log(res, "FROM REPORT PAGE@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
										})
                    .catch((error: Error) => Alert.danger(error.message));

                window.location = "#validation";
            });
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

