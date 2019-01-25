

import * as React from "react";
import { Component } from "react-simplified";
import {caseService, categoryService, mapService, geoService} from '../services';
import {Alert, Loading} from "./widgets"
import axios from 'axios';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { NavLink } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import PlacesAutocomplete from 'react-places-autocomplete';
import {geocodeByAddress, geocodeByPlaceId, getLatLng} from 'react-places-autocomplete';

const style = {
    width: '100%',
    height: '100%',
    margin: "0 0 0 0",
    padding: "0 0 0 0"
}

const history = createHistory({
    forceRefresh: true
})

export class Report extends Component {
    message = " ";
    error = " ";
    caseReported = false;
    modal = <></>;

    categories = [];
    selectedFile: null;
    infoShowing = false;
    activeMarker: {};
    lat = 63.4283065;
    lng = 10.3876995;
    address = '';
    mapData = {};
    country = '';
    zipBoo = true;
    zipcodePlaceholder = '';
    zipcodes = [];
    titleValid = '';
    zipValid = '';
    countryValid = '';
    categoryValid = '';
    pictureValid = '';
    picValidationClass = '';

    state = {
        headline: "",
        description: "",
        latitude: "",
        longitude: "",
        picture: "",
        zipcode: "",
        category_id: ""
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

    constructor(props) {
        super(props);
        this.state = { address: '' };
    }

    handleChangeS = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(({ lat , lng }) => {
                console.log('Success', lat, lng);
                this.lat = lat;
                this.lng = lng;
                mapService.getMapInfo(lat, this.lng).then(
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
                        this.updateAddress(this.mapData.formatted_address);

                    }
                );
            })
            .catch(error => console.error('Error', error));

    };

    updateAddress (address) {
        document.getElementById("address-search").value = address;
    }

    render(){
        return(
            <div id="report-page" className="row row-style" style={style}>
                {this.modal}
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <div className="rapporter">
                        <h1>Meld feil</h1>
                        <div className="form-group form-group-style">
                            Tittel:{" "}
                            <input
                                className={"form-control " + this.titleValid}
                                type="text"
                                name="headline"
                                defaultValue=""
                                onChange={this.handleChange}
                            />
                            <div className="invalid-feedback">Ugyldig tittel</div>
                        </div>
                        <div className="map-container">
                            Spesifiser hvor problemet befinner seg:

                        </div>
                        <PlacesAutocomplete
                            value={this.state.address}
                            onChange={this.handleChangeS}
                            onSelect={this.handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <input
                                        {...getInputProps({
                                            placeholder: 'Search Places ...',
                                            className: 'location-search-input',
                                        })}
                                        className={"form-control address-field " + this.countryValid}
                                        id="address-search"
                                        type="text"
                                        name="headline"
                                        defaultValue={this.state.address}
                                    />
                                    <div className="invalid-feedback">Ugyldig adresse</div>
                                    <div className="autocomplete-dropdown-container">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map(suggestion => {
                                            const className = suggestion.active
                                                ? 'suggestion-item--active'
                                                : 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                                ? { backgroundColor: '#EEEDED', cursor: 'pointer', color: 'black' }
                                                : { backgroundColor: '#ffffff', cursor: 'pointer', color: 'black'};
                                            return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion, {
                                                        className,
                                                        style,
                                                    })}
                                                >
                                                    <span>{suggestion.description}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                        <div className="map-wrapper">
                            <Map
                                className="report-map"
                                google={this.props.google}
                                zoom={9}
                                center={{
                                    lat: this.lat,
                                    lng: this.lng
                                }}
                                style={style}
                                defaultOptions={{
                                    scaleControl: false,
                                    mapTypeControl: false,
                                    zoomControl: true
                                }}
                                disableDefaultUI={true}
                                onClick={(t, map, coord) => this.onMarkerDragEnd(coord)}
                                language="no"
                            >
                                <Marker
                                    name={"current-location"}
                                    draggable={true}
                                    position={{ lat: this.lat, lng: this.lng }}
                                    onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
                                />
                            </Map>
                        </div>

                        <div className="form-group form-group-style">
                            Postnummer:{" "}
                            <input
                                className={"form-control " + this.zipValid}
                                type="text"
                                defaultValue={this.state.zipcode}
                                name="zipcode"
                                maxLength="4"
                                onChange={this.handleChange}
                                readOnly={this.zipBoo}
                                placeholder={this.zipcodePlaceholder}
                            />
                            <div className="invalid-feedback">Ugyldig postnummer</div>
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
                            <label
                                className="file-upload-container"
                                htmlFor="file-upload">
                            </label>
                            <input
                                className={"file-input " + this.pictureValid}
                                id="file-upload"
                                type="file"
                                name="file-upload"
                                onChange={this.fileSelectedHandler}
                                required>

                            </input>
                            <div className={"invalid-feedback " + this.picValidationClass}>Du må laste opp en gyldig bildefil</div>
                        </div>
                        <div className="form-group form-group-style">
                            <select className={'browser-default custom-select ' + this.categoryValid}
                                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.state.category_id = event.target.value)}
                                    defaultValue=''>
                                <option disabled value=''> -- velg kategori -- </option>
                                {this.categories.map(category => (
                                    <option key={category.category_id} value={category.category_id}>
                                        {category.description}
                                    </option>
                                ))}
                            </select>
                            <div className="invalid-feedback">Du må velge en kategori</div>
                        </div>
                        <button id="submit" type="button" onClick={this.register} className="btn btn-primary fullfør">
                            Fullfør
                        </button>
                    </div>
                </div>
                <div className="col-sm-4"></div>
            </div>
        );
    }

    onMarkerDragEnd = (coord) => {
        this.lat = coord.latLng.lat();
        this.lng = coord.latLng.lng();
        mapService.getMapInfo(this.lat, this.lng).then(
            mapData => {
                this.mapData = mapData.results[0];
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
                if(filter[0] == null) {
                    this.state.zipcode = '';
                    this.zipBoo = false;
                    this.zipcodePlaceholder = 'Fant ikke postnummer for anngitt sted, vennligst fyll inn postnummer manuelt';
                } else {
                    this.state.zipcode = filter[0].long_name;
                }
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
                this.updateAddress(this.mapData.formatted_address);

            }
        );
    };

    register(){
        if(this.caseReported == false) {
            if (this.state.headline == '' || this.state.headline == null){
                this.titleValid = "is-invalid";
                return null;
            } else {
                this.titleValid = "";
            }

            if (this.country.trim() == 'Norge' || this.country.trim() == 'Norway') {
                this.countryValid = "";
            } else {
                this.countryValid = "is-invalid";
                return null;
            }
            if (this.mapData.address_components == null) {
                this.countryValid = 'is-invalid';
                return null;
            } else {
                this.countryValid = '';
            }
            if(this.state.zipcode.length < 4) {
                this.zipValid = 'is-invalid';
                return null;
            } else if (!(this.onlyNumber(this.state.zipcode))) {
                this.zipValid = 'is-invalid';
                return null;
            } else if (!(this.zipcodes.includes(this.state.zipcode))) {
                this.zipValid = 'is-invalid';
                return null;
            } else {
                this.zipValid = '';
            }

            if (this.selectedFile == null) {
                this.picValidationClass = "img-visible";
                return null;
            } else if(!this.isImage(this.selectedFile.name)) {
                this.picValidationClass = "img-visible";
                console.log('Ikke bilde!');
                return null;
            } else {
                this.picValidationClass = '';
            }

            if (this.state.category_id.trim() == ''){
                this.categoryValid = "is-invalid";
                return null;
            } else {
                this.categoryValid = "";
            }
            this.caseReported = true;

            this.modal = <div className="react-modal modal-visible">
                <div className="report-loader">
                    <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif' />
                </div>
            </div>;

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
                        category_id: this.state.category_id
                    };



                    if (this.state.picture.trim() == '') this.state.picture = 'https://tinyurl.com/y73nxqn9';
                    caseService.createUserCase(casedata)
                        .then(res => {
                            console.log(res, "FROM REPORT PAGE@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                            window.location = "#validation/" + res.insertId;
                        })
                        .catch((error: Error) => Alert.danger(error.message));


                });
        } else {
            return null;
        }

    }

    componentDidMount(){
        this.show = 0;

        categoryService.getAllCategories()
            .then((categories => (this.categories = categories)))
            .catch((error: Error) => console.log(error.message));
        geoService.getAllCommunes()
            .then(response => {
                response.map(item => {
                    this.zipcodes.push(item.zipcode);
                })
            })
            .catch((error: Error) => console.log(error.message));
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDJEriw-U4wGtoFxuXALVyYLboVWl3wyhc"
})(Report);
