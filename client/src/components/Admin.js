import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

function AuthExample() {
    return (
        <Router>
            <div>
                <AuthButton />
                <ul>
                    <li>
                        <Link to="/public">Public Page</Link>
                    </li>
                    <li>
                        <Link to="/protected">Protected Page</Link>
                    </li>
                </ul>
                <Route path="/public" component={Public} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/protected" component={Protected} />
            </div>
        </Router>
    );
}

function refreshToken() {
    const myHeaders = new Headers();

    myHeaders.append('x-access-token', sessionStorage.getItem('storedtoken'));
    myHeaders.append('Content-Type', 'application/json; charset=utf-8');

    let url = 'http://localhost:8080/refreshtoken';
    let fetchData = {
        method: 'POST',
        headers: myHeaders
    }

    fetch(url, fetchData)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            let mytoken = myJson.jwt;
            sessionStorage.setItem('storedtoken', mytoken);
            if (mytoken != undefined) {
                console.log("Refreshtoken: Token refreshed!");
                return true;
            }
            else {
                console.log("Refreshtoken: Mangler token. Kan ikke refreshe");
                return false;
            }
        });
}


const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const AuthButton = withRouter(
    ({ history }) =>
        fakeAuth.isAuthenticated ? (
            <p>
                Welcome!{" "}
                <button
                    onClick={() => {
                        fakeAuth.signout(() => history.push("/"));
                    }}
                >
                    Sign out
                </button>
            </p>
        ) : (
            <p>You are not logged in.</p>
        )
);

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                fakeAuth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

function Public() {
    return <h3>Public</h3>;
}

function Protected() {
    return <h3>Protected</h3>;
}

class Login extends React.Component {
    state = { redirectToReferrer: false };

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}

export default AuthExample;