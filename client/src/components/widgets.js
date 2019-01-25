
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';


console.log = function() {}


export function refreshToken() {
    const myHeaders = new Headers();

    // console.log("Refreshing with: " + sessionStorage.getItem('storedtoken'))
    myHeaders.append('x-access-token', sessionStorage.getItem('storedtoken'));
    myHeaders.append('Content-Type', 'application/json; charset=utf-8');

    //let url = 'http://xx.xx.xxx.xx:8080/refreshtoken'; for mobile testing(use your own ip)
    let url = "http://10.22.157.143:8080/refreshtoken";
    let fetchData = {
        method: 'POST',
        headers: myHeaders
    };

    return new Promise(resolve => {
    fetch(url, fetchData)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            let mytoken = myJson.jwt;
            sessionStorage.setItem('storedtoken', mytoken);


            if (mytoken != undefined) {

                console.log("Refreshtoken: Token refreshed!");
                resolve(true);
            }
            else {
                console.log("Refreshtoken: Mangler token. Kan ikke refreshe");
                resolve(false);
            }
        })
        .catch((error: Error) => console.error("Refresh token error: " + error.message));
    });
}


/**
 * Renders alert messages using Bootstrap classes.
 */
export class Alert extends Component {
  alerts: { text: React.Node, type: string }[] = [];

  render() {
    return (
      <>
        {this.alerts.map((alert, i) => (
          <div key={i} className={'alert alert-' + alert.type} role="alert">
            {alert.text}
            <button
              className="close"
              onClick={() => {
                this.alerts.splice(i, 1);
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </>
    );
  }

  static success(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'success' });
    });
  }

  static info(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'info' });
    });
  }

  static warning(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'warning' });
    });
  }

  static danger(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'danger' });
    });
  }
}

//might be implemented later
/*export class TitleBanner extends Componenet <{ id: string }> {

    render(){
        <div className="title-banner">
            <h1> </h1>
        </div>
    }

}*/


export class Card extends Component<{ title: React.Node, children?: React.Node }> {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

class ListGroupItem extends Component<{ to?: string, children: React.Node }> {
  render() {
    return this.props.to ? (
      <NavLink className="list-group-item" activeClassName="active" to={this.props.to}>
        {this.props.children}
      </NavLink>
    ) : (
      <li className="list-group-item">{this.props.children}</li>
    );
  }
}


/**
 * Renders a row using Bootstrap classes
 */
export class Row extends Component<{ children: React.Node }> {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

/**
 * Renders a column with specified width using Bootstrap classes
 */
export class Column extends Component<{ width: number, children: React.Node }> {
  render() {
    return <div className={'col-sm-3' + this.props.width}>{this.props.children}</div>;
  }
}

/**
 * Renders a list group using Bootstrap classes
 */
export class ListGroup extends Component<{
  children: React.Element<typeof ListGroupItem> | (React.Element<typeof ListGroupItem> | null)[] | null
}> {
  static Item = ListGroupItem;

  render() {
    return <ul className="list-group">{this.props.children}</ul>;
  }
}




class ButtonSuccess extends Component<{
  onClick: () => mixed,
  children: React.Node
}> {
  render() {
    return (
      <button type="button" className="btn btn-success" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

class ButtonDanger extends Component<{
  onClick: () => mixed,
  children: React.Node
}> {
  render() {
    return (
      <button type="button" className="btn btn-danger" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

class ButtonLight extends Component<{
  onClick: () => mixed,
  children: React.Node
}> {
  render() {
    return (
      <button type="button" className="btn btn-light" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a button using Bootstrap classes
 */
export class Button {
  static Success = ButtonSuccess;
  static Danger = ButtonDanger;
  static Light = ButtonLight;
}

class FormInput extends Component<{
  type: string,
  label: React.Node,
  value: mixed,
  onChange: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
  required?: boolean,
  pattern?: string
}> {
  render() {
    return (
      <div className="form-group row ">
        <label className="col-sm-6 col-form-label">{this.props.label}</label>
        <div className="col-sm-4">
          <input
            className="form-control"
            type={this.props.type}
            value={this.props.value}
            onChange={this.props.onChange}
            required={this.props.required}
            pattern={this.props.pattern}
          />
        </div>
      </div>
    );
  }
}

export class Loading extends Component {
    render(){
        return (
            <div className="loading-animation">
                <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif' alt="loader" />
            </div>
        );
    }
}


export class LoadingFirkant extends Component {
    render(){
        return (
            <div className="loading-animation">
                <img src='/images/805.svg'  alt="loader" />
            </div>
        );
    }
}



function getDate(date) {
    if(date === "" || date == null) return "";
    let dateObject = new Date(date);
    dateObject.setSeconds(0, 0);
    return dateObject
        .toISOString()
        .replace('T', ' ')
        .replace(':00.000Z', '');
}




/**
 * Renders simplified form elements using Bootstrap classes
 */
export class Form {
  static Input = FormInput;
}
