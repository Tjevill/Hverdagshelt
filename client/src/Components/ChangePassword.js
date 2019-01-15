//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { userService } from "../services";
import { Alert,Card, NavBar,ListGroup,Row, Column, Button, Form} from './widgets';
const history = createHashHistory();

export default class ChangePassword extends Component {
  userid = -1;
  user = new Object();
  oldPassword = "";
  newPassword1 = "";
  newPassword2 = "";
  meldning = "";
  bilde ="https://png.pngtree.com/svg/20170213/password_reset_369656.png";

  render(){
    return(
      <>
      <div className="jumbotron">
        <div className="container text-center">
          <h5>Endre passord</h5>
        </div>
      </div>

        <div class="container text-center">
          <div class="row">
            <div class="col">
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
              <div class="col">
              <p>{this.meldning}</p>
              <img src={this.bilde} width="200"/>
              </div>
              </div>
              </div>
      </>
    );
  }

  save(){
    //if(this.newPassword1!=this.newPassword2) return Alert.danger("Passord er feil, Prøv igjen");
    console.log(this.oldPassword, "OLD PASSWORD");
    console.log(this.newPassword1, "NEW PASSWORD");
    console.log(this.id);
    const passwordInfo = {
      user_id : this.id,
    	oldPassword: this.oldPassword,
    	newpassword: this.newPassword1
    };
    const passwordInfoUpdatePasswordInDB = {
      user_id : this.id,
    	password: this.newPassword1
    };

    userService
      .verifyOldPasswordAndUpdatePWord(passwordInfo)
      .then((response) => {
          console.log(response + "Skal oppdatere passord");
          userService.updateUserPWord(passwordInfoUpdatePasswordInDB)
            .then(response => {
							console.log(response, "response from updatepassword ok", "Passord oppdatert");
              this.meldning = "Passord endring er vellyket";
              this.bilde = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4bFgZZh0li1xBNi8NCbMZlwyyycFhvJ2H9iwI8WQJNaftq9E";
              console.log("this.meldning =" + this.meldning);
              this.forceUpdate();
						})
            .catch(err => {
              console.log(err, "REJECTED FEIL I DATABASE");
            })
        })
     .catch((error: Error) => {
       Alert.danger("noooooo");
       this.meldning = "Feil ved endring av passord,Prøv på nytt";
       this.bilde = "https://visualpharm.com/assets/83/Cancel-595b40b65ba036ed117d3d31.svg";
       this.forceUpdate();
		 });

  }

  componentDidMount(){
    this.userid = sessionStorage.getItem("userid");
    console.log(this.userid);
    userService
      .getUserByID(this.id)
      .then(user => {
        this.user = user[0];
        if(user) console.log("available user"+this.user.name);
        this.forceUpdate();
      })
      .catch((error: Error) => Alert.danger(error.message));
  }


}
