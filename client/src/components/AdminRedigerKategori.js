// @flow
/* eslint eqeqeq: "off" */

import * as React from "react";
import { Component } from "react-simplified";
import {categoryService, employeeService, orgService} from "../services";
import { userService } from "../services";

import createHashHistory from "history/createHashHistory";
const history = createHashHistory();


export default class AdminRedigerBedrift extends Component<{ match: { params: { id: number } }}> {
    category = [];
    message = " ";
    passworderror = " ";



    componentDidMount() {

        let catPromise = categoryService.getCategoryByID(this.props.match.params.id);
        catPromise.then(catData => {
            //console.log(orgData[0]);
            this.category= catData[0];
            this.setState((state, props) => ({
                category_id: this.category.category_id,
                description: this.category.description
            }));

        });
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
// console.log("this org: ", this.organization)
        return (
            <div className="row">
                <div className="col-sm-4">&nbsp; </div>
                <div className="col-sm-4">
                    <div className="NyAnsatt">
                        <h1>Rediger kategori</h1>

                        <div className="form-group">
                            Organisasjonsnummer:{" "}
                            <input
                                className="form-control"
                                type="text"
                                name="description"
                                defaultValue={this.category.description}
                                onChange={this.handleChange}
                            />
                        </div>

                        <p>&nbsp;</p>
                        <button type="button" onClick={this.save} className="btn btn-primary">
                            Endre data
                        </button>
                        <h1>{this.message}</h1>
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

        const orgdata = {
            category_id: this.state.category_id,
            description: this.state.description,
        };

        console.log("orgdata: ", orgdata)



        categoryService.updateCategoryByID(orgdata)
            .then(response => {
                console.log("1st response: ", response);
                history.push("/admin/kategori")
            })
            .catch((error: Error) => (this.message = error.message));
        }
    }
