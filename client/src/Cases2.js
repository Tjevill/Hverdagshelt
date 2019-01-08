// @flow
import React from "react";
import { Component } from "react-simplified";

export default class Cases extends Component {
  items = [];

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    const domain = "http://localhost:8080/cases/";
    console.log("Comments: " + domain);

    fetch(domain, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(results => results.json())
      .then(results => (this.items = results));
  }

  handleSubmit(event) {
    const url = "http://localhost:8008/cases/";
    // const url = "http://localhost:8080/comments/";
    const artikkel = document.getElementById("artikkel").value;
    const user = document.getElementById("user").value;
    const comment = document.getElementById("comment").value;

    let fetchData = {
      method: "POST",
      body: JSON.stringify({
        artikkel: artikkel,
        user: user,
        comment: comment
      }),
      headers: { "Content-Type": "application/json; charset=utf-8" }
    };

    fetch(url, fetchData)
      .then(function(response) {})
      .then(function(myJson) {
        console.log("JSON.stringify(myJson): " + JSON.stringify(myJson));
      });

    event.preventDefault();
  }
  render() {
    return (
      <ul>
        <div className="whiteLine" />
        <div className="whiteLine" />
        <h2>Saker: </h2>
        <div className="whiteLine" />

        {this.items.map(function(comments, i) {
          return (
            <div className="commentscontainer" key={i}>
              <div className="kommentartekst">{comments.description}</div>
            </div>
          );
        })}
        <div className="whiteLine" />

      </ul>
    );
  }
}
