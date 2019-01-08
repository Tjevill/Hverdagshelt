//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { Alert,Card, NavBar,ListGroup,Row, Column, Button, Form} from './widgets';


export default class IssueOverview extends Component {
  Kategories = [];
  Cases = [];
  render(){
    return (
      <>
      <div class="jumbotron">
        <div class="container text-center">
          <p>Kategorier</p>
          <div class="btn-group btn-group-lg" role="group" aria-label="First group">
          <button type="button" class="btn btn-secondary">Alle</button>
          {this.Kategories.map(kategori =>{
            <button type="button" class="btn btn-secondary">{kategori.name}</button>
          })}
          </div>
        </div>
      </div>
      <p>Nyeste Meldte Feil</p>
      <Router history={history}>
      <ListGroup>
        {this.Cases.map(case => {
          <ListGroup.Item to={'/casesside'}>
            {case.oversikt}
          </ListGroup.Item>
        })
        }
      </ListGroup>
      </Router>
      </>
    );
  }
}
