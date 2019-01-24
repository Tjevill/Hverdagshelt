
//@flow
import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { geoService, employeeService, userService } from "../services";
import {Alert, Card, ListGroup, Row, Column, Button, Form, Loading} from './widgets';


const history = createHashHistory();
var emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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




export default class AdminEditEmployee extends Component < {
	    match: { params: { id: number } }
} > {
		employee_id="";
		commune_nr="";
		county_nr="";

		counties=[];
		communes=[];
		superuser="";

	    constructor(props) {
        super(props);
        this.state = {
          	name: "",
          	tel: "",
            email: "",
			county:"",
            commune:"",
       

            formErrors: {
            name: "",
            tel: "",
            email: "",
            county:"",
            commune:"",
            
            }
        };
    }


    handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
         name: ${this.state.name}
 		 tel: ${this.state.tel} 
         email: ${this.state.email} 
       	county: ${this.state.county} ${this.county_nr} 
       	 commune: ${this.state.commune} ${this.commune_nr} 
       	 employee_id: ${this.employee_id} 
         
      `);

      this.update();

  
    } else {

     window.alert("Vennligst fyll ut alle felt");
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

      

         case "tel":
        formErrors.tel =
          value.length < 3 || value.length>9 ? "minst 3 tall, maks 9 tall" : "";
        break;

          case "email":
        formErrors.email =
         value.match(emailRegex) && value.length > 0 ? "" : "ugyldig epost: format feks :bruker@gmail.com";

        break;
        
       

        case "county":
        const chosenCounty = this.counties.find((county) => county.navn.toUpperCase()== value.toUpperCase());
        if(chosenCounty!=null){
        this.county_nr=chosenCounty.ID;
        this.setState({commune:""})
	     	}
 		formErrors.county =
          value.length <1 || chosenCounty==null ? "Vennligst fyll inn fylke" : "";
        formErrors.commune =
          value.length <1 || chosenCounty==null ? "Vennligst fyll inn gyldig kommune (Stor forbokstav)" : "";
        
        break;

         case "commune":
       const chosenCommune = this.communes.find((commune) => commune.navn.toUpperCase()== value.toUpperCase() && commune.fylke_id==this.county_nr);
         if(chosenCommune!=null){
        this.commune_nr=chosenCommune.ID;
		}
		formErrors.commune =
          value.length <1 || chosenCommune==null  ? "Vennligst skriv inn en gyldig kommune i følgende fylke:" : "";


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
    employeeService
    .updateEmpData({
      name: this.state.name,
      tel: this.state.tel,
      email: this.state.email,
      commune: this.commune_nr,
      county: this.county_nr,
      employee_id: this.employee_id
    })
    .then(res => {
        console.log("Response recieved:", res); //ENDRINGER ER BLITT LAGRET
        history.push("/admin/kommune")
      })
      .catch(err => {
        console.log("AXIOS ERROR:", err);
      });

  }

  addDeleteButton(){
   
      if(this.superuser==0){
         return(
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
      
      );
  
  } else {
    return ( <div> </div>);
  }
  }

render(){
	 const { formErrors } = this.state;
      return (

        <div className="caseEdit-wrapper">
         <link rel="stylesheet" href="editUsers.css" />
        <div className="form-wrapper">
          <h1> Rediger Ansatt </h1>

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

            <div className="tel">
              <label htmlFor="tel"> Tlf </label>
              <input
                className={
                  formErrors.tel.length > 0
                    ? "error"
                    : null
                }
                type="number"
                value={this.state.tel}
                placeholder="Tlf"
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
				
				 <div className="county">
              <label htmlFor="county"> Fylke </label>
              <input
                className={
                  formErrors.county.length > 0
                    ? "error"
                    : null
                }
                type="text"
                value={this.state.county}
                placeholder="Fylke"
                name="county"
                noValidate
                onChange={this.handleChange}
              >
              
              </input>

              {formErrors.county.length > 0 && (
                <span className="errorMessage">
                  {formErrors.county}
                </span>
              )}
            </div>
             
			  <div className="commune">
              <label htmlFor="commune"> Kommune </label>
              <input
                className={
                  formErrors.commune.length > 0
                    ? "error"
                    : null
                }
                type="text"
                value={this.state.commune}
                placeholder="Kommune"
                name="commune"
                noValidate
                onChange={this.handleChange}
              >
              
              </input>

              {formErrors.commune.length > 0 && (
                <span className="errorMessage">
                  {formErrors.commune}
                </span>
              )}
            </div>

            

            <div className="editCase">
              <button type="submit"> Lagre endringer </button>
            </div>
          
            {this.addDeleteButton(this.superuser)}



          </form>
        </div>
      </div>
      );
    }


    delete(id) {
    	
        if (window.confirm("Er du sikker på at du ønsker å slette ansatte?")) {
            console.log("The user  with id " + " " + "has been deleted");
            employeeService
                .deleteEmp(id)
                .then(user => console.log(user))
                .catch((error: Error) => console.log(error.message));

                history.push("/admin/kommune/"); 
           
        }
      
    }

    addDeleteButton(id){
    	if(id!==1){
    		return (
    			 <div className="deleteCase">
              <button
                onClick={() => {
                   this.delete(this.props.match.params.id);
                }}
              >
                {" "}
                Slett ansatt{" "}
              </button>
            </div>)

    	}

    }

	componentDidMount() {
        employeeService
        .getOne(this.props.match.params.id)
        .then(info =>{
          this.employee_id=info[0].employee_id
          this.commune_nr=info[0].commune
          this.county_nr=info[0].county
          this.superuser=info[0].superuser
         this.setState({ name: info[0].name, tel: info[0].tel,
          email: info[0].email})

         geoService
		.getCommuneName(info[0].commune)
		.then ( name =>this.setState ({commune:name[0].navn}))
		.catch((error: Error) => console.log(error.message));
		
		
		geoService
		.getCommunesCounty(info[0].county)
		.then ( name =>this.setState ({county:name[0].navn}))
		.catch((error: Error) => console.log(error.message));
			}
         )
		.catch((error: Error) => console.log(error.message));
		
		geoService
		.getCommunesKommune()
		.then ( kommuner => this.communes=kommuner)
		.catch((error: Error) => console.log(error.message));



		userService
		.getDistricts()
		.then( fylker =>this.counties=fylker)
		.catch((error: Error) => console.log("Errors by getting all the available counties"));

    	}



}