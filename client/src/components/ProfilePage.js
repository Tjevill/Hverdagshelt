// @flow
/* eslint eqeqeq: "off" */
import * as React from "react";
import { Component } from "react-simplified";
import CaseListCard from "./CaseListCard";
import ProfileCard from "./ProfileCard";

export default class ProfilePage extends Component {
    render() {
        return(
            <div className="main-background">
                <ProfileCard/>
                <CaseListCard/>
            </div>
        );
    }
}
