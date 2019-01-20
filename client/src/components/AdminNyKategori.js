// @flow

import * as React from "react";
import { Component } from "react-simplified";
import {categoryService, employeeService, orgService} from "../services";
import { userService } from "../services";
import createHashHistory from "history/createHashHistory";

const history = createHashHistory();

export default class AdminNyBedrift extends Component {
    category= [];
  message = " ";
  state = {
    description: ""
  };


    componentDidMount() {

    }

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState((state, props) => ({
            [name]: value
        }));

        console.log(this.state);
    };

  render() {
    if (!this.category) return null;



    return (
        <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
      <div className="NyAnsatt">
        <h1>Registrer ny kategori</h1>

          <div className="form-group">
              Kategori-navn / beskrivelse:{" "}
              <input
                  className="form-control"
                  type="text"
                  name="description"
                  defaultValue=""
                  onChange={this.handleChange}
              />
          </div>


          <p>&nbsp;</p>
        <button type="button" onClick={this.save} className="btn btn-primary">
          Save
        </button>
        <h4>{this.message}</h4>
      </div>

        </div>
      <div className="col-sm-4"></div>
      </div>

    );
  }




  save() {
    if (!this.category) {
      console.log("Returning null!");
      this.message = "Error";
      return null;
    }

    const catdata = {
        description: this.state.description,
    };

      console.log("this category: ", catdata);

      categoryService
          .addCategory(catdata)
          .then(response => {
              console.log("this.catdata: ", this.catdata)
              history.push("/admin/kategori")
          })
          .catch(
              (error: Error) =>
                  (this.message = error.message)
          );
  }
}
