//@flow

import * as React from "react";
import { Component } from "react-simplified";
import "../style.css";
import CaseListCard from "./CaseListCard";
import ProfileCard from "./ProfileCard";

export default class ProfileContainer extends Component {
    render() {
        return(
            <div class="main-background">
                <ProfileCard/>
                <CaseListCard/>
            </div>
        );
    }
}
