//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { employeeService } from "../services";
import { Alert,Card, NavBar,ListGroup,Row, Column, Button, Form, Loading, LoadingFirkant} from './widgets';
const history = createHashHistory();

export default class UpdateEmployeePasswordFromToken extends Component <{ match: { params: { token: string } } }> {
  employee = new Object();
  newPassword1 = "";
  newPassword2 = "";
  melding = "";
  bilde ="https://png.pngtree.com/svg/20170213/password_reset_369656.png";

  render(){
      if(this.loaded) {
    return(
      <>
      <div className="jumbotron">
        <div className="container text-center">
          <h4> Du kan nå endre ditt passord</h4>
        </div>
      </div>

        <div class="container text-center">
          <div class="row">
            <div class="col">
              <div className="form-group">
                Nytt passord:{" "}
                <input
                className="form-control"
                  type="password"
                  name="newPassword1"
                  onChange={event => (this.newPassword1= event.target.value)}
                />
              </div>
                <div className="form-group">
                  Gjenta nytt passord:{" "}
                  <input
                  className="form-control"
                    type="password"
                    name="newPassword2"
                    onChange={event => (this.newPassword2 = event.target.value)}
                  />
                </div>
                <br/>
                <br/>
                <Button.Success onClick={() => this.save()}>Save</Button.Success>
                <Button.Light onClick={() => history.push('/profile/'+this.employee.emp_id)}>Cancel</Button.Light>
              </div>
              <div class="col">
              <p>{this.melding}</p>
              <img src={this.bilde} width="200"/>
              </div>
              </div>
              </div>
      </>
    );
      } else {
          return(
              <Loading />
          );
      }
  }

  save(){

    if(this.newPassword1!=this.newPassword2){
      this.melding = "Passordene må være like"
      this.forceUpdate();

    }else{
    
    const passwordInfoUpdatePasswordInDB = {
        emp_id : this.employee.emp_id,
    	password: this.newPassword1
    };
        employeeService.updateEmpPw(passwordInfoUpdatePasswordInDB)
          .then(response => {
            console.log(response, "response from updatepassword ok", "Passord oppdatert");
            this.melding = "Passord endring er vellyket";
            this.bilde = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4bFgZZh0li1xBNi8NCbMZlwyyycFhvJ2H9iwI8WQJNaftq9E";
            console.log("this.melding =" + this.melding);
            this.forceUpdate();
          })
          .catch(err => {
            console.log(err, "REJECTED FEIL I DATABASE");
          });
    }
  }

  componentDidMount(){

      console.log(this.props.match.params.token);
      employeeService.verifyResetToken(this.props.match.params.token)
        .then( emp => {
          this.employee = emp[0];
          console.log('user:'+ emp[0]);
          if(emp[0]) {
            console.log("available user"+this.emp.name);
            this.loaded = true;
          }
          this.forceUpdate();
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}