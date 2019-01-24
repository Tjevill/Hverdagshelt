
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import {
    caseService,
    categoryService,
    userService,
    employeeService,
    statusService, orgService
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
    currentCase = [];
    currentOrg = [];
    stat1 = false;
    stat2 = true;
    stat3 = false;
    stat4 = false;
    stat5 = false;
  orgs = [];
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
  statusname = [
    "Registrert",
    "Under Vurdering",
    "Satt på vent",
    "Arbeid pågår",
    "Avvist",
    "Løst"
  ];
  caseside = "";

    state = {
        org_id: 0,
        comment:''
    };

  handleChangeStatus = event => {
    if(this.props.match.params.id!=1){
        window.location.href='#/admin/issues/1';
    };
    document.getElementById("search").value = "";
    let categoryid = this.categoryid;
    this.statusid = event.target.value;
    if (event.target.value == 0) {
      if (this.categoryid > 0) {
        console.log("category er valgt");
        this.casesbyStatus = this.cases.filter(function(value) {
          return value.category_id == categoryid;
        });
        this.backup = this.casesbyStatus;
        this.forceUpdate();
      } else {
        console.log("Show the cases of all the status");
        this.casesbyStatus = this.cases;
        this.backup = this.casesbyStatus;
        this.forceUpdate();
      }
    } else {
      if (this.categoryid > 0) {
        console.log("2.category er valgt");
        this.casesbyStatus = this.cases.filter(function(value) {
          return value.category_id == categoryid;
        });
        this.casesbyStatus = this.casesbyStatus.filter(function(value) {
          return value.status_id == event.target.value;
        });
        this.backup = this.casesbyStatus;
        this.forceUpdate();
      } else {
        this.casesbyStatus = this.cases.filter(function(value) {
          return value.status_id == event.target.value;
        });
        this.backup = this.casesbyStatus;

        this.forceUpdate();
      }
    }
  };

  handleChangeCategories = event => {
    if(this.props.match.params.id!=1){
        window.location.href='#/admin/issues/1';
    };
    document.getElementById("search").value = "";
    this.categoryid = event.target.value;
    console.log("value:" + event.target.value);
    let statusid = this.statusid;
    if (event.target.value == 0) {
      if (this.statusid > 0) {
        this.casesbyStatus = this.cases.filter(function(value) {
          return value.status_id == statusid;
        });
        this.backup = this.casesbyStatus;
        this.forceUpdate();
      } else {
        this.casesbyStatus = this.cases;
        this.backup = this.casesbyStatus;
        this.forceUpdate();
      }
    } else {
      if (this.statusid > 0) {
        this.casesbyStatus = this.cases.filter(function(value) {
          return value.status_id == statusid;
        });
        this.casesbyStatus = this.casesbyStatus.filter(function(value) {
          return value.category_id == event.target.value;
        });
        this.backup = this.casesbyStatus;
        this.forceUpdate();
      } else {
        this.casesbyStatus = this.cases.filter(function(value) {
          return value.category_id == event.target.value;
        });
        this.backup = this.casesbyStatus;
        this.forceUpdate();
      }
    }
  };

  search = event => {
    this.casesbyStatus = this.backup.filter(function(value) {
      return value.headline.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1;
    });
    this.forceUpdate();
    console.log(event.target.value);
    console.log(this.casesbyStatus);
  };

  delete(case_id) {
    console.log("Er du sikker på at du vil slette følgende sak?");
    if (window.confirm("Er du sikker på at du vil slette følgende sak?")) {
      caseService
        .changeCaseStatus(case_id)
        .then(res => {
          console.log("Response recieved:", res);
          this.status = 7;
        })
        .catch(err => {
          console.log("AXIOS ERROR:", err);
        });
    }
    window.location.reload();
  }

  checkName() {}

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState((state, props) => ({
            [name]: value
        }));
    };

    saveUpdate (id) {
        console.log(this.state.comment)
        let comment = this.state.comment;

        if(IssueOverviewForEmployee.stat1 == true) {
            caseService.updateCaseByEmployee(id, comment, 2, this.employee.employee_id, this.state.org_id)
                .then(res => {
                    console.log(res);
                    window.alert("Kommentar, status og bedrift endret!");
                    window.location.reload();
                })
                .catch((error: Error) => Alert.danger(error.message));

        } else if(IssueOverviewForEmployee.stat2 == true) {
            caseService.updateCaseByEmployee(id, comment, 3, this.employee.employee_id, this.state.org_id)
                .then(res => {
                    console.log(res);
                    window.alert("Kommentar, status og bedrift endret!");
                    window.location.reload();
                })
                .catch((error: Error) => Alert.danger(error.message));

        } else if(IssueOverviewForEmployee.stat3 == true) {
            caseService.updateCaseByEmployee(id, comment, 4, this.employee.employee_id, this.state.org_id)
                .then(res => {
                    console.log(res);
                    window.alert("Kommentar, status og bedrift endret!");
                    window.location.reload();
                })
                .catch((error: Error) => Alert.danger(error.message));

        } else if(IssueOverviewForEmployee.stat4 == true) {
            caseService.updateCaseByEmployee(id, comment, 5, this.employee.employee_id, this.state.org_id)
                .then(res => {
                    console.log(res);
                    window.alert("Kommentar, status og bedrift endret!");
                    window.location.reload();
                })
                .catch((error: Error) => Alert.danger(error.message));

        } else if(IssueOverviewForEmployee.stat5 == true) {
            caseService.updateCaseByEmployee(id, comment, 6, this.employee.employee_id, this.state.org_id)
                .then(res => {
                    console.log(res);
                    window.alert("Kommentar, status og bedrift endret!");
                    window.location.reload();
                })
                .catch((error: Error) => Alert.danger(error.message));

        } else {
            window.alert("Vennligst anngi en status på saken");
            return null;
        }
    }

    handleClick1() {
            IssueOverviewForEmployee.stat1 = true;
            IssueOverviewForEmployee.stat2 = false;
            IssueOverviewForEmployee.stat3 = false;
            IssueOverviewForEmployee.stat4 = false;
            IssueOverviewForEmployee.stat5 = false;
        }
        handleClick2() {
            IssueOverviewForEmployee.stat1 = false;
            IssueOverviewForEmployee.stat2 = true;
            IssueOverviewForEmployee.stat3 = false;
            IssueOverviewForEmployee.stat4 = false;
            IssueOverviewForEmployee.stat5 = false;
        }
        handleClick3() {
            IssueOverviewForEmployee.stat1 = false;
            IssueOverviewForEmployee.stat2 = false;
            IssueOverviewForEmployee.stat3 = true;
            IssueOverviewForEmployee.stat4 = false;
            IssueOverviewForEmployee.stat5 = false;
        }
        handleClick4() {
            IssueOverviewForEmployee.stat1 = false;
            IssueOverviewForEmployee.stat2 = false;
            IssueOverviewForEmployee.stat3 = false;
            IssueOverviewForEmployee.stat4 = true;
            IssueOverviewForEmployee.stat5 = false;
        }
        handleClick5() {
            IssueOverviewForEmployee.stat1 = false;
            IssueOverviewForEmployee.stat2 = false;
            IssueOverviewForEmployee.stat3 = false;
            IssueOverviewForEmployee.stat4 = false;
            IssueOverviewForEmployee.stat5 = true;
        }


    handleSelected(id) {
        let filteredCase = this.cases.filter(e =>
            e.case_id == id)
        console.log(filteredCase)
            this.currentCase = filteredCase[0];
        console.log(this.currentCase.org_id)
        if(this.currentCase.org_id == null) {
            this.currentOrg = null;
        } else {
            this.currentOrg = this.orgs.filter(e =>
                e.org_id == this.currentCase.org_id);
        }
    }

    getCurrentOrg() {
        return this.currentOrg[0].name;
    }

    getOrgOnCase (id) {
        if(id == null) {
            return 'Ingen tildelt bedrift'
        } else {
            if(this.orgs.filter(e => e.org_id == id)[0] != null) {
                let test = this.orgs.filter(e => e.org_id == id);
                return test[0].name;
            } else {
                return 'Ingen bedrift tildelt';
            }
        }
    }

  render() {
    let lists;
    let sidebuttons;
    if (this.casesbyStatus.length == 0) {
      lists = (
        <tbody>
          <tr>
            <th />
            <td />
            <td>tomt</td>
              <td/>
            <td />
          </tr>
        </tbody>
      );
    } else {
      this.caseside = this.casesbyStatus.slice(
        (this.props.match.params.id - 1) * 15,
        (this.props.match.params.id - 1) * 15 + 15
      );
      lists = (
        <tbody>
          {this.caseside.map(casen => (
            <tr key={casen.case_id}>
              <td className={"clickable-link"} onClick={() => history.push("/case/" + casen.case_id)}>
                {casen.headline}
              </td>
              <td>{casen.timestamp.slice(0, 16).replace("T", " ")}</td>
                <td>{this.getOrgOnCase(casen.org_id)}</td>
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
                                <label className="container inline">
                                    <input type="radio" id="status01" name="radio" onClick={this.handleClick1}></input>
                                    Under vurdering
                                </label>
                                <label className="container inline">
                                    <input type="radio" id="status02" name="radio" onClick={this.handleClick2}></input>
                                    Satt på vent
                                </label>
                                <label className="container inline">
                                    <input type="radio" id="status03" name="radio" onClick={this.handleClick3}></input>
                                    Arbeid pågår
                                </label>
                                <label className="container inline">
                                    <input type="radio" id="status04" name="radio" onClick={this.handleClick4}></input>
                                    Avvist
                                </label>
                                <label className="container inline">
                                    <input type="radio" id="status05" name="radio" onClick={this.handleClick5}></input>
                                    Sak løst
                                </label>
                                <h6 className="modal-title" id="exampleModalLabel">&nbsp;Tildel saken en bedrift</h6>
                                <div className="form-group form-group-style">
                                    <select className={'browser-default custom-select'}
                                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.state.org_id = event.target.value)}
                                            defaultValue=''>
                                        <option disabled value=''> -- velg bedrift til å løse problemet -- </option>
                                        {this.orgs.map(org => (
                                            <option key={org.org_id} value={org.org_id}>
                                                {org.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-info" data-dismiss="modal">Lukk</button>
                                    <button type="button" className="btn btn-primary"
                                            onClick={() => this.saveUpdate(casen.case_id)}>
                                        Lagre endringer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                <button class="btn btn-danger m-2" onClick={() => {
                    this.delete(casen.case_id);
                }}>
                  <span
                    aria-hidden="true"

                  >
                    &#x2716;  Slett
                  </span>
                </button>
                &nbsp;&nbsp;&nbsp;
                <span class="badge badge-primary m-2">

                <span className="badge badge-primary">
                    <div>
                  {this.statusname[casen.status_id - 1]}
                    </div>
                </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      );

      sidebuttons = (
        <div>
          {count(sliceArray(this.casesbyStatus, 15)).map(sidetall => (
            <button
                key={sidetall}
              type="button"
              className="btn btn-outline-dark"
              id="Saker-side-button"
              onClick={() => history.push("/admin/issues/" + sidetall)}
            >
              {sidetall}{" "}
            </button>
          ))}
        </div>
      );
    }

    if (this.loaded) {
      return (
        <>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-8">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVQATgWe5oXqxAnlTcsDNW9Y6kO7YKLHsAuqFV-Fxyiz8gT_e62g"
                  id="Saker-icon-pic"
                />
              </div>
              <div className="col-6 col-md-4" />
            </div>

            <div className="row">
              <div className="col">
                <h2 className="display-4" id="Saker-tittel">Saker</h2>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="inputKommune">Kategorier &nbsp;</label>
                  <select
                    className="w-auto"
                    id="kommune"
                    name="kommune"
                    className="form-control"
                    onChange={this.handleChangeCategories}
                  >
                    <option value={0}>Alle</option>
                    {this.categories.map(category => (
                      <option key={category.category_id} value={category.category_id}>
                        {category.description} {category.category_id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col">
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
            </div>

            <div className="row">
              <div className="col-6 col-md-4" />
              <div className="col-6 col-md-4" />
              <div className="col-4 col-md-4">
              </div>
            </div>
          </div>

          <div className="container">
          <span className="glyphicon glyphicon-search" aria-hidden="true" />
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search.."
            onChange={this.search}
          />
            <Router history={history}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Tittel</th>
                    <th scope="col">Tid</th>
                      <th scope="col">Saken er tildelt</th>
                    <th scope="col">Handling</th>
                  </tr>
                </thead>
                {lists}

              </table>
            </Router>

          </div>
          <div id="toolbar">
            <div className="wrapper text-center">
              <div className="btn-group">{sidebuttons}</div>
            </div>
          </div>
          <br/><br/>
        </>
      );
    } else {
      return <Loading />;
    }
  }

  componentDidMount() {
      orgService.getAllOrg()
          .then(orgs => {
            this.orgs = orgs
          })
          .catch((error: Error) =>
              console.log("Fails by getting the available organizations", error))
    employeeService
      .getEmployeeByToken()
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
            this.forceUpdate();
          })
          .catch((error: Error) =>
            console.log("Fails by getting the available cases")
          );
        this.forceUpdate();
      })
      .catch((error: Error) =>
        console.log("Fails by getting the available employee", error)
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
