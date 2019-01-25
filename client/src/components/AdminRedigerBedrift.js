//@flow
import React, { Component } from "react";
import TextField from "material-ui/TextField";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import {categoryService, employeeService, orgService, userService } from "../services";

import {
  Alert,
  Card,
  ListGroup,
  Row,
  Column,
  Button,
  Form,
  Loading
} from "./widgets";

const history = createHashHistory();
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === "" && (valid = false);
  });

  return valid;
};

export default class AdminRedigerBedrift extends Component<{
  match: { params: { id: number } }
}> {
  loading = false;

    message = " ";
    passworderror = " ";

    categories = [];
    conns = [];
    category_ids = [];


  organization=[];

  constructor(props) {
    super(props);
    this.state = {
      organizationnumber: "",
      name: "",
      tel: "",
      email: "",
      formErrors: {
        organizationnumber: "",
        name: "",
        tel: "",
        email: "",

      }
    };
  }

  handleSubmit = e => {
    console.log("hei")
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        organizationnumber: ${this.state.organizationnumber}
         name: ${this.state.name}
         tel: ${this.state.tel}
         email: ${this.state.email}
         organizationnumber: ${this.props.match.params.id}


      `);

      this.update();
    } else {
      window.alert("Vennligst fyll ut alle felt");
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleAllChecked = (event) => {
      let i;
      for (i=0; i < this.conns.length; i++) {
          if (this.conns[i].catid == event.target.value) {
              this.conns[i].checked = event.target.checked;
          }
      }


      console.log(event.target.value + " " + event.target.checked);
      console.log("conns: ", this.conns)
  }



  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    console.log("Name:", name);
    console.log("value:", value);

    switch (name) {
      case "organizationnumber":
        formErrors.organizationnumber = value.length < 3 || value.length>=10 ? "minimum 3 bokstaver, navn" : "";
        break;

      case "name":
        formErrors.name = value.length < 3  ? "minimum 3 bokstaver, navn" : "";
        break;

      case "tel":
        formErrors.tel =
          value.length < 3 || value.length > 9
            ? "minst 3 tall, maks 9 tall"
            : "";
        break;

      case "email":
        formErrors.email =
          value.match(emailRegex) && value.length > 0
            ? ""
            : "ugyldig epost: format feks :bruker@gmail.com";

        break;



      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };



  update() {
    if (!this.organization) {
        console.log("Returning null!");
        this.message = "Error";
        return null;
    }

    const orgdata = {
        organizationnumber: this.state.organizationnumber,
        name: this.state.name,
        tel: this.state.tel,
        email: this.state.email,
        org_id: this.props.match.params.id
    };

    let i;
    for (i=0; i < this.conns.length; i++) {
        if (this.conns[i].checked) {
            this.category_ids.push({catid: this.conns[i].catid});
        }
    }

  console.log("this.conns: ", this.conns)
    console.log("this organization: ", orgdata);
    console.log("these connections: ", this.category_ids)


    orgService.updateOrgByID(orgdata)
        .then(response => {
            console.log("1st response: ", response);
            categoryService.deleteCategoryByOrgID(this.props.match.params.id)
                .then(response => {

                    console.log("2nd response: ", response);
                    console.log("this.category_ids: " + this.category_ids);
                    categoryService.addOrgCat(this.category_ids, this.props.match.params.id)
                        .then(response => {
                            console.log("3rd response: ", response);
                        })
                        .catch((error: Error) => (this.message = error.message));
                })
                .catch((error: Error) => (this.message = error.message));
            history.push('/admin/bedrift/oversikt/1')
        })
        .catch((error: Error) => (this.message = error.message));



  }

  addDeleteButton() {
    if (this.superuser == 0) {
      return (
        <div className="deleteCase">
          <button
            onClick={() => {
              this.delete(this.props.match.params.id);
            }}
          >
            {" "}
            Slett bedrift{" "}
          </button>
        </div>
      );
    } else {
      return <div> </div>;
    }
  }

  render() {
    const { formErrors } = this.state;

    if (this.loading) {
      return (
        <div className="caseEdit-wrapper">
           <link rel="stylesheet" href="editHeroUser.css" />

<link rel="stylesheet" media="screen and (max-width: 1400px) and (min-width: 601px)" href="editHeroUser1.css" />
<link rel="stylesheet" media="screen and (max-width: 600px) and (min-width: 351px)" href="editHeroUser2.css" />
<link rel="stylesheet" media="screen and (max-width: 350px)" href="editHeroUser3.css" />
          <div className="form-wrapper">
            <h1> Rediger Bedrift </h1>
             <div className="organizationnumber">
                <label htmlFor="organizationnumber"> Organisasjonsnummer </label>
                <input
                  className={formErrors.organizationnumber.length > 0 ? "error" : null}
                  type="text"
                  value={this.state.organizationnumber}
                  placeholder="Organisasjonsnummer"
                  name={"organizationnumber"}
                  noValidate
                  onChange={this.handleChange}
                />

                {formErrors.organizationnumber.length > 0 && (
                  <span className="errorMessage">{formErrors.organizationnumber}</span>
                )}
              </div>


            <form onSubmit={this.handleSubmit} noValidate>
              <div className="profilePic" />
              <div className="name">
                <label htmlFor="name"> Navn </label>
                <input
                  className={formErrors.name.length > 0 ? "error" : null}
                  type="text"
                  value={this.state.name}
                  placeholder="Navn"
                  name="name"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.name.length > 0 && (
                  <span className="errorMessage">{formErrors.name}</span>
                )}
              </div>


              <div className="tel">
                <label htmlFor="tel"> Tlf </label>
                <input
                  className={formErrors.tel.length > 0 ? "error" : null}
                  type="number"
                  value={this.state.tel}
                  placeholder="Tlf"
                  name="tel"
                  noValidate
                  onChange={this.handleChange}

                />

                {formErrors.tel.length > 0 && (
                  <span className="errorMessage">{formErrors.tel}</span>
                )}
              </div>

              <div className="email">
                <label htmlFor="email"> Epost </label>
                <input
                  className={formErrors.email.length > 0 ? "error" : null}
                  type="text"
                  value={this.state.email}
                  placeholder="Epost"
                  name="email"
                  noValidate
                  onChange={this.handleChange}
                />

                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>

                <div className="form-group">
                            <h6>Du må krysse av alle aktuelle kategorier på nytt: </h6>
                            {this.categories.map((cat, index) => {
                                return (
                                    <div className="form-check form-check-inline" key={cat.category_id}>

                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox" value={cat.category_id} onClick={this.handleAllChecked} />
                                        <label className="form-check-label" htmlFor="inlineCheckbox1">{cat.description}</label>
                                    </div>
                                )
                            })}
                        </div>


              <div className="editCase">
                <button type="submit"> Lagre endringer </button>
              </div>

              {this.addDeleteButton(this.superuser)}
            </form>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }

  delete(id) {
     if (
      window.confirm("Er du sikker på at du ønsker å slette denne bedriten?")
    ) {
      orgService
        .deleteOrgByID(id)
        .then(response => {
          console.log(response, "Slettet organisasjon");
          history.push("/admin/bedrift/oversikt/1");
        })
        .catch(err => {
          console.log(err, "Error ved sletting");
        });
    }
 //FEIL
  }

  addDeleteButton(id) {
    if (id !== 1) {
      return (
        <div className="deleteCase">
          <button
            onClick={() => {
              this.delete(this.props.match.params.id);
            }}
          >
            {" "}
            Slett bedrift{" "}
          </button>
        </div>
      );
    }
  }

  componentDidMount() {
        orgService
        .getOrgByID(this.props.match.params.id)
        .then(orgData => {
            //console.log(orgData[0]);
          this.organization = orgData[0];
          this.setState((state, props) => ({
                organizationnumber: this.organization.organizationnumber,
                name: this.organization.name,
                email: this.organization.email,
                tel: this.organization.tel
            }));

        });

          categoryService.getAllCategories()
            .then(response => {
                // console.log("getCategories respose", response);
                this.categories = response;
                let i;
                 for (i=0; i < response.length; i++) {
                    let catid = response[i].category_id;

                    console.log("response[i].category_id: " + response[i].category_id);
                    categoryService.checkIfChecked(response[i].category_id, this.props.match.params.id)
                    .then((response2, index) => {
                        let value = false;
                        (response2.length === 0 ? value = false : value = true)
                      this.conns.push({"catid": catid, "checked": false});
                      this.forceUpdate();
                        this.loading = true;
                    });

                }
            })
            .catch(
                (error: Error) =>
                    (this.message = error.message)
            );
  }
}
