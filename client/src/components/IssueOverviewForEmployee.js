//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import {
  caseService,
  categoryService,
  userService,
  employeeService,
  statusService
} from "../services";
import createHashHistory from "history/createHashHistory";
import {
  Alert,
  Card,
  NavBar,
  ListGroup,
  Row,
  Column,
  Button,
  Form,
  Loading
} from "./widgets";

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
  for (var x = 1; x < array.length + 1; x++) {
    result.push(x);
  }
  return result;
}

export default class IssueOverviewForEmployee extends Component<{
  match: { params: { name: string, id: number } }
}> {
  loaded = false;
  employeeid = "";
  employee = new Object();
  kommune = "";
  categories = [];
  cases = []; //cases from a specific employee.
  status = [];
  backup = [];
  statusid = "";
  categoryid = 0;
  casesbyStatus = [];
  statusname = ["Registrert","Under Vurdering","Satt på vent", "Arbeid pågår", "Avvist", "Løst"];
  caseside ="";

  handleChangeStatus = event => {
    document.getElementById('search').value = "";
    let categoryid = this.categoryid;
    this.statusid = event.target.value;
    if (event.target.value == 0) {
      if(this.categoryid>0){
        this.casesbyStatus = this.cases.filter(function(value){
           return value.category_id == categoryid;
        });
        this.backup = this.casesbyStatus;
        this.forceUpdate();
      }else{
        console.log("Show the cases of all the status");
        this.casesbyStatus = this.cases;
        this.backup = this.casesbyStatus;
        this.forceUpdate();
      }
    } else {
      if(this.categoryid>0){
        this.casesbyStatus = this.cases.filter(function(value){
           return value.category_id == categoryid;
        });
        this.casesbyStatus = this.casesbyStatus.filter(function(value) {
          return value.status_id == event.target.value;
        });
        this.backup = this.casesbyStatus;
        this.forceUpdate();
      }else{
      this.casesbyStatus = this.cases.filter(function(value) {
        return value.status_id == event.target.value;
      });
      this.backup = this.casesbyStatus;

      this.forceUpdate();
      }
  }};


  handleChangeCategories = event => {
    document.getElementById('search').value = "";
    this.categoryid = event.target.value;
    console.log("value:" + event.target.value);
    let statusid = this.statusid;
    if(event.target.value == 0){
      if(this.statusid>0){
        this.casesbyStatus = this.cases.filter(function(value) {
          return value.status_id == statusid;
        });
        this.backup = this.casesbyStatus;
        this.forceUpdate();
      }else{
        this.casesbyStatus = this.cases;
        this.backup = this.casesbyStatus;
        this.forceUpdate();
      }
    }else{
      console.log("hei");
      this.casesbyStatus = this.cases.filter(function(value){
         return value.category_id == event.target.value;
      });
      this.backup = this.casesbyStatus;
      this.forceUpdate();
    }
  };

  search = event => {
    this.casesbyStatus = this.backup.filter(function(value){
        return value.headline.indexOf(event.target.value)!=(-1);
    });
    this.forceUpdate();
    console.log(event.target.value);
    console.log(this.casesbyStatus);
  }

  delete(case_id) {
		console.log("Er du sikker på at du vil slette følgende sak?");
		if (window.confirm("Er du sikker på at du vil slette følgende sak?")) {


			caseService
				.changeCaseStatus(case_id)
				.then(res => {
					console.log("Response recieved:", res);
					this.status=7;
				})
				.catch(err => {
					console.log("AXIOS ERROR:", err);
				});
		}
    window.location.reload();
	}



  checkName() {}



  render() {
    let lists;
    let sidebuttons;
    if (this.casesbyStatus.length == 0) {
      this.caseside = this.casesbyStatus.slice((this.props.match.params.id-1)*15,(this.props.match.params.id-1)*15+15);
      lists = (
        <tbody>
          <tr>
            <th />
            <td />
            <td>tomt</td>
            <td />
          </tr>
        </tbody>
      );

    } else {
      lists = (
        <tbody>
          {this.casesbyStatus.map(casen => (
            <tr>
              <th>{casen.case_id}</th>
              <td onClick={() => history.push("/case/" + casen.case_id)}>
                {casen.headline} category: {casen.category_id}
              </td>
              <td>{casen.timestamp.slice(0, 16).replace("T", " ")}</td>
              <td>
                {" "}
                <a href={"#/Issues/"+casen.case_id} class="btn btn-sm btn-warning">
                  <span class="glyphicon glyphicon-pencil" aria-hidden="true">
                    &nbsp;Rediger&nbsp;
                  </span>
                </a>
                <span class="btn btn-sm btn-danger">
                  <span class="glyphicon glyphicon-remove" aria-hidden="true"
                   onClick={() => {
  									this.delete(casen.case_id);
  								 }}>
                    &nbsp;Slett&nbsp;&nbsp;
                  </span>
                </span>&nbsp;&nbsp;&nbsp;
                <span class="badge badge-primary">{this.statusname[casen.status_id-1]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      );

      sidebuttons =(
        <div>
        {(count(sliceArray(this.casesbyStatus, 15))).map(sidetall => (
            <button type="button" class="btn btn-outline-dark" onClick={() => history.push('/admin/issues/All/'+sidetall)}>{sidetall} </button>
        ))}
        </div>
      );

    }

    if (this.loaded) {
      return (
        <>
          <br />
          <br />
          <div class="container">
            <div class="row">
              <div class="col-12 col-md-8">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVQATgWe5oXqxAnlTcsDNW9Y6kO7YKLHsAuqFV-Fxyiz8gT_e62g"
                  width="10"
                />
              </div>
              <div class="col-6 col-md-4">
                <div class="form-group">
                  <label for="inputKommune">Kategorier &nbsp;</label>
                  <select
                    class="w-auto"
                    id="kommune"
                    name="kommune"
                    class="form-control"
                    onChange={this.handleChangeCategories}
                  >
                    <option value={0}>
                      Alle
                    </option>
                    {this.categories.map(category => (
                      <option value={category.category_id}>
                        {category.description} {category.category_id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-6 col-md-4">
                <h2 class="display-4">Saker</h2>
              </div>
              <div class="col-6 col-md-4" />
              <div class="col-6 col-md-4">
                <div class="form-group">
                  <label for="inputStatus">Status &nbsp;</label>
                  <select
                    class="w-auto"
                    id="status"
                    name="status"
                    class="form-control"
                    onChange={this.handleChangeStatus}
                  >
                    <option value={0}>Alle</option>
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
              <div class="col-6 col-md-4"></div>
              <div class="col-6 col-md-4" />
              <div class="col-4 col-md-4">
              <span class="glyphicon glyphicon-search" aria-hidden="true" />
                <input type="text" id="search" name="search" placeholder="Search.." onChange={this.search}/>

              </div>
            </div>
          </div>

          <div class="container">
            <Router history={history}>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tittel</th>
                    <th scope="col">Tid</th>
                    <th scope="col">Handling</th>
                  </tr>
                </thead>
                {lists}
                <br />
                <br />
              </table>
            </Router>
          <br/><br/>
        </div>
        <div id='toolbar'>
          <div className='wrapper text-center'>
            <div class="btn-group">
              {sidebuttons}
          </div>
          </div>
        </div>
        </>
      );
    } else {
      return <Loading />;
    }
  }

  componentDidMount() {
    this.employeeid = sessionStorage.getItem("userid");

    employeeService
      .getOne(this.employeeid)
      .then(employee => {
        this.employee = employee[0];
        employeeService
          .getCasesOnOnCommuneID(this.employee.commune)
          .then(cases => {
            this.cases = cases.filter(function(value) {
              return value.status_id != 7;
            });
            this.backup = cases.filter(function(value) {
              return value.status_id != 7;
            });
            this.casesbyStatus = cases.filter(function(value) {
              return value.status_id != 7;
            });
            this.loaded = true;
            console.log(this.employee.commune);
            this.forceUpdate();
          })
          .catch((error: Error) =>
            console.log("Fails by getting the available cases")
          );
        this.forceUpdate();
      })
      .catch((error: Error) =>
        console.log("Fails by getting the available employee" ,error)
      );

    categoryService
      .getAllCategories()
      .then(categories => {
        this.categories = categories;
        this.forceUpdate();
      })
      .catch((error: Error) =>
        console.log("Fails by getting the available categories")
      );
  }
}
