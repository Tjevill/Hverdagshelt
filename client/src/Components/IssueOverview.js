//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { Alert,Card, NavBar, ListGroup, Row, Column, Button, Form} from './widgets';

const history = createHashHistory();

export default class IssueOverview extends Component {
  Kategories = [];
  Cases = [];
  render(){
    return (
      <>
      <div className="jumbotron">
        <div className="container text-center">
          <p >Kategorier</p>
          <div className="btn-group btn-group-lg" role="group" aria-label="First group">
          <button type="button" className="btn btn-secondary">All</button>
          <button type="button" className="btn btn-secondary">Kategori1</button>
          <button type="button" className="btn btn-secondary">Kategori2</button>
          <button type="button" className="btn btn-secondary">Kategori3</button>
          <button type="button" className="btn btn-secondary">Kategori4</button>
     </div>
        </div>
        </div>
        <p>Nyeste Meldte Feil</p>
        <Router history={history}>
        <div className="container text-center">
        <ListGroup>
            <ListGroup.Item to={'/123'}>
              Ødelagt lampe
            </ListGroup.Item>
            <ListGroup.Item to={'/234'}>
              Hjemløs katt
            </ListGroup.Item>
            <ListGroup.Item to={'/345'}>
              Ødelagt vei
            </ListGroup.Item>
        </ListGroup>
        </div>
        </Router>
        <br/><br/><div id='toolbar'>
        <div className='wrapper text-center'>
              <div className="btn-group">
                <button type="button" className="btn btn-outline-dark" onClick={() => history.push('/categories/All/')}>1</button>
                <button type="button" className="btn btn-outline-dark" onClick={() => history.push('/categories/All/')}>2</button>
                <button type="button" className="btn btn-outline-dark" onClick={() => history.push('/categories/All/')}>3</button>
              </div>
        </div>
      </div>
    </>
    /*
      <div className="jumbotron">
        <div className="container text-center">
          <p>Kategorier</p>
          <div className="btn-group btn-group-lg" role="group" aria-label="First group">
          <button type="button" className="btn btn-secondary">Alle</button>
          {this.Kategories.map(kategori =>{
            <button type="button" className="btn btn-secondary">{kategori.name}</button>
          })}
          </div>
        </div>
      </div>
      <p>Nyeste Meldte Feil</p>
      <Router history={history}>
      <div className="container text-center">
      <ListGroup>
        {this.Cases.map(case => (
          <ListGroup.Item to={'/casesside'}>
            {case.oversikt}
          </ListGroup.Item>
        ))}
      </ListGroup>
      </div>
      </Router>
      </>
      Dele inn forskjellige sider
      //to slice a array with a particular size
      function sliceArray(array, size) {
        var result = [];
        for (var x = 0; x < Math.ceil(array.length / size); x++) {
          var start = x * size;
          var end = start + size;
          result.push(array.slice(start, end));
        }
        return result;
      }


      function count(array) {
        var result = [];
        for (var x = 1; x < array.length+1; x++) {
          result.push(x);
        }
        return result;
      }

      Begrens antall saker på en side
      <br/><br/><div id='toolbar'>
        <div className='wrapper text-center'>
            <div className="btn-group">
              <button type="button" className="btn btn-outline-dark" onClick={() => history.push('/categories/All/')}>1</button>
              <button type="button" className="btn btn-outline-dark" onClick={() => history.push('/categories/All/')}>2</button>
              <button type="button" className="btn btn-outline-dark" onClick={() => history.push('/categories/All/')}>3</button>
            </div>
            eller
            <div className="btn-group">
              {(count(sliceArray(this.Cases, 8))).map(case => (
              <button type="button" className="btn btn-outline-dark" onClick={() => history.push('/categories/All/'+case)}>{case}</button>
              ))}
          </div>
        </div>
      </div>
       */
    );
  }
}
