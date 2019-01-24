import * as React from "react";
import { Component } from "react-simplified";
import { userService } from "../services.js";
import { Loading } from "./widgets";
import createHashHistory from "history/createHashHistory";

const history = createHashHistory();

function sliceArray(array, size) {
  var result = [];
  for (var x = 0; x < Math.ceil(array.length / size); x++) {
    var start = x * size;
    var end = start + size;
    result.push(array.slice(start, end));
  }
  return result;
}

function count(array) {
  var result = [];
  for (var x = 1; x < array.length + 1; x++) {
    result.push(x);
  }
  return result;
}
/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */

export default class PrivateUsersList extends Component<{
  match: { params: { id: number } }
}> {
  users = [];
  usersider = [];
  usersbackup = [];
  superUser = "";
  loaded = false;

  abbstatus(number) {
    if (number == 1) {
      return "no";
    } else {
      return "yes";
    }
  }

  render() {
    if (this.loaded) {
      return (
        <div id="org-page">
          <div className="group btmspace-50 headerlayout">
            <div className="one_half first">
              <h3>HverdagsHelter</h3>
            </div>
          </div>

          <table className="">
            <thead>
              <tr>
                <th scope="col">Navn</th>
                <th scope="col">Adresse</th>
                <th scope="col">Telefon</th>
                <th scope="col">Email</th>
                <th scope="col">Abb.</th>
                <th scope="col">Postnr</th>
                <th scope="col" colSpan="2">
                  <input
                    id="searchbar"
                    type="text"
                    onChange={event => this.search(event)}
                  />{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {this.users
                .slice(
                  (this.props.match.params.id - 1) * 10,
                  (this.props.match.params.id - 1) * 10 + 10
                )
                .map((item, i) => (
                  <tr key={i} className="PrivateUsersList-TableRow">
                    <th scope="row">{item.name}</th>
                    <td>{item.address}</td>
                    <td>{item.tel}</td>
                    <td>{item.email}</td>
                    <td>{this.abbstatus(item.subscription)}</td>
                    <td>{item.zipcode}</td>
                    <td>{this.addEditRowColumn(item)}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.delete(item.user_id, item)}
                      >
                        Slett
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div id="toolbar">
            <div className="wrapper text-center">
              <div className="btn-group">
                {count(sliceArray(this.users, 10)).map(sidetall => (
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    id="Saker-side-button"
                    onClick={() => history.push("/admin/heroes/" + sidetall)}
                  >
                    {sidetall}{" "}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }

  search(event) {
    console.log(event.target.value);
    this.users = this.usersbackup.filter(function(value) {
      return (
        value.name.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1
      );
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            history.push("/admin/heroes/" + user.user_id + "/edit");
          }}
        >
          Rediger
        </button>
      );
    } else {
      return "";
    }
  }

  delete(id, user) {
    if (
      window.confirm(
        "Er du sikker på at du ønsker å slette følgende bruker? :" + user.name
      )
    ) {
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
