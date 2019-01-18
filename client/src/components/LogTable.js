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
import SearchBar from 'material-ui-search-bar';
      import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const style = {
  margin: 12
}
   
export default class LogTable extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
  }




  users = [];
  render() {
    return (
      <div className="LogTable-Component"> 
       <h1> HELLO </h1>
          <MuiThemeProvider>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Bruker ID</TableHeaderColumn>
              <TableHeaderColumn>Case ID</TableHeaderColumn>
              <TableHeaderColumn>Tidspunkt</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
              <TableHeaderColumn>Abonnement_status</TableHeaderColumn>
              <TableHeaderColumn>Postnr</TableHeaderColumn>
              <TableHeaderColumn>
              </TableHeaderColumn>
              <TableHeaderColumn>  <SearchBar
      onChange={() => console.log('onChange')}
      onRequestSearch={() => console.log('onRequestSearch')}
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
                <TableRowColumn className="user_id"></TableRowColumn>
                <TableRowColumn className="name"></TableRowColumn>
                <TableRowColumn className="phone_number">
                 
                </TableRowColumn>
                  <TableRowColumn className="address">
                
                </TableRowColumn>
                <TableRowColumn className="email"></TableRowColumn>
             
                <TableRowColumn className="subscription">
                
                </TableRowColumn>

                <TableRowColumn className="zipcode"></TableRowColumn>
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
      
      </div>
    );
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

  save(){
    console.log("relocating to a new window")
  }

  componentDidMount() {
    
  }
}
