//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { userService } from "../services";
import { Alert,Card, NavBar,ListGroup,Row, Column, Button, Form} from './widgets';
const history = createHashHistory();

export default class ChangePassword extends Component <{ match: { params: { id: number } } }> {
  user = new Object();
  oldPassword = "";
  newPassword1 = "";
  newPassword2 = "";


  render(){
    return(
      <>
      <div className="jumbotron">
        <div className="container text-center">
          <h5>Endre passord</h5>
        </div>
      </div>
      <div className="container text-center">
        <div class="container text-center">
        <div className="form-group">
          Gammelt passord:{" "}
          <input
          className="form-control"
            type="text"
            name="oldPassword"
            onChange={event => (this.oldPassword = event.target.value)}
          />
        </div>
        <div className="form-group">
          Nytt passord:{" "}
          <input
          className="form-control"
            type="text"
            name="newPassword1"
            onChange={event => (this.newPassword1= event.target.value)}
          />
        </div>
        <div className="form-group">
          Gjenta nytt passord:{" "}
          <input
          className="form-control"
            type="text"
            name="newPassword2"
            onChange={event => (this.newPassword2 = event.target.value)}
          />
        </div>
          <br/>
          <br/>
          <Button.Success onClick={() => this.save()}>Save</Button.Success>
          <Button.Light onClick={() => history.push('/profile/'+this.user.user_id)}>Cancel</Button.Light>
          </div>
      </div>
      </>
    );
  }

  save(){
    //if(this.newPassword1!=this.newPassword2) return Alert.danger("Passord er feil, Prøv igjen");
    console.log(this.oldPassword, "OLD PASSWORD");
    console.log(this.newPassword1, "NEW PASSWORD");
    console.log(this.props.match.params.id);
    const passwordInfo = {
      user_id : this.props.match.params.id,
    	oldPassword: this.oldPassword,
    	newpassword: this.newPassword1
    };
    const passwordInfoUpdatePasswordInDB = {
      user_id : this.props.match.params.id,
    	password: this.newPassword1
    };
    
    userService
      .verifyOldPasswordAndUpdatePWord(passwordInfo)
      .then((response) => {
          console.log(response + "Skal oppdatere passord");
          userService.updateUserPWord(passwordInfoUpdatePasswordInDB)
            .then(response => {
							console.log(response, "response from updatepassword ok", "Passord oppdatert");
						})
            .catch(err => {
              console.log(err, "REJECTED FEIL I DATABASE");
            })
        })
     .catch((error: Error) => {
       Alert.danger(error.message)
		 });
   
  }

  componentDidMount(){
    userService
      .getUserByID(this.props.match.params.id)
      .then(user => {
        this.user = user[0];
        if(user) console.log("available user"+this.user.name);
        this.forceUpdate();
      })
      .catch((error: Error) => Alert.danger(error.message));
  }


}
