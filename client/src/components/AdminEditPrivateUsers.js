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


export default class AdminEditPrivateUSers extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
  }



   

  users = [];
  render() {
    return (
      <div className="AdminEditPrivateUSers-Component"> 
       <h1> HELLO </h1>
      
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
