import * as React from "react";
import { Component } from "react-simplified";
import Map from "./Map";
import { userService } from "../services";

export default class Main extends Component {
  title = "Title";
  province = "Province";
  address = "Address";
  date = "Date";
  description = "Description";

  render() {
    return (
      <div id="case-page">
        <Card title={this.title} />
        <img id="picture" src="https://tinyurl.com/y9qzpzwy" alt="Case" />
        <p id="description">Beskrivelse</p>
        <Map />
      </div>
      );
    }

  mounted(){
    console.log("Case page mounted");
    console.log(this.props.match.params.id);



  }

}


export class Card extends Component<{
  className: string,
  title: string,
  picture: string
}> {

  render() {
    return (
      <div className={"card article info"}>
        <div className="card-body article-body">
            <h5 className="card-title article-title">{this.props.title}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Kommune: </li>
              <li className="list-group-item">Adresse: </li>
              <li className="list-group-item">Lagt inn: </li>
            </ul>
        </div>
      </div>
    );
  }

}
