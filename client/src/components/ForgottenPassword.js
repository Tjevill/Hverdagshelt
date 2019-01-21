//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { userService } from "../services";
const history = createHashHistory();


export default class ChangePassword extends Component {
    constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A email was submitted: ' + this.state.value);
        userService.sendResetLink(this.state.value);
        //history.push('/');
        event.preventDefault();
    }


     render() {
        return(
            <div class="form-group">
                <label for="exampleInputEmail1">Skriv inn din e-postadresse her</label>
                <input 
                    type="email" 
                    class="form-control" 
                    id="InputEmail" 
                    aria-describedby="emailHelp" 
                    placeholder="Enter email"
                    onChange={this.handleChange}
                />
                <small id="emailHelp" class="form-text text-muted">En hverdagshelt kan også glemme sitt passord!</small>
                <button id ="submit"  type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
                Send inn
                </button>
            </div>       
        );
    }
}