import React, {Component} from "react";
import { NavLink } from 'react-router-dom'

import createHistory from 'history/createBrowserHistory';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';



const history = createHistory({

})

export default class Menu extends Component {
    active = "";

    handleLogOut() {
        console.log('this is:', this);
        console.log("Cleaning sessionstorage");
        sessionStorage.clear();
        window.location.reload()

    }

    render() {

        // console.log("Menu.js: loggedin = " + this.props.loggedin);
        if (!this.props.loggedin) {
            return (
                <div>
                    <nav id="mainav" className="fl_right">
                         <ul className="hovedmeny">
                                <li><NavLink exact activeClassName="current" to="/">Home</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/issues/1">Saker</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/events/1">Events</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/register">Registrer deg!</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/map">Kart</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/login">Logg inn!</NavLink></li>
                            </ul>

                    </nav>
                    <nav id="hamburgermenu" className="navbar navbar-inverse navbar-static-top" role="navigation">
                        <div className="hamburgercontainer">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar">&nbsp;</span>
                                    <span className="icon-bar">&nbsp;</span>
                                    <span className="icon-bar">&nbsp;</span>
                                </button>
                            </div>


                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav">
                                    <li><NavLink exact activeClassName="current" to="/">Home</NavLink></li>
                                    <li><NavLink exact activeClassName="current" to="/issues/1">Saker</NavLink></li>
                                    <li><NavLink exact activeClassName="current" to="/events/1">Events</NavLink></li>
                                    <li><NavLink exact activeClassName="current" to="/register">Registrer deg!</NavLink></li>
                                    <li><NavLink exact activeClassName="current" to="/map">Kart</NavLink></li>
                                    <li><NavLink exact activeClassName="current" to="/login">Logg inn!</NavLink></li>

                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            );
        }

        if (this.props.loggedin && (sessionStorage.getItem("access") === "user")) {

            return (
            <div>
                <nav id="mainav" className="fl_right">
                    <ul className="hovedmeny">
                        <li><NavLink exact activeClassName="current" to="/">Home</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/user/report">Meld feil</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/issues/1">Saker</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/events/1">Events</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/map">Kart</NavLink></li>

                        <li><a className="drop" href="#/user">Min side</a>
                            <ul>
                                <li><NavLink exact activeClassName="current" to="/user">Min side</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/user/edit">Rediger profil</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/user/changePassword">Forandre passord</NavLink></li>
                                <li><NavLink to="/" onClick={this.handleLogOut}>Logg ut</NavLink></li>
                            </ul>
                        </li>
                    </ul>

                </nav>
                <nav id="hamburgermenu" className="navbar navbar-inverse navbar-static-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>


                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><NavLink exact activeClassName="current" to="/">Home</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/user/report">Meld feil</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/issues/1">Saker</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/events/1">Events</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/map">Kart</NavLink></li>
                                <li><NavLink to="#">---------------------</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/user">Min side</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/user/edit">Rediger profil</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/user/changePassword">Forandre passord</NavLink></li>
                                <li><NavLink to="/" onClick={this.handleLogOut}>Logg ut</NavLink></li>

                            </ul>
                        </div>
                    </div>
                </nav>

                </div>



            );

        }

        if (this.props.loggedin && (sessionStorage.getItem("access") === "bedrift")) {

            return (
            <div>
                <nav id="mainav" className="fl_right">
                    <ul className="hovedmeny">
                        <li><NavLink exact activeClassName="current" to="/">Home</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/bedrift/issues/1">Saker</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/events/1">Events</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/map">Kart</NavLink></li>

                        <li><a className="drop" href="#/bedrift">Min side</a>
                            <ul>
                                <li><NavLink exact activeClassName="current" to="/bedrift">Min side</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/bedrift/edit">Rediger profil</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/bedrift/changePassword">Forandre passord</NavLink></li>
                                <li><NavLink to="/" onClick={this.handleLogOut}>Logg ut</NavLink></li>
                            </ul>
                        </li>
                    </ul>

                </nav>


                <nav id="hamburgermenu" className="navbar navbar-inverse navbar-static-top" role="navigation">
                    <div className="hamburgercontainer">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>


                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><NavLink exact activeClassName="current" to="/">Home</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/bedrift/issues/1">Saker</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/events/1">Events</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/map">Kart</NavLink></li>
                                <li><NavLink to="#">---------------------</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/bedrift">Min side</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/bedrift/edit">Rediger profil</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/bedrift/changePassword">Forandre passord</NavLink></li>
                                <li><NavLink to="/" onClick={this.handleLogOut}>Logg ut</NavLink></li>

                            </ul>
                        </div>
                    </div>
                </nav>

            </div>

            );

        }

        if (this.props.loggedin && (sessionStorage.getItem("access") === "kommune")) {


            return (
                <div>
                    <nav id="mainav" className="fl_right">
                        <ul className="hovedmeny">
                            <li><NavLink exact activeClassName="current" to="/">Home</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/admin/issues/1">Saker</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/events/1">Events</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/map">Kart</NavLink></li>

                            <li><a className="drop" href="#/admin">Min side</a>
                                <ul>
                                    <li><NavLink exact activeClassName="current" to="/admin/">Min side</NavLink></li>
                                    <li><NavLink exact activeClassName="current" to="/admin/edit">Rediger profil</NavLink></li>
                                    <li><NavLink exact activeClassName="current" to="/admin/changePassword">Forandre passord</NavLink></li>
                                    <li><NavLink to="/" onClick={this.handleLogOut}>Logg ut</NavLink></li>
                                </ul>
                            </li>
                            <li><a className="drop" href="#">Administrator</a>
                                <ul>
                                    <li><NavLink exact activeClassName="current" to="/admin/kommune">Kommuneansatte</NavLink></li>
                                    <li><NavLink exact activeClassName="current" to="/admin/heroes/1">Hverdagshelter</NavLink></li>
                                    <li><NavLink exact activeClassName="current" to="/admin/bedrift/oversikt/1">Bedrifter</NavLink></li>
                                    <li><NavLink exact activeClassName="current" to="/admin/events/1">Events</NavLink></li>
                                    <li><NavLink exact activeClassName="current" to="/admin/kategori">Kategorier</NavLink></li>
                                    <li><NavLink onClick={() => window.open("#/statistics")} to="/">Statistikk</NavLink></li>
                                    <li><NavLink to="/" onClick={this.handleLogOut}>Logg ut</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>


                    <nav id="hamburgermenu" className="navbar navbar-inverse navbar-static-top" role="navigation">
                        <div className="hamburgercontainer">
                        <div className="navbar-header">
                             <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>


                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><NavLink exact activeClassName="current" to="/">Home</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/admin/issues/1">Saker</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/events/1">Events</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/map">Kart</NavLink></li>
                            <li><NavLink to="#">---------------------</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/admin/">Min side</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/admin/edit">Rediger profil</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/admin/changePassword">Forandre passord</NavLink></li>
                            <li><NavLink to="#">---------------------</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/admin/kommune">Kommuneansatte</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/admin/heroes/1">Hverdagshelter</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/admin/bedrift/oversikt/1">Bedrifter</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/admin/events/1">Events</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/admin/kategori">Kategorier</NavLink></li>
                            <li><NavLink onClick={() => window.open("#/statistics")} to="/" >Statistikk</NavLink></li>
                            <li><NavLink to="/" onClick={this.handleLogOut}>Logg ut</NavLink></li>
                        </ul>
                    </div>
        </div>
        </nav>

            </div>
            );


        }

    }


    componentDidMount() {

    }

}


/*
<ul className="clear">
                                            <li className="active"><a href="index.html">Home</a></li>
                                            <li><a className="drop" href="#">Pages</a>
                                                <ul>
                                                    <li><a href="pages/gallery.html">Gallery</a></li>
                                                    <li><a href="pages/full-width.html">Full Width</a></li>
                                                    <li><a href="pages/sidebar-left.html">Sidebar Left</a></li>
                                                    <li><a href="pages/sidebar-right.html">Sidebar Right</a></li>
                                                    <li><a href="pages/basic-grid.html">Basic Grid</a></li>
                                                </ul>
                                            </li>
                                            <li><a className="drop" href="#">Dropdown</a>
                                                <ul>
                                                    <li><a href="#">Level 2</a></li>
                                                    <li><a className="drop" href="#">Level 2 + Drop</a>
                                                        <ul>
                                                            <li><a href="#">Level 3</a></li>
                                                            <li><a href="#">Level 3</a></li>
                                                            <li><a href="#">Level 3</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="#">Level 2</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="#">Link Text</a></li>
                                            <li><a href="#">Link Text</a></li>
                                        </ul>
 */
