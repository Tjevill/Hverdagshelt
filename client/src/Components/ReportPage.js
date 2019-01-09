//@flow

import * as React from "react";
import { Component } from "react-simplified";
import {caseService} from '../services';
import {Alert} from "../widgets";

export default class Report extends Component {
    // categories = [];
    // title = '';
    // picture = '';
    // content = '';
    // category = '';
    // importance = 0;
    headline = '';
    description = '';
    longitude = 0;
    latitude = 0;
    picture = '';
    category_id = 0;
    categories = [];

    render(){
        return(
            <div id='report' class="main-background">
                <Alert />
                <div id='report-wrapper' class="main-background">
                    <div id='report-form' className='card main-background'>
                        <form style={{margin: '20px'}}>
                            <div style={{textAlign: 'left'}}>
                                <h5 className='card-title'>Rapporter et problem</h5>
                            </div>
                            <div className='form-group'>
                                <label style={{float: 'left'}}>Tittel</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.headline}
                                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.headline = event.target.value.trim())}
                                ></input>
                            </div>
                            <div className='form-group'>
                                <label style={{float: 'left'}}>Last opp bilde (link midlertidig)</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={this.picture}
                                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.picture = event.target.value.trim())}
                                ></input>
                            </div>
                            <div className='form-group'>
                                <label>Beskrivelse</label>
                                <textarea
                                    className='form-control'
                                    rows='10'
                                    value={this.description}
                                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.description = event.target.value.trim())}
                                ></textarea>
                            </div>
                            <label>Kategori</label>
                            <select
                                className='selectpicker browser-default custom-select'
                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.category_id = event.target.value)}
                                defaultValue=''
                            ><option disabled value=''> -- velg kategori -- </option>
                                {this.categories.map(category => (
                                    <option key={category.category_id} value={category.description}>
                                        {category.description}
                                    </option>
                                ))}
                            </select>
                            <button
                                type='button'
                                className='btn btn-dark'
                                style={{marginTop: '20px'}}
                                onClick={() => this.register()}>Fullfør</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    async register(){
        var valid = true;
        if (this.headline == ''){
            valid = false;
            Alert.danger('Tittel må fylles inn!');
        } else if (this.headline.length > 64){
            valid = false;
            Alert.danger('Max tittel karakterer: 64');
        }
        if (this.category.trim() == ''){
            valid = false;
            Alert.danger('Kategori er påkrevd!');
        }

        if(valid){
            if (this.picture.trim() == '') this.picture = 'https://tinyurl.com/y73nxqn9';
            caseService.createCase(this.headline.trim(), this.description.trim(), 0, 0, this.picture.trim(), this.category_id)
                .then(window.location.reload())
                .catch((error: Error) => Alert.danger(error.message));
        }
    }

    mounted(){
        caseService.getCategories()
            .then((categories => (this.categories = categories)))
            .catch((error: Error) => console.log(error.message));
    }
}
