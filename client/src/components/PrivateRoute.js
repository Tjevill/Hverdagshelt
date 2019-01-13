import React from 'react';
import { Component } from "react-simplified";
import { Route, Redirect } from 'react-router-dom';
import {refreshToken} from './widgets';



export default class PrivateRoute extends Component<{ path: string }> {
    verified = false;

    render() {
        //console.log("Håper: " + this.verified);

        if(this.verified) {
            return (<Redirect to='/admin/main' />); // verified
        } else {
            return (<Redirect to='/admin/login' />); // ikke verified
        }

    }

    componentDidMount() {
       // console.log("Dette vil allltid skje")


        let promiseObject = refreshToken();
        promiseObject.then(value => ( this.verified = value));



    }

}


/*

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (

            sessionStorage.getItem('storedtoken') !== undefined
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />
    )} />

)

let promiseObject = refreshToken();
promiseObject.then(function (value) { var verified : boolean = value; });


console.log("value test: " + promiseObject.then(function (value) { return value }));
promiseObject.then(function (value) { console.log("value: " + value)});

export default PrivateRoute;

*/