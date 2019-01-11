//@flow

import * as React from "react";
import { Component } from "react-simplified";
import {caseService, categoryService} from '../services';
import {Alert} from "./widgets";

export default class Report extends Component {
    categories = [];

    state = {
        headline: "",
        description: "",
        latitude: "",
        longitude: "",
        picture: "",
        zipcode: "",
        category_id: "",
        user_id:""
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
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <div className="Rapporter">
                        <h1>Meld inn et problem</h1>
                        <div className="form-group">
                            Tittel:{" "}
                            <input
                                className="form-control"
                                type="text"
                                name="headline"
                                defaultValue=""
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            Beskrivelse:{" "}
                            <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                name="description"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            Bilde (link midlertidig):{" "}
                            <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                name="picture"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            latitude:{" "}
                            <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                name="latitude"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            longitude:{" "}
                            <input
                                className="form-control"
                                type="text"
                                defaultValue=""
                                name="longitude"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
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
                        <button type="button" onClick={this.register} className="btn btn-primary">
                            Fullfør
                        </button>
                        <h1>{this.message}</h1>
                        {/*<form style={{margin: '20px'}}>*/}
                            {/*<div style={{textAlign: 'left'}}>*/}
                                {/*<h5 className='card-title'>Rapporter et problem</h5>*/}
                            {/*</div>*/}
                            {/*<div className='form-group'>*/}
                                {/*<label style={{float: 'left'}}>Tittel</label>*/}
                                {/*<input*/}
                                    {/*type='text'*/}
                                    {/*className='form-control'*/}
                                    {/*value={this.state.headline}*/}
                                    {/*onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.state.headline = event.target.value.trim())}*/}
                                {/*></input>*/}
                            {/*</div>*/}
                            {/*<div className='form-group'>*/}
                                {/*<label style={{float: 'left'}}>Last opp bilde (link midlertidig)</label>*/}
                                {/*<input*/}
                                    {/*type='text'*/}
                                    {/*className='form-control'*/}
                                    {/*value={this.state.picture}*/}
                                    {/*onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.state.picture = event.target.value.trim())}*/}
                                {/*></input>*/}
                            {/*</div>*/}
                            {/*<div className='form-group'>*/}
                                {/*<label>Beskrivelse</label>*/}
                                {/*<textarea*/}
                                    {/*className='form-control'*/}
                                    {/*rows='10'*/}
                                    {/*value={this.state.description}*/}
                                    {/*onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.state.description = event.target.value.trim())}*/}
                                {/*></textarea>*/}
                            {/*</div>*/}
                            {/*<label>Kategori</label>*/}
                            {/*<select*/}
                                {/*className='selectpicker browser-default custom-select'*/}
                                {/*onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.state.category_id = event.target.value)}*/}
                                {/*defaultValue=''*/}
                            {/*><option disabled value=''> -- velg kategori -- </option>*/}
                                {/*{this.categories.map(category => (*/}
                                    {/*<option key={category.category_id} value={category.description}>*/}
                                        {/*{category.description}*/}
                                    {/*</option>*/}
                                {/*))}*/}
                            {/*</select>*/}
                            {/*<button*/}
                                {/*type='button'*/}
                                {/*className='btn btn-dark'*/}
                                {/*style={{marginTop: '20px'}}*/}
                                {/*onClick={() => this.register()}>Fullfør</button>*/}
                        {/*</form>*/}
                    </div>
                </div>
            </div>
        );
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

        const casedata = {
            headline: this.state.headline,
            description: this.state.description,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            zipcode: 7050,
            picture: this.state.picture,
            category_id: this.state.category_id,
            user_id: this.state.user_id
        };

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
