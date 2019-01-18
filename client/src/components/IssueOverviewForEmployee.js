//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import { caseService, categoryService,userService,employeeService,statusService} from "../services";
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
    status = [];

    checkName(){
    }

    render(){
      if(this.loaded){
        return (
        <>
        <br/><br/>
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-8">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVQATgWe5oXqxAnlTcsDNW9Y6kO7YKLHsAuqFV-Fxyiz8gT_e62g"width="50"/>
              </div>
              <div class="col-6 col-md-4">
                <div class="form-group">
                  <label for="inputKommune">Kategorier &nbsp;</label>
                  <select class="w-auto" id="kommune" name="kommune" class="form-control" onChange={this.handleChangeStatus}>
                      <option selected value={0}>Alle</option>
                        {this.categories.map(category => (
                            <option value={category.category_id}>{category.description}</option>
                        ))}
                  </select>
                </div>
              </div>
            </div>

         <div class="row">
          <div class="col-6 col-md-4">
            <h2 class="display-4">Saker</h2>
          </div>
          <div class="col-6 col-md-4"></div>
            <div class="col-6 col-md-4">
              <div class="form-group">
                <label for="inputKommune">Status &nbsp;</label>
                  <select class="w-auto" id="kommune" name="kommune" class="form-control" onChange={this.handleChangeStatus}>
                    <option selected value={0}>Alle</option>
                    <option value={1}>Registrert</option>
                    <option value={2}>Under Vurdering</option>
                    <option value={3}>Satt på vent</option>
                    <option value={4}>Arbeid pågår</option>
                    <option value={5}>Avvist</option>
                    <option value={6}>Løst</option>
                  </select>
              </div>
            </div>
          </div>

      <div class="row">
        <div class="col-6 col-md-4">Kommune: Trondheim</div>
        <div class="col-6 col-md-4"></div>
        <div class="col-6 col-md-4">
          <input type="text" name="search" placeholder="Search.."/>
          <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
        </div>
      </div>
    </div>
          <br/><br/>
          <div class="container">
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
                            </span><a>{casen.status_id}</a></td>

                      </tr>
                ))}
                </tbody>
                </table>
            </Router>
            </div>
          <br/><br/>

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
        .catch((error: Error) => console.log("Fails by getting the available categories"));

      caseService
          .getAllCases()
            .then(cases => {
                this.cases = cases;
                this.loaded = true;
                this.forceUpdate();
              })
          .catch((error: Error) => console.log("Fails by getting the available cases"));

    }
}
