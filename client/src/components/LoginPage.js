// @flow
/* eslint eqeqeq: "off" */
import React from 'react';
import { authService } from '../authservices';
import {userService} from "../services";
import {refreshToken} from './widgets';
import AnimateHeight from 'react-animate-height';
import createHistory from 'history/createBrowserHistory'

const history = createHistory({
    forceRefresh: true
})

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        authService.logout();

        this.state = {
            height1: 550,
            height2: 0,
            height3: 0,
            email: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };


        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmitHverdagshelt() = this.handleSubmitHverdagshelt().bind(this);
    }



    toggle1_ = () => {
        const { height1 } = this.state;
        const { height2 } = this.state;
        const { height3 } = this.state;
        this.setState({
            height1: height1 === 0 ? 'auto' : 0,
            height2: height2 === 0 ? 0 : 0,
            height3: height3 === 0 ? 0 : 0,
        });
    };

    toggle2 = () => {
        const { height1 } = this.state;
        const { height2 } = this.state;
        const { height3 } = this.state;
        this.setState({
            height1: height1 === 0 ? 0 : 0,
            height2: height2 === 0 ? 'auto' : 0,
            height3: height3 === 0 ? 0 : 0,
        });
    };

    toggle3 = () => {
        const { height1 } = this.state;
        const { height2 } = this.state;
        const { height3 } = this.state;
        this.setState({
            height1: height1 === 0 ? 0 : 0,
            height2: height2 === 0 ? 0 : 0,
            height3: height3 === 0 ? 'auto' : 0,
        });
    };


    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

        console.log(this.state);
    };

    handleSubmitHverdagshelt() {
        this.setState({submitted: true});
        const { email1, password1, returnUrl } = this.state;
        if (!(email1 && password1)) return;
        const login = {

            email1: "praxiz@gmail.com",
            password1: "mittpass"
        };

        console.log(" ------ ");
        this.message = "Login successful";
        console.log("this login: ", login);
        userService
            .loginHverdagshelt(login)
            .then(response => {
                this.message = response.reply;
                let info = JSON.stringify(response);
                console.log("Response: " + info)
                sessionStorage.setItem("storedtoken", response.jwt);
                sessionStorage.setItem('email', response.email);
                sessionStorage.setItem('userid', response.user_id);
                sessionStorage.setItem('access', 'user');
                //console.log("storedtoken: " + sessionStorage.getItem("storedtoken"));
                //console.log("email: " + sessionStorage.getItem("email"));
                //console.log("user: " + sessionStorage.getItem("userid"));


            })
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/profile" } };
                    this.props.history.push(from);
                },
                // error => this.setState({ error, loading: false })
                error => console.log({ error, loading: false })
            );
    }

    handleSubmitBedrift(e) {
        this.setState({submitted: true});
        const { email1, password1, returnUrl } = this.state;
        if (!(email1 && password1)) return;
        const login = {

            email1: "praxiz@gmail.com",
            password1: "mittpass"
        };

        console.log(" ------ ");
        this.message = "Login successful";
        console.log("this login: ", login);
        userService
            .loginHverdagshelt(login)
            .then(response => {
                this.message = response.reply;
                let info = JSON.stringify(response);
                console.log("Response: " + info)
                sessionStorage.setItem("storedtoken", response.jwt);
                sessionStorage.setItem('email', response.email);
                sessionStorage.setItem('userid', response.user_id);
                sessionStorage.setItem('access', 'user');
                //console.log("storedtoken: " + sessionStorage.getItem("storedtoken"));
                //console.log("email: " + sessionStorage.getItem("email"));
                //console.log("user: " + sessionStorage.getItem("userid"));


            })
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/profile" } };
                    this.props.history.push(from);
                },
                // error => this.setState({ error, loading: false })
                error => console.log({ error, loading: false })
            );
    }


    handleSubmitKommune(e) {
        this.setState({submitted: true});
        const { email1, password1, returnUrl } = this.state;
        if (!(email1 && password1)) return;
        const login = {

            email1: "praxiz@gmail.com",
            password1: "mittpass"
        };

        console.log(" ------ ");
        this.message = "Login successful";
        console.log("this login: ", login);
        userService
            .loginHverdagshelt(login)
            .then(response => {
                this.message = response.reply;
                let info = JSON.stringify(response);
                console.log("Response: " + info)
                sessionStorage.setItem("storedtoken", response.jwt);
                sessionStorage.setItem('email', response.email);
                sessionStorage.setItem('userid', response.user_id);
                sessionStorage.setItem('access', 'user');
                //console.log("storedtoken: " + sessionStorage.getItem("storedtoken"));
                //console.log("email: " + sessionStorage.getItem("email"));
                //console.log("user: " + sessionStorage.getItem("userid"));


            })
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/profile" } };
                    this.props.history.push(from);
                },
                // error => this.setState({ error, loading: false })
                error => console.log({ error, loading: false })
            );
    }

    componentDidMount() {

    }

    render() {
        const { email1, password1, submitted, loading, error, height1, height2, height3 } = this.state;

        return (
            <div className="container">

                <div className="row">



                    <div className="loginoption1" /* onClick={() => {this.toggle1()}} */>

                        <h3>HVERDAGSHELT</h3>
                        <div className="profilbilde">
                            <img src={ require('./resources/hverdagshelt.png') } />
                        </div>

                        <AnimateHeight
                            duration={ 500 }
                            height={ height1 } // see props documentation bellow
                        >
                        <div id="option1" className="login">

                            <h4>Logg inn:</h4>

                                <form name="form1" onSubmit={() => {this.handleSubmitHverdagshelt()}}>
                                <div className={'form-group' + (submitted && !email1 ? ' has-error' : '')}>
                                    <label htmlFor="email1">E-mail</label>
                                    <input type="text" className="form-control" name="email1"  onChange={this.handleChange} />
                                    {submitted && !email1 &&
                                    <div className="help-block">E-mail is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !password1 ? ' has-error' : '')}>
                                    <label htmlFor="password1">Password</label>
                                    <input type="password" className="form-control" name="password1" onChange={this.handleChange} />
                                    {submitted && !password1 &&
                                    <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                    {loading &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                </div>
                                {error &&
                                <div className={'alert alert-danger'}>{error}</div>
                                }
                            </form>
                        </div>
                        </AnimateHeight>
                    </div>



                    <div className="loginoption1" /* onClick={() => {this.toggle1()}} */>

                        <h3>BEDRIFT</h3>
                        <div className="profilbilde">
                            <img src={ require('./resources/bedriftsansatt.png') } />
                        </div>

                        <AnimateHeight
                            duration={ 500 }
                            height={ height1 } // see props documentation bellow
                        >
                            <div id="option1" className="login">

                                <h4>Logg inn:</h4>

                                <form name="form1" onSubmit={() => {this.handleSubmitHverdagshelt()}}>
                                    <div className={'form-group' + (submitted && !email1 ? ' has-error' : '')}>
                                        <label htmlFor="email1">E-mail</label>
                                        <input type="text" className="form-control" name="email1"  onChange={this.handleChange} />
                                        {submitted && !email1 &&
                                        <div className="help-block">E-mail is required</div>
                                        }
                                    </div>
                                    <div className={'form-group' + (submitted && !password1 ? ' has-error' : '')}>
                                        <label htmlFor="password1">Password</label>
                                        <input type="password" className="form-control" name="password1" onChange={this.handleChange} />
                                        {submitted && !password1 &&
                                        <div className="help-block">Password is required</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                        {loading &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                    </div>
                                    {error &&
                                    <div className={'alert alert-danger'}>{error}</div>
                                    }
                                </form>
                            </div>
                        </AnimateHeight>
                    </div>

                    <div className="loginoption1" /* onClick={() => {this.toggle1()}} */>

                        <h3>KOMMUNE</h3>
                        <div className="profilbilde">
                            <img src={ require('./resources/kommuneansatt.png') } />
                        </div>

                        <AnimateHeight
                            duration={ 500 }
                            height={ height1 } // see props documentation bellow
                        >
                            <div id="option1" className="login">

                                <h4>Logg inn:</h4>

                                <form name="form1" onSubmit={() => {this.handleSubmitHverdagshelt()}}>
                                    <div className={'form-group' + (submitted && !email1 ? ' has-error' : '')}>
                                        <label htmlFor="email1">E-mail</label>
                                        <input type="text" className="form-control" name="email1"  onChange={this.handleChange} />
                                        {submitted && !email1 &&
                                        <div className="help-block">E-mail is required</div>
                                        }
                                    </div>
                                    <div className={'form-group' + (submitted && !password1 ? ' has-error' : '')}>
                                        <label htmlFor="password1">Password</label>
                                        <input type="password" className="form-control" name="password1" onChange={this.handleChange} />
                                        {submitted && !password1 &&
                                        <div className="help-block">Password is required</div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                        {loading &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                    </div>
                                    {error &&
                                    <div className={'alert alert-danger'}>{error}</div>
                                    }
                                </form>
                            </div>
                        </AnimateHeight>
                    </div>


                </div>


            </div>
        );
    }
}

export { LoginPage };

// <a href="https://www.freepik.com/free-vector/variety-of-cartoon-characters_766801.htm">Designed by Freepik</a>