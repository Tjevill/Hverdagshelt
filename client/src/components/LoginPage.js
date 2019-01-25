// @flow
/* eslint eqeqeq: "off" */
import React from 'react';
import { Component } from 'react-simplified';
import $ from 'jquery';
import {userService} from "../services";
import AnimateHeight from 'react-animate-height';
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();


export default class LoginPage extends Component {
    constructor(props) {
        super(props);



        this.state = {
            height1: 400,
            height2: 400,
            height3: 400,
            email: '',
            password: '',
            submitted: false,
            loading: false,
            error: '',
            message1: '',
            message2: '',
            message3: ''
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

        // console.log(this.state);
    };

    handleSubmitHverdagshelt() {
        this.setState({submitted: true});
        const { email1, password1, returnUrl } = this.state;
        if (!(email1 && password1)) return;
        const login = {

            email1: this.state.email1,
            password1: this.state.password1
        };

        //console.log(" ------ ");
        // console.log("this login: ", login);
        userService
            .loginHverdagshelt(login)
            .then(response => {
                console.log("response: " + response.reply)
                this.setState({message1: response.reply});
                sessionStorage.setItem("storedtoken", response.jwt);
                sessionStorage.setItem('access', 'user');
                console.log("storedtoken: " + sessionStorage.getItem("storedtoken"));
                // console.log("email: " + sessionStorage.getItem("email"));
                // console.log("user: " + sessionStorage.getItem("userid"));
                window.location.reload()
                if (this.state.message1 === "Success") history.push('/');
            })
            .catch((error: Error) => {
                if (error.message.includes("401"))
                    this.state.message1 = "Feil brukernavn eller passord.";
            });
    }

    handleSubmitBedrift() {
        this.setState({submitted: true});
        const { email2, password2, returnUrl } = this.state;
        if (!(email2 && password2)) return;
        const login2 = {

            email2: this.state.email2,
            password2: this.state.password2
        };

        // console.log(" ------ ");
        // console.log("this login2: ", login2);
        userService
            .loginBedrift(login2)
            .then(response => {
                this.setState({message2: response.reply});
                sessionStorage.setItem("storedtoken", response.jwt);
                sessionStorage.setItem('access', 'bedrift');
                //console.log("storedtoken: " + sessionStorage.getItem("storedtoken"));
                //console.log("email: " + sessionStorage.getItem("email"));
                //console.log("user: " + sessionStorage.getItem("userid"));
                window.location.reload();
                if (this.state.message2 === "Success") history.push('/');

            })
            .catch((error: Error) => {
                if (error.message.includes("401"))
                    this.state.message2 = "Feil brukernavn eller passord.";
            });
    }

    handleSubmitKommune() {
        this.setState({submitted: true});
        const { email3, password3, returnUrl } = this.state;
        if (!(email3 && password3)) return;
        const login3 = {

            email3: this.state.email3,
            password3: this.state.password3
        };

        // console.log(" ------ ");
        // console.log("this login: ", login3);
        userService
            .loginKommune(login3)
            .then(response => {
                this.setState({message3: response.reply});
                sessionStorage.setItem("storedtoken", response.jwt);
                sessionStorage.setItem('access', 'kommune');
                sessionStorage.setItem('commune', response.commune);
                sessionStorage.setItem('superuser', response.superuser);
                //console.log("storedtoken: " + sessionStorage.getItem("storedtoken"));
                //console.log("email: " + sessionStorage.getItem("email"));
                //console.log("user: " + sessionStorage.getItem("userid"));
                window.location.reload();
                if (this.state.message3 === "Success") history.push('/');

            })
            .catch((error: Error) => {
                if (error.message.includes("401"))
                    this.state.message3 = "Feil brukernavn eller passord.";
            });
    }

    handleKeyPressUser(e: Event) {
        if (e.key === 'Enter') {
            this.handleSubmitHverdagshelt();
        }
    }

    handleKeyPressOrg(e: Event) {
        if (e.key === 'Enter') {
            this.handleSubmitBedrift();
        }
    }

    handleKeyPressEmp(e: Event) {
        if (e.key === 'Enter') {
            this.handleSubmitKommune();
        }
    }

    componentDidMount() {
        //window.addEventListener("resize", this.onResize.bind(this));
        //this.onResize();
        if(window.innerWidth <= 640){
            $(".login-collapsable").addClass("collapse");
        } else {
            $("#login-user-title").removeAttr("data-toggle");
            $("#login-org-title").removeAttr("data-toggle");
            $("#login-emp-title").removeAttr("data-toggle");
        }
    }

    //mobile = false;

    /*onResize() {
        if(window.innerWidth <= 640 && !this.mobile){
            this.mobile = true;
            $('#login-user-title').attr('data-toggle', 'collapse');
        }else if(window.innerWidth > 640 && this.mobile){
            this.mobile = false;
            $("#login-user-title").removeAttr("data-toggle");
        }
    }*/

    componentWillReceiveProps() {
        console.log("WillRecieveProps: ", this.props)
    }

    render() {
        const { email1, password1, email2, password2, email3, password3, submitted1, submitted2, submitted3, loading1, loading2, loading3, error1, error2, error3, height1, height2, height3 } = this.state;

        return (
            <div id="login-page">

                <div className="row justify-content-center">

                    <div className="group">
                        <div className="one_third first">

                            <div className="loginoption1" /* onClick={() => {this.toggle1()}} */>

                                <h3 id="login-user-title" onClick={() => ("")} data-toggle="collapse" data-target="#login-user-image, #login-user-form" className="login-title">HVERDAGSHELT</h3>
                                <div id="login-user-image" className="profilbilde login-collapsable">
                                    <img src={ require('./resources/hverdagshelt.png') } alt="hverdagshelt"/>
                                </div>

                                <AnimateHeight
                                    id="login-user-form"
                                    className="login-collapsable"
                                    duration={ 500 }
                                    height={ height1 } // see props documentation bellow
                                >
                                    <div id="option1" className="login">

                                        <h4>Logg inn:</h4>

                                        <form name="formuser" id="formuser">
                                            <div className={'form-group' + (submitted1 && !email1 ? ' has-error' : '')}>
                                                <label htmlFor="email1">E-mail</label>
                                                <input type="text" className="form-control" name="email1"  onChange={this.handleChange} onKeyPress={this.handleKeyPressUser}/>
                                                {submitted1 && !email1 &&
                                                <div className="help-block">E-mail is required</div>
                                                }
                                            </div>
                                            <div className={'form-group' + (submitted1 && !password1 ? ' has-error' : '')}>
                                                <label htmlFor="password1">Password</label>
                                                <input type="password" className="form-control" name="password1" autoComplete="password1" onChange={this.handleChange} onKeyPress={this.handleKeyPressUser}/>
                                                {submitted1 && !password1 &&
                                                <div className="help-block">Password is required</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <button type="button" className="btn btn-primary" onClick={() => {this.handleSubmitHverdagshelt()}}>Login</button>
                                                <div className="justadiv"><a href="#reset/user" className="justalink">Glemt passord?</a></div>
                                                <div className="justadiv"><a href="#register" className="justalink">Ingen bruker?</a></div>
                                                {loading1 &&
                                                <div>Loading</div>}
                                            </div>
                                            <div className="form-group"><h4>{this.state.message1}</h4></div>
                                            {error1 &&
                                            <div className={'alert alert-danger'}>{error1}</div>
                                            }
                                        </form>
                                    </div>
                                </AnimateHeight>
                            </div>

                        </div>
                        <div className="one_third">

                            <div className="loginoption2" /* onClick={() => {this.toggle2()}} */>

                                <h3 id="login-org-title" onClick={() => ("")} data-toggle="collapse" data-target="#login-org-image, #login-org-form" className="login-title">BEDRIFT</h3>
                                <div id="login-org-image" className="profilbilde login-collapsable">
                                    <img src={ require('./resources/bedriftsansatt.png') } alt="bedriftsansatt" />
                                </div>

                                <AnimateHeight
                                    id="login-org-form"
                                    className="login-collapsable"
                                    duration={ 500 }
                                    height={ height2 } // see props documentation bellow
                                >
                                    <div id="option2" className="login">

                                        <h4>Logg inn:</h4>

                                        <form name="formbedrift" id="formbedrift">
                                            <div className={'form-group' + (submitted2 && !email2 ? ' has-error' : '')}>
                                                <label htmlFor="email2">E-mail</label>
                                                <input type="text" className="form-control" name="email2" onChange={this.handleChange} onKeyPress={this.handleKeyPressOrg}/>
                                                {submitted2 && !email2 &&
                                                <div className="help-block">E-mail is required</div>
                                                }
                                            </div>
                                            <div className={'form-group' + (submitted2 && !password2 ? ' has-error' : '')}>
                                                <label htmlFor="password2">Password</label>
                                                <input type="password" className="form-control" name="password2" autoComplete="password2" onChange={this.handleChange} onKeyPress={this.handleKeyPressOrg}/>
                                                {submitted2 && !password2 &&
                                                <div className="help-block">Password is required</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <button type="button" className="btn btn-primary" onClick={() => {this.handleSubmitBedrift()}}>Login</button>
                                                <div className="justadiv"><a href="#reset/org" className="justalink">Glemt passord?</a></div>
                                                {loading2 &&
                                                <div>Loading</div>}
                                            </div>
                                            <div className="form-group"><h4>{this.state.message2}</h4></div>
                                            {error2 &&
                                            <div className={'alert alert-danger'}>{error2}</div>
                                            }
                                        </form>
                                    </div>
                                </AnimateHeight>
                            </div>

                        </div>
                        <div className="one_third">

                            <div className="loginoption3" /* onClick={() => {this.toggle3()}} */>

                                <h3 id="login-emp-title" onClick={() => ("")} data-toggle="collapse" data-target="#login-emp-image, #login-emp-form" className="login-title">KOMMUNE</h3>
                                <div id="login-emp-image" className="profilbilde login-collapsable">
                                    <img src={ require('./resources/kommuneansatt.png') } alt="kommuneansatt" />
                                </div>

                                <AnimateHeight
                                    id="login-emp-form"
                                    className="login-collapsable"
                                    duration={ 500 }
                                    height={ height3 } // see props documentation bellow
                                >
                                    <div id="option3" className="login">

                                        <h4>Logg inn:</h4>

                                        <form name="formkommune" id="formkommune">
                                            <div className={'form-group' + (submitted3 && !email3 ? ' has-error' : '')}>
                                                <label htmlFor="email3">E-mail</label>
                                                <input type="text" className="form-control" name="email3"  onChange={this.handleChange} onKeyPress={this.handleKeyPressEmp}/>
                                                {submitted3 && !email3 &&
                                                <div className="help-block">E-mail is required</div>
                                                }
                                            </div>
                                            <div className={'form-group' + (submitted3 && !password3 ? ' has-error' : '')}>
                                                <label htmlFor="password3">Password</label>
                                                <input type="password" className="form-control" name="password3" autoComplete="password3" onChange={this.handleChange} onKeyPress={this.handleKeyPressEmp}/>
                                                {submitted3 && !password3 &&
                                                <div className="help-block">Password is required</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <button type="button" className="btn btn-primary" onClick={() => {this.handleSubmitKommune()}}>Login</button>
                                                <div className="justadiv"><a href="#reset/emp" className="justalink">Glemt passord?</a></div>
                                                {loading3 &&
                                                <div> Loading </div>}
                                            </div>
                                            <div className="form-group"><h4>{this.state.message3}</h4></div>
                                            {error3 &&
                                            <div className={'alert alert-danger'}>{error3}</div>
                                            }
                                        </form>
                                    </div>
                                </AnimateHeight>
                            </div>

                        </div>
                    </div>
                   </div>
            </div>
        );
    }
}

export { LoginPage };

// <a href="https://www.freepik.com/free-vector/variety-of-cartoon-characters_766801.htm">Designed by Freepik</a>
