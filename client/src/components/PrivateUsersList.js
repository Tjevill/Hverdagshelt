import React from "react";


import { Component } from "react-simplified";
import { userService } from "../services.js";
import {LoadingFirkant} from './widgets';
import createHashHistory from "history/createHashHistory";

const history = createHashHistory();

const style = {
  margin: 12
};
/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
export default class PrivateUsersList extends Component {
  users = [];
  usersbackup=[];
  superUser = "";
  loaded = false;

  render() {
     if(this.loaded){
    return (


         <div id="org-page">

                    <div className="group btmspace-50 headerlayout">
                        <div className="one_half first"><h3>HverdagsHelter</h3></div>
                       
                    </div>

                    <table className="">
                        <thead>
                        <tr>
                            <th scope="col">Bruker ID</th>
                            <th scope="col">Navn</th>
                            <th scope="col">Adresse</th>
                            <th scope="col">Telefon</th>
                            <th scope="col">Email</th>
                            <th scope="col">Abonnement Status</th>
                            <th scope="col">Postnr</th>
                            <th scope="col" colSpan="2">
                                      <input
                                          id="searchbar"
                                          type="text"
                                          onChange={event => this.search(event)}
                                      />


                                      {" "}
                                  </th>
                        </tr>
                        </thead>
                        <tbody>
                         {this.users.map((item, i) => (
                                
                               
                                <tr key={i} className="PrivateUsersList-TableRow">

                                <th scope="row">{item.user_id}</th>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td>{item.tel}</td>
                                <td>{item.email}</td>
                                <td>{item.subscription}</td>
                                <td>{item.zipcode}</td>
                                <td>{this.addEditRowColumn(item)}</td>
                                 <td><button type="button" className="btn btn-danger" onClick ={() => this.delete(item.user_id, item)}>Slett</button></td>
                                </tr>

                                    ))}
                       

                        </tbody>
                    </table>
                </div>
            );
          } else {
            return (
                <div className="group btmspace-50 demo">
                    <div className="one_third first">&nbsp;</div>
                    <div className="one_third centered padded"><LoadingFirkant /></div>
                    <div className="one_third">&nbsp;</div>
                </div>

            );
        }
        } 

  search(event) {
    console.log(event.target.value);
    this.users = this.usersbackup.filter(function(value){
        return value.name.toLowerCase().indexOf(event.target.value.toLowerCase())!=(-1);
    });
    this.forceUpdate();
  }

  edit(id) {
    console.log("Her er vi" + id);
    //window.location('/admin/heroes/' +id + '/edit');
  }

   addEditRowColumn(user) {
        if (this.superUser == 1) {
            return (
                <button type="button" className="btn btn-primary" onClick={() => {history.push("/admin/heroes/" + user.user_id + "/edit"); }}>Rediger</button>

    );
  }else {
      return "";
    }
}

  delete(id, user) {
    if (window.confirm("Er du sikker på at du ønsker å slette følgende bruker? :" + user.name)) {
      //console.log("The user  with id " + " " + "has been deleted");
      userService
        .deleteUser(id)
        .then(user => console.log(user))
        .catch((error: Error) => console.log(error.message));

      window.location.reload();
    }
  }

  

  componentDidMount() {
    this.superUser = sessionStorage.getItem("superuser");
    userService
      .getAllUsers()
      .then(user => {
        this.users = user;
        this.usersbackup = user;
        this.loaded = true;
      })
      .catch((error: Error) => console.log(error.message));
  }
}
