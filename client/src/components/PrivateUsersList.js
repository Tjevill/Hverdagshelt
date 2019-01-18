import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Component } from "react-simplified";
import { userService } from "../services.js";
import RaisedButton from 'material-ui/RaisedButton';
import SearchBar from 'material-ui-search-bar'

const style = {
  margin: 12,
};
/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
export default class TableExampleComplex extends Component {
  users = [];
  render() {
    return (
      <MuiThemeProvider>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Bruker_ID</TableHeaderColumn>
              <TableHeaderColumn>Navn</TableHeaderColumn>
              <TableHeaderColumn>Adresse</TableHeaderColumn>
              <TableHeaderColumn>Tlf</TableHeaderColumn>
              <TableHeaderColumn>Epost</TableHeaderColumn>
              <TableHeaderColumn>Abonnement_status</TableHeaderColumn>
              <TableHeaderColumn>Postnr</TableHeaderColumn>
              <TableHeaderColumn>
              </TableHeaderColumn>
              <TableHeaderColumn>  <SearchBar
      onChange={(event) => this.searchUsers(event)}
      style={{
        margin: '0 auto',
        minWidth:120,
        maxWidth: 900
      }}
    /></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.users.map((user, i) => (
              <TableRow key={i} className="PrivateUsersList-TableRow">
                <TableRowColumn className="user_id">{user.user_id}</TableRowColumn>
                <TableRowColumn className="name">{user.name}</TableRowColumn>
                <TableRowColumn className="phone_number">
                  {user.tel}
                </TableRowColumn>
                  <TableRowColumn className="address">
                  {user.address}
                </TableRowColumn>
                <TableRowColumn className="email">{user.email}</TableRowColumn>
             
                <TableRowColumn className="subscription">
                  {user.subscription}
                </TableRowColumn>

                <TableRowColumn className="zipcode">{user.zipcode}</TableRowColumn>
                     <TableRowColumn className="edit">
                 <RaisedButton label="rediger" primary={true} style={style} onClick={() => {
                  this.edit();
                }}>
                  </RaisedButton>

                 </TableRowColumn>


                 <TableRowColumn className="delete">
                 <RaisedButton label="Slett" secondary={true} style={style} onClick={() => {
                  this.delete(user.user_id);
                }}>
                  </RaisedButton>
                  </TableRowColumn>


            

                 </TableRow>


            ))}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
  
  searchUsers(searchString){
    console.log(searchString);
    userService.getUsersBySearchingOnName(searchString)
      .then(response => {
        this.users = response;
			})
      .catch(err => {
        console.log("No users with this name");
      })
  }


  delete(id){
       if ( window.confirm("Er du sikker på at du ønsker å slette saken?") ){
    console.log("The user  with id " + " " +  "has been deleted");
    userService
    .deleteUser(id)
    .then(user => console.log(user))
    .catch((error: Error) => console.log(error.message));

     window.location.reload();
  }
  }

  edit(){
    console.log("relocating to a new window")
  }

  componentDidMount() {
    userService
      .getAllUsers()
      .then(user => (this.users = user))
      .catch((error: Error) => console.log(error.message));
  }
}
