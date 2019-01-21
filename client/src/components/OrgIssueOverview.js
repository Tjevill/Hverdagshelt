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

export default class OrgIssueOverview extends Component<{
  match: { params: { id: number } }
}> {

  loaded = false;
  org_id = "";
  employee = new Object();
  kommune = "";
  categories = [];
  cases = []; //cases from a specific employee.
  status = [];
  backup = [];
  statusid = 0;
  categoryid = 0;
  casesbyStatus = [];
  statusname = ["Registrert","Under Vurdering","Satt på vent", "Arbeid pågår", "Avvist", "Løst"];
  caseside ="";
  fylker =[];
  kommuner = [];
  casesbyKommune = [];


  handleChangeKommune = event =>{
    let statusid = this.statusid;
    let categoryid = this.categoryid;
      caseService
        .searchCaseByProv(event.target.value)
        .then(response => {
            this.casesbyKommune = response.filter(function(value) {
              return value.status_id != 7;
            });
            if(statusid>0){
              console.log("med status");
              this.casesbyStatus = this.casesbyKommune.filter(function(value) {
                return value.status_id == statusid;
              });
              if(categoryid>0){
                console.log("med category og status");
                this.casesbyStatus = this.casesbyStatus.filter(function(value){
                   return value.category_id == categoryid;
                });
              }
            }else if(categoryid>0){
              console.log("ingen status");
                this.casesbyStatus = this.casesbyKommune.filter(function(value){
                   return value.category_id == categoryid;
                });
            }else{
              console.log("ingen category og status");
              this.casesbyStatus = this.casesbyKommune;
            };
            this.backup = this.casesbyStatus;
            console.log("All the cases from chooesd kommune",this.casesbyKommune);
            console.log("All the cases",this.casesbyStatus);
            this.forceUpdate();
        })
        .catch((error: Error) => console.log("fails by getting fylker"));
  }


  handleChangeFylke = event =>{
    let statusid = this.statusid;
    let categoryid = this.categoryid;

    if(event.target.value==0){
      if(statusid>0){
        this.casesbyStatus = this.cases.filter(function(value) {
          return value.status_id == statusid;
        });
        if(categoryid>0){
          this.casesbyStatus = this.casesbyStatus.filter(function(value){
             return value.category_id == categoryid;
          });
        }
      }else if(categoryid>0){
          this.casesbyStatus = this.cases.filter(function(value){
             return value.category_id == categoryid;
          });
      }else{
        this.casesbyStatus = this.cases;
      }
      this.backup = this.casesbyStatus;
      this.kommuner = [];
      this.forceUpdate();
    }else{
      console.log("Fylke valgt: " + event.target.value);
        userService
          .getProvince(event.target.value)
          .then(response => {
              this.kommuner = response;
              console.log("kommuner: ", this.kommuner);
              this.forceUpdate();
          })
          .catch((error: Error) => Alert.danger(error.message));
    }
  }


  handleChangeStatus = event => {
    document.getElementById('search').value = "";
    let categoryid = this.categoryid;
    this.statusid = event.target.value;
    if (event.target.value == 0) {
      if(this.kommuner.length>0){
        this.casesbyStatus = this.casesbyKommune;
        if(this.categoryid>0){
          this.casesbyStatus = this.casesbyStatus.filter(function(value){
             return value.category_id == categoryid;
          });
        }
      }else if(categoryid>0){
        this.casesbyStatus = this.cases.filter(function(value){
           return value.category_id == categoryid;
        });
      }else{
        console.log("Show all the cases");
        this.casesbyStatus = this.cases;
      }
        this.backup = this.casesbyStatus;
        this.forceUpdate();
    }else{
      if(this.kommuner.length>0){
        this.casesbyStatus = this.casesbyKommune.filter(function(value) {
          return value.status_id == event.target.value;
        });
        if(this.categoryid>0){
          this.casesbyStatus = this.casesbyStatus.filter(function(value){
             return value.category_id == categoryid;
          });
        }
      }else if(categoryid>0){
        this.casesbyStatus = this.cases.filter(function(value){
           return value.category_id == categoryid;
        });
        this.casesbyStatus = this.casesbyStatus.filter(function(value) {
          return value.status_id == event.target.value;
        });
      }else{
        this.casesbyStatus = this.cases.filter(function(value) {
          return value.status_id == event.target.value;
        });
      }
        this.backup = this.casesbyStatus;
        this.forceUpdate();
  }};


  handleChangeCategories = event => {
    document.getElementById('search').value = "";
    this.categoryid = event.target.value;
    let statusid = this.statusid;
    if (event.target.value == 0) {
      if(this.kommuner.length>0){
        this.casesbyStatus = this.casesbyKommune;
        if(statusid>0){
          this.casesbyStatus = this.casesbyStatus.filter(function(value){
             return value.status_id == statusid;
          });
        }
      }else if(statusid>0){
        this.casesbyStatus = this.cases.filter(function(value){
          return value.status_id == statusid;
        });
      }else{
        console.log("Show all the cases");
        this.casesbyStatus = this.cases;
      }
        this.backup = this.casesbyStatus;
        this.forceUpdate();
    }else{
      if(this.kommuner.length>0){
        this.casesbyStatus = this.casesbyKommune.filter(function(value) {
          return value.category_id == event.target.value;
        });
        if(statusid>0){
          this.casesbyStatus = this.casesbyStatus.filter(function(value){
             return value.status_id == statusid;
          });
        }
      }else if(statusid>0){
        this.casesbyStatus = this.cases.filter(function(value){
           return value.status_id == statusid;
        });
        this.casesbyStatus = this.casesbyStatus.filter(function(value) {
          return value.category_id == event.target.value;
        });
      }else{
        this.casesbyStatus = this.cases.filter(function(value) {
          return value.category_id == event.target.value;
        });
      }
        this.backup = this.casesbyStatus;
        this.forceUpdate();
  }};

  search = event => {
    this.casesbyStatus = this.backup.filter(function(value){
        return value.headline.indexOf(event.target.value)!=(-1);
    });
    this.forceUpdate();
    console.log(event.target.value);
    console.log(this.casesbyStatus);
  }

  render() {
    let lists;
    let sidebuttons;
      console.log("Table now:",this.casesbyStatus);
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
                    &nbsp; Rediger &nbsp;
                  </span>
                </a>
                &nbsp;&nbsp;&nbsp;
                <span class="badge badge-primary">{this.statusname[casen.status_id-1]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      );

      sidebuttons =(
        <div>
        {(count(sliceArray(this.casesbyStatus, 15))).map(sidetall => (
            <button type="button" class="btn btn-outline-dark" onClick={() => history.push('/bedrift/issues/'+sidetall)}> {sidetall} </button>
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
              <div class="col-6 col-md-4">
                <div class="form-group">
                  <label for="inputFylke">Velg Fylke</label>
                  <select id="fylke" name="fylke" class="form-control" onChange={this.handleChangeFylke}>
                    <option selected value={0}>Alle </option>
                      {this.fylker.map(fylke => {
                          return(<option value={fylke.ID}>{fylke.navn}</option>)
                      })}
                  </select>
                </div>
              </div>
              <div class="col-6 col-md-4">
                <div class="form-group">
                  <label for="inputKommune">Velg Kommune</label>
                    <select id="kommune" name="kommune" class="form-control" onChange={this.handleChangeKommune}>
                      <option selected >Velg fylke først </option>
                      {this.kommuner.map(kommune => {
                          return(<option value={kommune.Name}>{kommune.navn}</option>)
                      })}
                    </select>
                  </div>
              </div>
              <div class="col-4 col-md-4">
              <span class="glyphicon glyphicon-search" aria-hidden="true" />
                <input type="text" id="search" name="search" placeholder="Søk.." onChange={this.search}/>
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
    this.org_id = sessionStorage.getItem("userid");
    console.log(sessionStorage.getItem("userid"));
    caseService
      .getCasesForOrganization(this.org_id)
      .then(cases => {
        this.cases = cases.filter(function(value) {
          return value.status_id != 7;
        });
        this.casesbyStatus = cases.filter(function(value) {
          return value.status_id != 7;
        });
        this.loaded = true;
        this.forceUpdate();
      })
      .catch((error: Error) =>
        console.log("Fails by getting the available cases")
      );

    categoryService
      .getCategoriesForOrganization(this.org_id)
      .then(categories => {
        this.categories = categories;
        console.log(categories);
        this.forceUpdate();
      })
      .catch((error: Error) =>
        console.log("Fails by getting the available categories")
      );

      userService
        .getDistricts()
        .then(fylker => {
            this.fylker = fylker;
            this.forceUpdate();
        })
        .catch((error: Error) => Alert.danger(error.message));


  }
}
