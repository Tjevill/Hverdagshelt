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

export default class IssueOverview extends Component <{ match: { params: { name: string, id: number } } }>{
  caseofCat = [];
  categories = [];
  sepacategories = [];
  cases = [];
  cateside  = [];

  render(){
    console.log(this.caseofCat);
    let lists;
    let sidebuttons;

    if(this.props.match.params.name=="All"){
      console.log(this.props.match.params.id);
      this.cateside = this.cases.slice(1,6);

      lists = (
        <div>
        {this.cateside.map(casen =>(
          <ListGroup.Item to={'/case/'+casen.case_id}> {casen.case_id} : {casen.headline} : {casen.category_id} </ListGroup.Item>
        ))}
        </div>
      );

      sidebuttons =(
        <div>
        {(count(sliceArray(this.cases, 15))).map(sidetall => (
            <button type="button" class="btn btn-outline-dark" onClick={() => history.push('/Issues/All/'+sidetall)}>{sidetall} </button>
        ))}
        </div>
      );

     } else {
      lists = (
        <div>
        {this.caseofCat.map(casen =>(
          <ListGroup.Item to={'/case/'+casen.case_id}> {casen.headline} : {casen.category_id} </ListGroup.Item>
        ))}
        </div>);
        sidebuttons =(
          <div>
          {(count(sliceArray(this.caseofCat, 15))).map(sidetall => (
              <button type="button" class="btn btn-outline-dark" onClick={() => history.push('/Issues/'+this.props.match.params.name+'/'+sidetall)}>{sidetall}</button>
          ))}
          </div>);
     };




    return (
    <>
      <div className="jumbotron">
        <div className="container text-center">
          <p>Kategorier</p>
          <div className="btn-group" role="group" aria-label="First group">
              <a href="#/Issues/All/1" className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Alle</a>
                {this.categories.map(categori =>(
                  <a href={"#/Issues/"+categori.description+"/1"} className="btn btn-primary btn-lg active" role="button" aria-pressed="true">{categori.description}</a>
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
          <div class="btn-group">
            {sidebuttons}
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
      .searchCaseByCat(this.props.match.params.name)
      .then(cases => {
          this.caseofCat = cases;
          console.log("name"+this.props.match.params.name);
          this.forceUpdate();
        })
      .catch((error: Error) => Alert.danger(error.message));
    };

}
