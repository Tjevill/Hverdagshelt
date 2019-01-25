
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import {
  caseService,
  categoryService,
  userService,
  employeeService,
  statusService,
  orgService
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
    stat1 = false;
    stat2 = false;
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
  currentCase = {};

    state = {
        comment:''
    };


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
              this.casesbyStatus = this.casesbyKommune.filter(function(value) {
                return value.status_id == statusid;
              });
              if(categoryid>0){
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
        userService
          .getProvince(event.target.value)
          .then(response => {
              this.kommuner = response;
              this.forceUpdate();
          })
          .catch((error: Error) => console.log("Errors by getting kommuner"));
    }
  }


  handleChangeStatus = event => {
    document.getElementById('searchbarintable').value = "";
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
    document.getElementById('searchbarintable').value = "";
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
        return value.headline.toLowerCase().indexOf(event.target.value.toLowerCase())!=(-1);
    });
    this.forceUpdate();
    console.log(event.target.value);
    console.log(this.casesbyStatus);
  }
  saveComment (id) {
      console.log(this.state.comment)
      let comment = this.state.comment;
    if(OrgIssueOverview.stat1 == true) {
      caseService.updateStatusAndCommentForOrg(id, 4, comment)
          .then(res => {
              console.log(res);
              window.alert("Kommentar og status endret!");
              window.location.reload();
          })
          .catch((error: Error) => Alert.danger(error.message));

    } else if(OrgIssueOverview.stat2 == true) {
        caseService.updateStatusAndCommentForOrg(id, 6, comment)
            .then(res => {
                console.log(res);
                window.alert("Kommentar og status endret!");
                window.location.reload();
            })
            .catch((error: Error) => Alert.danger(error.message));

    } else {
        caseService.updateCaseComment(id, comment)
            .then(res => {
                console.log(res);
                console.log(document.getElementById('comment-input').value);
                window.alert("Kommentar lagret!");
                window.location.reload();
            })
            .catch((error: Error) => Alert.danger(error.message));
      }
    }


    handleSelected(id) {
        let filteredCase = this.cases.filter(e =>
            e.case_id == id)
        console.log(filteredCase)
            this.currentCase = filteredCase[0];
    }

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState((state, props) => ({
            [name]: value
        }));
    };

    handleClick1() {
        OrgIssueOverview.stat1 = true;
        OrgIssueOverview.stat2 = false;
    }
    handleClick2() {
        OrgIssueOverview.stat1 = false;
        OrgIssueOverview.stat2 = true;
    }

  render() {
    let lists;
    let sidebuttons;
    if (this.casesbyStatus.length == 0) {
      this.caseside = this.casesbyStatus.slice((this.props.match.params.id-1)*15,(this.props.match.params.id-1)*15+15);
      lists = (
        <tbody>
          <tr>
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
            <tr key={casen.case_id}>
              <td className="clickable-link" onClick={() => history.push("/case/" + casen.case_id)}>
                {casen.headline}
              </td>
              <td>{casen.timestamp.slice(0, 16).replace("T", " ")}</td>
              <td>
                {" "}
                  <button data-toggle="modal" data-target={"#" + casen.case_id} className="btn btn-primary m-2">
                  <span aria-hidden="true" onClick={() => {this.handleSelected(casen.case_id)}}>
                    	&#x270E;  Oppdater
                  </span>
                  </button>
                      <div className="modal fade" id={casen.case_id} tabIndex="-1"
                           aria-labelledby="exampleModalLabel" aria-hidden="true"
                           data-backdrop="static">
                          <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                  <div className="modal-header">
                                      <h4 className="modal-title" id="exampleModalLabel">&nbsp;Oppdater sak</h4>
                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                      </button>
                                  </div>
                                  <h6 className="modal-title" id="exampleModalLabel">&nbsp;Legg til en kommentar</h6>
                                  <div className="modal-body">
                                      <input
                                          className="form-control"
                                          id="comment-input"
                                          defaultValue={casen.comment}
                                          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.state.comment = event.target.value)}>
                                      </input>
                                  </div>
                                  <h6 className="modal-title" id="exampleModalLabel">&nbsp;Endre status</h6>
                                  <label className="container inline status-container">
                                      <input className="status-radio" type="radio" id="status1" name="radio" onClick={this.handleClick1}/>
                                          Arbeid pågår
                                  </label>
                                  <label className="container inline status-container">
                                      <input className="status-radio" type="radio" id="status2" name="radio" onClick={this.handleClick2}/>
                                          Sak løst
                                  </label>
                                  <div className="modal-footer">
                                      <button type="button" className="btn btn-info" data-dismiss="modal">Lukk</button>
                                      <button type="button" className="btn btn-primary"
                                              onClick={() => this.saveComment(casen.case_id)}>
                                          Lagre endringer
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>

                &nbsp;&nbsp;&nbsp;
                <span className="badge badge-primary">{this.statusname[casen.status_id-1]}</span>
              </td>
            </tr>
          ))}
        </tbody>

      );

      sidebuttons =(
        <div>
        {(count(sliceArray(this.casesbyStatus, 15))).map(sidetall => (
            <button key={sidetall} type="button" id ="Saker-side-button" className="btn btn-outline-dark" onClick={() => history.push('/bedrift/issues/'+sidetall)}> {sidetall} </button>
        ))}
        </div>
      );

    }

    if (this.loaded) {
      return (
        <>

            <div className="row">
                <div className="col-md-2">&nbsp;</div>
                <div className="col-md-8">


                <div>
            <div className="row">
              <div className="col-12 col-md-8">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVQATgWe5oXqxAnlTcsDNW9Y6kO7YKLHsAuqFV-Fxyiz8gT_e62g"
                  id ="Saker-icon-pic"
                />
              </div>
              <div className="col-6 col-md-4">
              </div>
            </div>

            <div className="row">
              <div className="col-6 col-md-4">
                <h2 className="display-4" id="Saker-tittel">Saker</h2>
              </div>
              <div className="col-6 col-md-4" />
              <div className="col-6 col-md-4" />
            </div>

            <div className="row">
              <div className="col-6 col-md-4">
                <div className="form-group">
                  <label htmlFor="inputFylke">Velg Fylke</label>
                  <select id="fylke" name="fylke" className="form-control" onChange={this.handleChangeFylke}>
                    <option value={0}>Alle </option>
                      {this.fylker.map((fylke, i) => {
                          return(<option value={fylke.ID} key={i}>{fylke.navn}</option>)
                      })}
                  </select>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="form-group">
                  <label htmlFor="inputKommune">Velg Kommune</label>
                    <select id="kommune" name="kommune" className="form-control" onChange={this.handleChangeKommune}>
                      <option >Velg fylke først </option>
                      {this.kommuner.map(kommune => {
                          return(<option key={kommune.ID} value={kommune.Name}>{kommune.navn}</option>)
                      })}
                    </select>
                  </div>
              </div>
              <div className="col-4 col-md-4">
             </div>
            </div>

          <div className="row">
            <div className="col-6 col-md-4">
              <div className="form-group">
                <label htmlFor="inputKommune">Kategorier &nbsp;</label>
                <select
                className="w-auto"
                id="kommune"
                name="kommune"
                className="form-control"
                onChange={this.handleChangeCategories}
                >
                  <option value={0}>
                    Alle
                  </option>
                  {this.categories.map(category => (
                    <option key={category.category_id} value={category.category_id}>
                      {category.description} {category.category_id}
                    </option>
                  ))}
              </select>
            </div>
          </div>
            <div className="col-6 col-md-4">
                <div className="form-group">
                  <label htmlFor="inputStatus">Status &nbsp;</label>
                  <select
                    className="w-auto"
                    id="status"
                    name="status"
                    className="form-control"
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
            <div className="col-4 col-md-4">
            </div>
          </div>
          </div>

          <div>
          <div className="row">
            <div className="col-3">

            </div>
            <div className="col-3" />
            <div className="col-3" />
          </div>
            <Router history={history}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Tittel</th>
                    <th scope="col">Tid</th>
                    <th scope="col"> <input type="text" id="searchbarintable" name="search;" placeholder="Søk.." onChange={this.search}/></th>
                  </tr>
                </thead>
                {lists}
              </table>
            </Router><br/><br/>
        </div>

        <div id='toolbar'>
          <div className='wrapper text-center'>
            <div className="btn-group">
              {sidebuttons}
            </div>
          </div>
        </div>
            <br/><br/>
                </div>
                <div className="col-md-2">&nbsp;</div>
            </div>
        </>
      );
     }else{
      return <Loading />;
    }
  }

  componentDidMount() {


    orgService.getOrganizationByToken()
        .then(employee => {
            this.employee = employee[0];
            this.org_id = this.employee.org_id;

    caseService
      .getCasesForOrganization(this.org_id)
      .then(cases => {
        this.cases = cases.filter(function(value) {
          return value.status_id != 7 || value.status_id != 5;
        });
        this.casesbyStatus = cases.filter(function(value) {
          return value.status_id != 7 || value.status_id != 5;
        });
        this.backup = cases.filter(function(value) {
          return value.status_id != 7 || value.status_id != 5;
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
        .catch((error: Error) => console.log("Error: getting fylker"));

        }).catch((error: Error) =>
        console.log("Fails by getting the available cases")
    );

  }
}
