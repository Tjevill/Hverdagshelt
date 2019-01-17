//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import { caseService, categoryService,userService,employeeService} from "../services";
import createHashHistory from "history/createHashHistory";
import { Alert,Card, NavBar, ListGroup, Row, Column, Button, Form, Loading} from './widgets';

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

export default class IssueOverviewForEmployee extends Component <{ match: { params: { name: string, id: number } } }>{
    loaded = false;
    employeeid = -1;
    employee = new Object();
    kommune = "";
    categories = [];
    cases = []; //cases from a specific employee.

    checkName(){
    }

    render(){
      if(this.loaded){
        return (
        <>
          <div className="jumbotron">
            <div className="container text-center">
              <div className="btn-group" role="group" aria-label="First group">
                <a href="#/Issues/All/1" className="btn btn-primary btn-lg active" role="button" aria-pressed="true" >Alle</a>
                  {this.categories.map(categori =>(
                    <a href={"#/issuesEmployee/"+categori.description+"/1"}  onClick={() =>{this.checkName()}} className="btn btn-primary btn-lg active" role="button" aria-pressed="true" >{categori.description}</a>
                  ))}
              </div><br/><br/>
            </div>
          </div>

          <div className="container">
            <h2 class="display-4">Saker</h2>
            <>
            <Router history={history}>
              <table class="table table-hover">
                <thead>
                  <tr >
                    <th scope="col">ID</th>
                    <th scope="col">Tittel</th>
                    <th scope="col">Tid</th>
                    <th scope="col">Handling</th>
                  </tr>
                </thead>
                  <tbody>
                    {this.cases.map(casen =>(
                      <tr>
                        <th>{casen.case_id}</th>
                          <td onClick={()=>history.push('/case/'+casen.case_id)}>{casen.headline}</td>
                          <td>{casen.timestamp.slice(0,16).replace("T", " ")}</td>
                          <td>  <a href="#/Issues/All/1" class="btn btn-sm btn-warning"   >
                                <span class="glyphicon glyphicon-pencil" aria-hidden="true">&nbsp;Rediger&nbsp;</span>
                            </a>
                            <span class="btn btn-sm btn-danger" >
                                <span class="glyphicon glyphicon-remove" aria-hidden="true">&nbsp;Slett&nbsp;&nbsp;</span>
                            </span></td>
                      </tr>
                ))}
                </tbody>
                </table>
            </Router>
          <br/><br/>
          </div>

        </>
        )
      }else{
        return(
          <Loading />
        )
      }
    }

    componentDidMount(){
      this.employeeid = sessionStorage.getItem("userid");
      employeeService
        .getOne(this.employeeid)
        .then(employee => {
            this.employee = employee[0];
            console.log("The logged employee: ",this.employee);
            this.forceUpdate();
        })
        .catch((error: Error) => console.log("Fails by getting the available employee"));

      //Get kommunes navn til employee this.kommune =

      categoryService
        .getAllCategories()
        .then(categories =>{
            this.categories = categories;
            this.forceUpdate();
          })
        .catch((error: Error) => Alert.danger(error.message));

        caseService
          .getAllCases()
            .then(cases => {
                this.cases = cases;
                this.loaded = true;
                this.forceUpdate();
              })
          .catch((error: Error) => Alert.danger(error.message));
    }

}
