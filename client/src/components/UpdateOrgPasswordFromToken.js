//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { orgService } from "../services";
import { Alert,Card, NavBar,ListGroup,Row, Column, Button, Form, Loading, LoadingFirkant} from './widgets';
const history = createHashHistory();

export default class UpdateEmployeePasswordFromToken extends Component <{ match: { params: { token: string } } }> {
  org = new Object();
  newPassword1 = "";
  newPassword2 = "";
  melding = "";
  bilde ="https://png.pngtree.com/svg/20170213/password_reset_369656.png";

  render(){
      if(this.loaded) {
    return(
      <>

          <div className="row">
              <div className="col-md-2">&nbsp;</div>
              <div className="col-md-8">

              <div className="container text-center">
          <div className="row">
            <div className="col">
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
              <div className="col">
              <p>{this.melding}</p>
              <img src={this.bilde} width="200"/>
              </div>
              </div>
              </div>

              </div>
              <div className="col-md-2">&nbsp;</div>
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
        org_id : this.org.org_id,
    	password: this.newPassword1
    };
        orgService.updateOrgPWordByID(passwordInfoUpdatePasswordInDB)
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
      orgService.verifyResetToken(this.props.match.params.token)
        .then( org => {
          this.org = org[0];
          console.log('user:'+ org[0].email + " id: " + org[0].org_id);
          if(org[0]) {
            console.log("available user: "+ this.org.name);
            this.loaded = true;
          }
          console.log("if passert");
          this.forceUpdate();
      })
      .catch((error: Error) => Alert.danger(error.message));
  }
}