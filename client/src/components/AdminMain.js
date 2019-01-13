import React from 'react';
import { Link } from 'react-router-dom';
import {refreshToken} from './widgets';

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
        console.log("hmf: " + hmf);
        console.log(sessionStorage.getItem('storedtoken'));
    }

    render() {
        const { user, users } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">

                <h1>Hi {user.name}!</h1>
                <p>You're logged in with React & Basic HTTP Authentication!!</p>
                <h3>Users from secure api end point:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.length &&
                <ul>
                    {users.map((user, index) =>
                        <li key={user.id}>
                            {user.firstName + ' ' + user.lastName}
                        </li>
                    )}
                </ul>
                }
                <p>
                    <Link to="/admin/login">Logout</Link>

                </p>
                <p><button type="button" className="login100-form-btn" onClick={this.refreshToken}>Refresh token</button>
                </p>
            </div>
        );
    }
}

export { AdminMain };