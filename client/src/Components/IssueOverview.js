//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import { caseService, categoryService} from "../services";
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

//<ListGroup.Item to={'/casesside'}> {casen.headline} </ListGroup.Item>

export default class IssueOverview extends Component <{ match: { params: { name: string } } }>{
  caseofCat = [];
  categories = [];
  cases = [];

  render(){
    let lists;

    if(this.props.match.params.name=="All"){
      lists = (
        <div>
        {this.cases.map(casen =>(
          <ListGroup.Item to={'/case/'+casen.case_id}> {casen.headline} </ListGroup.Item>
        ))}
        </div>);
     }else{
      lists = (
        <div>
        {this.caseofCat.map(casen =>(
          <ListGroup.Item to={'/case/'+casen.case_id}> {casen.headline} </ListGroup.Item>
        ))}
        </div>);
     }

    return (
    <>
      <div className="jumbotron">
        <div className="container text-center">
          <p>Kategorier</p>
          <div className="btn-group" role="group" aria-label="First group">
              <a href="#/Issues/All" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Alle</a>
                {this.categories.map(categori =>(
                  <a href={"#/Issues/"+categori.description} className="btn btn-primary btn-lg active" role="button" aria-pressed="true">{categori.description}</a>
                ))}
          </div>
        </div>
      </div>

      <p>Nyeste Meldte Feil</p>
        <Router history={history}>
          <div className="container text-center">
            <ListGroup>
                {lists}
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
    //console.log("mounted IssuesOverview");
    caseService
      .getAllCases()
        .then(cases => {
            this.cases = cases;
            console.log(this.cases);
            this.forceUpdate();
          })
      .catch((error: Error) => Alert.danger(error.message));
    categoryService
      .getAllCategories()
      .then(categories =>{
          this.categories = categories;
          console.log(this.categories);
          this.forceUpdate();
        })
      .catch((error: Error) => Alert.danger(error.message));
    caseService
      .getAllCases()
      .then(cases => {
          this.caseofCat = cases;
          console.log(this.cases);
          this.forceUpdate();
        })
      .catch((error: Error) => Alert.danger(error.message));

  }
}
