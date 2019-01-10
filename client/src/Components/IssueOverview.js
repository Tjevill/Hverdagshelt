//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import { caseService } from "../services";
import createHashHistory from "history/createHashHistory";
import { Alert,Card, NavBar, ListGroup, Row, Column, Button, Form} from './widgets';

const history = createHashHistory();


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

export default class IssueOverview extends Component {
  categories = [];
  cases = [];
  render(){
    return (
    <>
      <div className="jumbotron">
        <div className="container text-center">
          <p>Kategorier</p>
          <div className="btn-group" role="group" aria-label="First group">
              <a href="#/IssueOverview" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Alle</a>
                {this.categories.map(categori =>(
                  <a href="#/IssueOverview" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">{categori.description}</a>
                ))}
          </div>
        </div>
      </div>

      <p>Nyeste Meldte Feil</p>
        <Router history={history}>
          <div className="container text-center">
            <ListGroup>
                {this.cases.map(casen =>(
                  <ListGroup.Item to={'/casesside'}> {casen.headline} </ListGroup.Item>
                ))}
            </ListGroup>
         </div>
        </Router>
      <br/><br/>

      <div id='toolbar'>
        <div className='wrapper text-center'>
            <div className="btn-group">
                <button type="button" className="btn btn-outline-dark" onClick={() => history.push('/categories/All/')}>1</button>
                <button type="button" className="btn btn-outline-dark" onClick={() => history.push('/categories/All/')}>2</button>
                <button type="button" className="btn btn-outline-dark" onClick={() => history.push('/categories/All/')}>3</button>
            </div>
        </div>
      </div>
    </>
    );
  }

  componentDidMount(){
    console.log("mounted IssuesOverview");
    caseService
      .getCases()
      .then(cases => (console.log("cases:" + cases)))
      .catch((error: Error) => Alert.danger(error.message));
    caseService
      .getCategories()
      .then(categories =>(console.log("categories:" + categories)))
      .catch((error: Error) => Alert.danger(error.message));
  }
}
