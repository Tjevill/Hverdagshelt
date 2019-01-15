// @flow
/* eslint eqeqeq: "off" */
import React from 'react';
import { Component } from "react-simplified";
import { Route, Redirect } from 'react-router-dom';
import {refreshToken} from './widgets';



export default class EmptyClass extends Component {
 render() {
     return (
        <div></div>
     );
 }
}

export class PrivateRoute extends Component<{ path: string }> {
    verified = false;

    render() {
        //console.log("Håper: " + this.verified);

        if(this.verified) {
            console.log("User is verified, sending to main page");
            return (<Redirect to='/admin/main' />); // verified
        } else {
            console.log("User is not verified, sending to loginpage.");
            return (<Redirect to='/admin/login' />); // ikke verified
        }

    }

    componentDidMount() {
        let promiseObject = refreshToken();
        promiseObject.then(value => ( this.verified = value));
    }

}
