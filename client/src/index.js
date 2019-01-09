// @flow
/* eslint eqeqeq: "off" */
import {HashRouter, Route} from 'react-router-dom';

import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./style.css";
import {Router, NavLink} from "react-router-dom";
import createHashHistory from "history/createHashHistory";
import Cases from "./Cases"
import {ListGroup, Button} from "./Components/List";

const history = createHashHistory();

history.listen((location, action) => {
	window.scrollTo(0, 0);
});

class Menu extends Component {
	render () {
		return (
			<Router history = {history}>
				<ul className = "hovedmeny">
					<li id = "menuitem1">
						<NavLink to = "/">Forsiden</NavLink>
					</li>
					<li id = "menuitem2">
						<NavLink to = "/ntnu">Meny 1</NavLink>
					</li>
					<li id = "menuitem3">
						<NavLink to = "/verden">Meny 2</NavLink>
					</li>
					<li id = "menuitem4">
						<NavLink to = "/login">Logg inn</NavLink>
					</li>
				</ul>
			</Router>
		);
	}
}

class Main extends Component {
	render () {
		
		return (
			<div className = "container">
				<div className = "item heading">
					<div className = "avisnavntittel">Vær en hverdagshelt!</div>
				</div>
				<div className = "item meny">
					<Menu />
				</div>
				<div className = "item main">
					<Cases />
				</div>
			</div>
		);
	}
}

class EditUser extends Component<{ match: { params: { user_id: number } } }> {
	
	cases = [];
	
	user = {
		user_id: -1,
		name: '',
		email: '',
		cases: [],
		address: '',
		phone: '',
		password: '',
		zipcode: ''
	};
	
	render () {
		return (
			<div className = "container-fluid">
				<h5>
					Rediger personalia
				</h5>
				<div className = "row">

							<form>
								<div className= "form-group">
									<label>Navn</label>
									<input
										type = "text"
										id="name"
										className = "form-control"
										value = {this.user.name}
										onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => { if (this.user) (this.user.name = event.target.value); }}
									/>
									<br />
									<label >Email</label>
									<input
										type = "text"
										id="email"
										className = "form-control"
										value = {this.user.email}
										onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => { if (this.user) (this.user.email = event.target.value); }}
									/>
									<br />
									<label >Adresse</label>
									<input
										type = "text"
										id= "address"
										className = "form-control"
										value = {this.user.address}
										onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => { if (this.user) (this.user.address = event.target.value); }}
									/>
									<br />
									<label >Postnummer</label>
									<input
										type = "text"
										id = "zip"
										className = "form-control"
										value = {this.user.zipcode}
										onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => { if (this.user) (this.user.zipcode = event.target.value); }}
									/>
									<br />
									<label >Telefonnummer</label>
									<input
										type = "text"
										id="phone"
										className = "form-control"
										value = {this.user.phone}
										onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => { if (this.user) (this.user.phone = event.target.value); }}
									/>
									<br />
									<label >Passord</label>
									<input
										type = "text"
										id="password"
										className = "form-control"
										value = {this.user.password}
										onChange = {(event: SyntheticInputEvent<HTMLInputElement>) => { if (this.user) (this.user.password = event.target.value); }}
									/>
								</div>
								<Button.Success onClick = {() => this.update()}>
									Oppdater
								</Button.Success>
							</form>

				</div>
				<div className= "container-fluid">
					<ListGroup>
						{this.cases.map((casee, i) => (
							<ListGroup.Item key = {i}>
								{casee} ----- {casee.timeStamp}
								<Button.Danger onClick = {() => this.delete(casee.case_id)}>
									Slett
								</Button.Danger>
							
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
			
			</div>
		)
	}
	
/*	delete (id: number) {
		if (confirm("Sikker på at du vil slette saken?")) {
			if (caseService.deleteOneByID(id)) {
				this.mounted();
			}
		}
	}*/
	
/*	update () {
		// $FlowFixMe
		userService.updateOne(this.user)
			.catch((error: Error) => Alert.danger(error.message));
		
		history.push('/home/' + this.article.category + '/' + this.article.articleID);
	}*/
	
	/*mounted () {
		userService.getOneByID(this.props.match.params.user_id)
			.then(user => (this.user = user[0]))
			.catch((error: Error) => Alert.danger(error.message));
		
		caseService.getSelected(this.props.match.params.user_id)
			.then(cases => (this.cases = cases))
			.catch((error: Error) => Alert.danger(error.message));
		
	}*/
	
}


const root = document.getElementById('root');
if (root)
	ReactDOM.render(
		<HashRouter>
			<div>
				<Menu />
				<Route exact path = "/home/:user_id/editUser" component = {EditUser} />
			
			</div>
		</HashRouter>,
		root
	);
/*export default Main;

ReactDOM.render(
	<div>
		<Main />
		<EditUser />
	</div>,
	document.getElementById("root")
);*/
