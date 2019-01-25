import React from 'react';
import { Link } from 'react-router-dom';
import {refreshToken} from '../src/components/widgets';

export default class AdminMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: []
        };
    }



    componentDidMount() {

        let hmf = sessionStorage.getItem('storedtoken');
        console.log("token: " + hmf);
       // console.log(sessionStorage.getItem('storedtoken'));
    }

    render() {
        const { user, users } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">


            </div>
        );
    }
}

export { AdminMain };