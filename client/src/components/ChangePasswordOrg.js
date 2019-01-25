//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import { orgService } from "../services";
import { Alert,Card, NavBar,ListGroup,Row, Column, Button, Form} from './widgets';
const history = createHashHistory();

class OrganizationUpdatePWord {
  org_id: number;
  password: string;
}

export default class ChangePassword extends Component {
  userid = -1;
  user = new Object();
  oldPassword = "";
  newPassword1 = "";
  newPassword2 = "";
  meldning = "";
  bilde ="https://png.pngtree.com/svg/20170213/password_reset_369656.png";

  componentDidMount(){
    this.userid = sessionStorage.getItem("userid");
  }

  render(){
    return(
      <>

        <div className="container text-center">
          <div className="row">
            <div className="col">
                <h2>Endre passord</h2>
              <div className="form-group">
                Gammelt passord:{" "}
                <input
                className="form-control"
                  type="password"
                  name="oldPassword"
                  onChange={event => (this.oldPassword = event.target.value)}
                />
              </div>
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
                <Button.Success onClick={() => this.save()}>Lagre</Button.Success>
                <Button.Light onClick={() => history.push("/bedrift")}>Avbryt</Button.Light>
              </div>
              <div className="col hengelaasdiv">
              <p>{this.meldning}</p>
              <img src={this.bilde} className="hengelaas"/>
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

    if(this.newPassword1!=this.newPassword2){
      this.meldning = "Passordene må være like"
      this.forceUpdate();

    }else if(this.newPassword1==this.oldPassword){
      this.meldning = "Nytt passord må være ulik det gamle passordet"
      this.forceUpdate();
    }else{

    // //Will be used once backend check works
    // /*const passwordInfo = {
    //   user_id : this.userid,
    // 	oldPassword: this.oldPassword,
    // 	newpassword: this.newPassword1
    // };*/

    // // const passwordInfo = {
    // //   org_id: this.userid,
    // //   password: this.newPassword1
    // // }

    orgService
      .verifyOldPassword(this.userid, this.oldPassword, this.newPassword1)
      .then((response) => {
        console.log(response + "Skal oppdatere passord");
        console.log(response, "response from updatepassword ok", "Passord oppdatert");
        this.meldning = "Passord endring er vellyket";
        this.bilde = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4bFgZZh0li1xBNi8NCbMZlwyyycFhvJ2H9iwI8WQJNaftq9E";
        console.log("this.meldning =" + this.meldning);
          window.alert("Passord endring vellykket!");
          window.location.reload();
        
        })
      .catch((error: Error) => {
        console.log(error);
        console.log("Verify fail");
        this.meldning = "Feil ved endring av passord,Prøv på nytt";
        this.bilde = "https://visualpharm.com/assets/83/Cancel-595b40b65ba036ed117d3d31.svg";
        this.forceUpdate();
		 });

    }

  }

}
