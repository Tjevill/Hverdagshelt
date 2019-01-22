// @flow
/* eslint eqeqeq: "off" */

import * as React from "react";
import { Component } from "react-simplified";
import {categoryService, employeeService, orgService} from "../services";
import { userService } from "../services";

import createHashHistory from "history/createHashHistory";
const history = createHashHistory();


export default class AdminRedigerBedrift extends Component<{ match: { params: { id: number } }}> {
    organization = [];

    message = " ";
    passworderror = " ";

    categories = [];
    conns = [];
    category_ids = [];



    componentDidMount() {

        let orgPromise = orgService.getOrgByID(this.props.match.params.id);
        orgPromise.then(orgData => {
            //console.log(orgData[0]);
            this.organization = orgData[0];
            this.setState((state, props) => ({
                organizationnumber: this.organization.organizationnumber,
                name: this.organization.name,
                email: this.organization.email,
                tel: this.organization.tel
            }));

        });



        categoryService.getAllCategories()
            .then(response => {
                // console.log("getCategories respose", response);
                this.categories = response;
                let i;
                 for (i=0; i < response.length; i++) {
                    let catid = response[i].category_id;

                    console.log("response[i].category_id: " + response[i].category_id);
                    categoryService.checkIfChecked(response[i].category_id, this.props.match.params.id)
                    .then((response2, index) => {
                        let value = false;
                        (response2.length === 0 ? value = false : value = true)
                      this.conns.push({"catid": catid, "checked": false});
                    });

                }
            })
            .catch(
                (error: Error) =>
                    (this.message = error.message)
            );
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



    handleAllChecked = (event) => {
        let i;
        for (i=0; i < this.conns.length; i++) {
            if (this.conns[i].catid == event.target.value) {
                this.conns[i].checked = event.target.checked;
            }
        }


        console.log(event.target.value + " " + event.target.checked);
        console.log("conns: ", this.conns)
    }




    render() {
        if (!this.organization) return null;
// console.log("this org: ", this.organization)
        return (
            <div className="row">
                <div className="col-sm-4">&nbsp; </div>
                <div className="col-sm-4">
                    <div className="NyAnsatt">
                        <h1>Rediger bedrift</h1>

                        <div className="form-group">
                            Organisasjonsnummer:{" "}
                            <input
                                className="form-control"
                                type="text"
                                name="organizationnumber"
                                defaultValue={this.organization.organizationnumber}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            Navn:{" "}
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                defaultValue={this.organization.name}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            Telefon:{" "}
                            <input
                                className="form-control"
                                type="text"
                                defaultValue={this.organization.tel}
                                name="tel"
                                maxLength="8"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            Email:{" "}
                            <input
                                className="form-control"
                                type="text"
                                defaultValue={this.organization.email}
                                name="email"
                                onChange={this.handleChange}
                            />
                        </div>


                        <div className="form-group">
                            <h6>Du må krysse av alle aktuelle kategorier på nytt: </h6>
                            {this.categories.map((cat, index) => {
                                return (
                                    <div className="form-check form-check-inline" key={cat.category_id}>

                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox" value={cat.category_id} onClick={this.handleAllChecked} />
                                        <label className="form-check-label" htmlFor="inlineCheckbox1">{cat.description}</label>
                                    </div>
                                )
                            })}
                        </div>
                        <p>&nbsp;</p>
                        <button type="button" onClick={this.save} className="btn btn-primary">
                            Endre data
                        </button>
                        <h4>{this.message}</h4>
                    </div>

                </div>
                <div className="col-sm-4"></div>
            </div>

        );
    }




    save() {
        if (!this.organization) {
            console.log("Returning null!");
            this.message = "Error";
            return null;
        }

        const orgdata = {
            organizationnumber: this.state.organizationnumber,
            name: this.state.name,
            tel: this.state.tel,
            email: this.state.email,
            org_id: this.props.match.params.id
        };

        let i;
        for (i=0; i < this.conns.length; i++) {
            if (this.conns[i].checked) {
                this.category_ids.push({catid: this.conns[i].catid});
            }
        }

console.log("this.conns: ", this.conns)
        console.log("this organization: ", orgdata);
        console.log("these connections: ", this.category_ids)


        orgService.updateOrgByID(orgdata)
            .then(response => {
                console.log("1st response: ", response);
                categoryService.deleteCategoryByOrgID(this.props.match.params.id)
                    .then(response => {

                        console.log("2nd response: ", response);
                        console.log("this.category_ids: " + this.category_ids);
                        categoryService.addOrgCat(this.category_ids, this.props.match.params.id)
                            .then(response => {
                                console.log("3rd response: ", response);
                            })
                            .catch((error: Error) => (this.message = error.message));
                    })
                    .catch((error: Error) => (this.message = error.message));
                history.push('/admin/bedrift')
            })
            .catch((error: Error) => (this.message = error.message));




    }
}
