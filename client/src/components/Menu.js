import React, {Component} from "react";
import { Switch, Route, NavLink } from 'react-router-dom'
import { DropdownButton, SplitButton, ButtonToolbar, MenuItem } from 'react-bootstrap';
import createHistory from 'history/createBrowserHistory';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import Navbar from "./Navbar";


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

        console.log("Menu.js: loggedin = " + this.props.loggedin);
        if (!this.props.loggedin) {
            return (
                <nav id="mainav" className="fl_right">
                     <ul className="hovedmeny">
                            <li><NavLink exact activeClassName="current" to="/">Home</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/issues/All/1">Saker</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/events">Events</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/register">Registrer deg!</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/map">Kart</NavLink></li>
                            <li><NavLink exact activeClassName="current" to="/login">Logg inn!</NavLink></li>
                        </ul>

                </nav>
            );
        }

        if (this.props.loggedin && (sessionStorage.getItem("access") == "user")) {

            return (

                <nav id="mainav" className="fl_right">
                    <ul className="hovedmeny">
                        <li><NavLink exact activeClassName="current" to="/">Home</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/report">Meld feil</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/issues/All/1">Saker</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/events">Events</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/map">Kart</NavLink></li>

                        <li><a className="drop" href="/user">Min side</a>
                            <ul>
                                <li><NavLink exact activeClassName="current" to="/user">Min side</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/user/edit">Rediger profil</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/user/changePassword">Forandre passord</NavLink></li>
                                <li><NavLink to="/" onClick={this.handleLogOut}>Logg ut</NavLink></li>
                            </ul>
                        </li>
                    </ul>

                </nav>

            );

        }

        if (this.props.loggedin && (sessionStorage.getItem("access") == "bedrift")) {

            return (

                <nav id="mainav" className="fl_right">
                    <ul className="hovedmeny">
                        <li><NavLink exact activeClassName="current" to="/">Home</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/issues/All/1">Saker</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/events">Events</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/map">Kart</NavLink></li>

                        <li><a className="drop" href="/bedrift">Min side</a>
                            <ul>
                                <li><NavLink exact activeClassName="current" to="/bedrift">Min side</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/bedrift/edit">Rediger profil</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/bedrift/changePassword">Forandre passord</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/bedrift/rapporter">Forandre passord</NavLink></li>
                                <li><NavLink to="/" onClick={this.handleLogOut}>Logg ut</NavLink></li>
                            </ul>
                        </li>
                    </ul>

                </nav>
            );

        }

        if (this.props.loggedin && (sessionStorage.getItem("access") == "kommune")) {


            return (
                <nav id="mainav" className="fl_right">
                    <ul className="hovedmeny">
                        <li><NavLink exact activeClassName="current" to="/">Home</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="admin/issues/:navn/:id">Saker</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/events">Events</NavLink></li>
                        <li><NavLink exact activeClassName="current" to="/map">Kart</NavLink></li>

                        <li><a className="drop" href="#">Min side</a>
                            <ul>
                                <li><NavLink exact activeClassName="current" to="/admin/">Min side</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/admin/edit">Rediger profil</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/admin/changePassword">Forandre passord</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/admin/rapporter">Mine rapporter</NavLink></li>
                                <li><NavLink to="/" onClick={this.handleLogOut}>Logg ut</NavLink></li>
                            </ul>
                        </li>
                        <li><a className="drop" href="#">Administrator</a>
                            <ul>
                                <li><NavLink exact activeClassName="current" to="/admin/kommune">Kommuneansatte</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/admin/helter">Hverdagshelter</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/admin/bedrift">Bedrifter</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/admin/rapporter">Feilrapporter</NavLink></li>
                                <li><NavLink exact activeClassName="current" to="/admin/events">Events</NavLink></li>
                                <li><NavLink to="/" onClick={this.handleLogOut}>Logg ut</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
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
