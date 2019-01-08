import * as React from "react";
import { Component } from "react-simplified";
import Map from "./Map";

export default class Main extends Component {
  title = "Title";
  province = "Province";
  address = "Address";
  date = "Date";
  description = "Description";

  render() {
    return (
      <div id="case-page">
        <h1> {this.title} </h1>
        <img src="https://tinyurl.com/y9qzpzwy" alt="Case image" />
        <br />
        <h6> {this.province} </h6>
        <h6> {this.address} </h6>
        <h6> {this.date} </h6>
        <p1> {this.description} </p1>
        <Map />
      </div>
    );
  }
}
