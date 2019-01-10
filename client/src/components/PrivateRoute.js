import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        console.log("Hm;" + sessionStorage.getItem('user')),
            sessionStorage.getItem('user')
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />
    )} />

)
setTimeout(function(){
    console.log("Hmmmm" + sessionStorage.getItem('user')); }, 3000);
export default PrivateRoute;
