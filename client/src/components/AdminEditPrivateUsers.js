import React from "react";
import TextField from 'material-ui/TextField';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Component } from "react-simplified";
import { userService } from "../services.js";
import { BrowserRouter, Route } from "react-router-dom";
import createHashHistory from "history/createHashHistory";

const history = createHashHistory();
var emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    return valid;
};


export default class AdminEditPrivateUSers extends Component < {
    match: { params: { id: number } }
} > {
    user_id="";
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            name: "",
            address: "",
            tel: "",
            email: "",
            subscription: "",
            zipcode: "",


            formErrors: {
                name: "",
                address: "",
                tel: "",
                email: "",
                subscription: "",
                zipcode: ""
            }
        };
    }

    handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
         name: ${this.state.name}
         address: ${this.state.address} 
         tel: ${this.state.tel} 
         email: ${this.state.email} 
         subscription: ${this.state.subscription} 
         zipcode: ${this.state.zipcode} 
         user_id:  ${this.user_id} 
         
      `);

      this.update();
      window.location.reload();
      history.push("/admin/heroes");

    } else {
      window.alert("Ingen endringer ble utført");
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

    handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    console.log("Name:", name);
    console.log("value:", value);

    switch (name) {
      case "name":
        formErrors.name =
          value.length < 3 ? "minimum 3 bokstaver, navn" : "";
        break;

      case "address":
        formErrors.address =
         value.length < 3 ? "minimum 3 bokstaver, addresse" : "";
        break;

         case "tel":
        formErrors.tel =
           value.length < 3 || value.length>9 ? "minst 3 tall, maks 9 tall" : "";
        break;

          case "email":
        formErrors.email =
           value.match(emailRegex) && value.length > 0 ? "" : "ugyldig epost: format feks :bruker@gmail.com";
        break;
        
            case "subscription":
        formErrors.subscription =
          value.length <1 || value>1 || value <0 ? "(Abonnementstatus) 0: Abonnerer ikke , 1: Abonnerer" : "";
        break;

            case "zipcode":
        formErrors.zipcode =
          value.length !=4 ? "minimum 4 tall, postnummer" : "";
        break;
        
        


      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () =>
      console.log(this.state)
    );
  };


  update(){
    console.log("Oppdaterer");
    userService
    .updateOne({
      name: this.state.name,
      address: this.state.address,
      zipcode: this.state.zipcode,
      tel: this.state.tel,
      email: this.state.email,
      subscription: this.state.subscription,
      user_id: this.user_id
    })
    .then(res => {
        console.log("Response recieved:", res); //ENDRINGER ER BLITT LAGRET
      })
      .catch(err => {
        console.log("AXIOS ERROR:", err);
      });



  }



    render() {
        const { formErrors } = this.state;
        return (
        <div className="caseEdit-wrapper">
         <link rel="stylesheet" href="editUsers.css" />
        <div className="form-wrapper">
          <h1> Rediger Bruker </h1>

          <form onSubmit={this.handleSubmit} noValidate>

          <div className="profilePic">
         
          </div>
            <div className="name">
           
              <label htmlFor="name"> Navn </label>
              <input
                className={
                  formErrors.name.length > 0
                    ? "error"
                    : null
                }
                type="text"
                value={this.state.name}
                placeholder="Navn"
                name="name"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.name.length > 0 && (
                <span className="errorMessage">
                  {formErrors.name}
                </span>
              )}
            </div>

            

            <div className="address">
              <label htmlFor="address"> Adresse </label>
              <input
                className={
                  formErrors.address.length > 0
                    ? "error"
                    : null
                }
                type="text"
                value={this.state.address}
                placeholder="Adresse"
                name="address"
                noValidate
                onChange={this.handleChange}
              >
              
              </input>

              {formErrors.address.length > 0 && (
                <span className="errorMessage">
                  {formErrors.address}
                </span>
              )}
            </div>

             <div className="email">
              <label htmlFor="email"> Epost </label>
              <input
                className={
                  formErrors.email.length > 0
                    ? "error"
                    : null
                }
                type="text"
                value={this.state.email}
                placeholder="Epost"
                name="email"
                noValidate
                onChange={this.handleChange}
              >
              
              </input>

              {formErrors.email.length > 0 && (
                <span className="errorMessage">
                  {formErrors.email}
                </span>
              )}
            </div>

             <div className="tel">
              <label htmlFor="tel"> Tlf </label>
              <input
                className={
                  formErrors.tel.length > 0
                    ? "error"
                    : null
                }
                type="text"
                value={this.state.tel}
                placeholder="tlf"
                name="tel"
                noValidate
                onChange={this.handleChange}
              >
              
              </input>

              {formErrors.tel.length > 0 && (
                <span className="errorMessage">
                  {formErrors.tel}
                </span>
              )}
            </div>

            

             <div className="subscription">
              <label htmlFor="subscription"> Abonnementstatus </label>
              <input
                className={
                  formErrors.subscription.length > 0
                    ? "error"
                    : null
                }
                type="number"
                value={this.state.subscription}
                placeholder="Abonnementstatus"
                name="subscription"
                noValidate
                onChange={this.handleChange}
              >
              
              </input>

              {formErrors.subscription.length > 0 && (
                <span className="errorMessage">
                  {formErrors.subscription}
                </span>
              )}
            </div>

             <div className="zipcode">
              <label htmlFor="zipcode"> Postnummer </label>
              <input
                className={
                  formErrors.zipcode.length > 0
                    ? "error"
                    : null
                }
                type="number"
                value={this.state.zipcode}
                placeholder="Postnummer"
                name="zipcode"
                noValidate
                onChange={this.handleChange}
              >
              
              </input>

              {formErrors.zipcode.length > 0 && (
                <span className="errorMessage">
                  {formErrors.zipcode}
                </span>
              )}
            </div>

            <div className="editCase">
              <button type="submit"> Lagre endringer </button>
            </div>

            <div className="deleteCase">
              <button
                onClick={() => {
                   this.delete(this.props.match.params.id);
                }}
              >
                {" "}
                Slett bruker{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
        );
    }


    delete(id) {
        if (window.confirm("Er du sikker på at du ønsker å slette brukeren?")) {
            console.log("The user  with id " + " " + "has been deleted");
            userService
                .deleteUser(id)
                .then(user => console.log(user))
                .catch((error: Error) => console.log(error.message));
                window.location.reload();
                history.push("/admin/heroes/"); 
            
        }
     
    }

  

    componentDidMount() {
        userService
        .getUserByID(this.props.match.params.id)
        .then(info =>{
          this.user_id=info[0].user_id
         this.setState({ user: info[0],  name: info[0].name, address: info[0].address, tel: info[0].tel,
          email: info[0].email, subscription: info[0].subscription, zipcode: info[0].zipcode })

       }
         )

        .catch((error: Error) => console.log(error.message));

    }
}  