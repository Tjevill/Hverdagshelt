
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import { caseService, categoryService, userService } from "../services";
import createHashHistory from "history/createHashHistory";
import {
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

export default class IssueOverview extends Component<{
  match: { params: { id: number } }
}> {
  loaded = false;
  caseofCat = [];
  categories = [];
  cases = [];
  backup = [];
  casesbyKommune = [];
  casesbyStatus = [];
  cateside = [];
  fylker = [];
  kommuner = [];
  kommune = "Alle";
  Meldning = "";
  categoryid = "";
  categoryname = "Alle";
  statusid = 0;
  statusname = ["Alle","Registrert","Under Vurdering","Satt på vent", "Arbeid pågår", "Avvist", "Løst"];


    handleChangeKommune = event =>{
      let statusid = this.statusid;
      let categoryid = this.categoryid;
      this.kommune = event.target.value;
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
          .catch((error: Error) => console.log("fails by getting cases from fylker"));
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
            .catch((error: Error) => console.log("Fails by getting available kommuner"));
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


  category(categoryid,categoryname){
    this.categoryid = categoryid;
    this.categoryname = categoryname;
    console.log("categoryid:" + categoryid)
    let statusid = this.statusid;
    if (categoryid == 0) {
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
          return value.category_id == categoryid;
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
          return value.category_id == categoryid;
        });
      }else{
        this.casesbyStatus = this.cases.filter(function(value) {
          return value.category_id == categoryid;
        });
      }
        this.backup = this.casesbyStatus;
        this.forceUpdate();
  }};



  render() {
    let lists;
    let sidebuttons;

    if (this.casesbyStatus.length == 0) {
      lists = (
        <tbody>
          <tr>
            <th />
            <td>tomt</td>
            <td />
          </tr>
        </tbody>
      );
    } else {
      this.cateside = this.casesbyStatus.slice((this.props.match.params.id - 1) * 15,(this.props.match.params.id - 1) * 15 + 15);
      lists = (
        <tbody>
          {this.cateside.map(casen => (
            <tr>
              <th>{casen.case_id}</th>
              <td className="clickable-link" onClick={() => history.push("/case/" + casen.case_id)}>
                {casen.headline}
              </td>
              <td>{casen.timestamp.slice(0, 16).replace("T", " ")}</td>
            </tr>
          ))}
        </tbody>
      );

      sidebuttons = (
        <div>
          {count(sliceArray(this.casesbyStatus, 15)).map(sidetall => (
            <button
              type="button"
              class="btn btn-outline-dark"
              id="Saker-side-button"
              onClick={() =>
                history.push(
                  "/issues/" + sidetall)
              }
            >
              {sidetall}
            </button>
          ))}
        </div>
      );
    }

    if (this.loaded) {
      return (
        <>
          <div className="jumbotron">
            <div className="container text-center">
              <div className="btn-group" role="group" aria-label="First group">
                <button type="button" class="btn btn-secondary col-sm-3"  onClick={()=>this.category(0,"All")}>
                  All
                </button>
                {this.categories.map(category => (
                  <button type="button" class="btn btn-secondary col-sm-3" onClick={()=>this.category(category.category_id,category.description)}>
                    {category.description}
                  </button>
                ))}
              </div>
              <br />
              <br />
              <div class="form-row">
                <div class="form-group col-4">
                  <label for="inputFylke">Velg Fylke</label>
                  <select
                    id="fylke"
                    name="fylke"
                    class="form-control"
                    onChange={this.handleChangeFylke}
                  >
                    <option selected value={0}>
                      Alle{" "}
                    </option>
                    {this.fylker.map(fylke => {
                      return <option value={fylke.ID}>{fylke.navn}</option>;
                    })}
                  </select>
                </div>
                <div class="form-group col-4">
                  <label for="inputKommune">Velg Kommune</label>
                  <select
                    id="kommune"
                    name="kommune"
                    class="form-control"
                    onChange={this.handleChangeKommune}
                  >
                    <option selected> Velg fylke først </option>
                    {this.kommuner.map(kommune => {
                      return (
                        <option value={kommune.Name}>{kommune.navn}</option>
                      );
                    })}
                  </select>
                </div>
                <div class="form-group col-4">
                  <label for="inputKommune">Velg Status</label>
                  <select
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
              {this.Meldning}
            </div>
          </div>

          <div className="container">
            <div class="row">
              <div class="col">
                <h2 class="display-4" id="Saker-tittel">Saker</h2>
              </div>
              <div class="col" />
              <div class="col" />
              <div class="col">
                <span class="glyphicon glyphicon-search" aria-hidden="true" />
                <input
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Søk tittel.."
                  onChange={this.search}
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <p>Kategori:{this.categoryname} &nbsp; Status:{this.statusname[this.statusid]} &nbsp; Kommune: {this.kommune}&nbsp;</p>
              </div>
            </div>
            <Router history={history}>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Tittel</th>
                    <th scope="col">Tid</th>
                  </tr>
                </thead>
                {lists}
              </table>
            </Router>
            <br />
            <br />
          </div>

          <div id="toolbar">
            <div className="wrapper text-center">
              <div class="btn-group">{sidebuttons}</div>
            </div>
          </div>
        </>
      );
    } else {
      return <Loading />;
    }
  }

  search = event => {
    this.casesbyStatus = this.backup.filter(function(value){
        return value.headline.toLowerCase().indexOf(event.target.value.toLowerCase())!=(-1);
    });
    this.forceUpdate();
    console.log(event.target.value);
    console.log(this.casesbyStatus);
  }


  componentDidMount() {
    caseService
      .getAllCases()
      .then(cases => {
        this.cases = cases.filter(function(value) {
          return value.status_id != 7;
        });
        this.casesbyStatus = cases.filter(function(value) {
          return value.status_id != 7;
        });
        this.backup = cases.filter(function(value) {
          return value.status_id != 7;
        });
        this.loaded = true;
        this.forceUpdate();
      })
      .catch((error: Error) => console.log("Errors by getting all the available cases"));

    categoryService
      .getAllCategories()
      .then(categories => {
        this.categories = categories;
        this.forceUpdate();
      })
      .catch((error: Error) => console.log("Errors by getting all the available categories"));

    userService
      .getDistricts()
      .then(fylker => {
        this.fylker = fylker;
        this.forceUpdate();
      })
      .catch((error: Error) => console.log("Errors by getting all the available fylker"));
  }
}
