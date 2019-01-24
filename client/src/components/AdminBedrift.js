import * as React from "react";
import { Component } from "react-simplified";
import {caseService, orgService} from "../services";
import createHashHistory from "history/createHashHistory";
import {LoadingFirkant} from './widgets';

const history = createHashHistory();



export default class AdminBedrift extends Component {
    orgbackup= [];
    loaded = false;
    openMap = false;
    org =  [];

    province = "";


    render() {
        if(this.loaded){
            console.log("org: ", this.org)
            return (
                <div id="org-page">

                    <div className="group btmspace-50 headerlayout">
                        <div className="one_half first"><h3>Bedrifter og organisasjoner</h3></div>
                        <div className="one_half"><button type="button" className="btn btn-primary btn-lg largebutton" onClick={() => { history.push('/admin/bedrift/ny') }}>Legg til bedrift</button></div>
                    </div>

                    <table className="">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Org. nummer</th>
                            <th scope="col">Navn</th>
                            <th scope="col">Telefon</th>
                            <th scope="col">Email</th>
                            <th scope="col" colSpan="2">
                                      <input
                                          id="searchbar"
                                          type="text"
                                          onChange={event => this.search(event)}
                                      />


                                      {" "}
                                  </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.org.map((item, i) => {
                            return(
                            <tr key={i}>
                                <th scope="row">{i+1} - {item.org_id}</th>
                                <td>{item.organizationnumber}</td>
                                <td>{item.name}</td>
                                <td>{item.tel}</td>
                                <td>{item.email}</td>
                                <td><button type="button" className="btn btn-primary" onClick={() => { history.push('/admin/bedrift/rediger/' + item.org_id) }}>Rediger</button></td>
                                <td><button type="button" className="btn btn-danger" onClick ={() => this.delete(item.org_id)}>Slett</button></td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div className="group btmspace-50 demo">
                    <div className="one_third first">&nbsp;</div>
                    <div className="one_third centered padded"><LoadingFirkant /></div>
                    <div className="one_third">&nbsp;</div>
                </div>

            );
        }
    }


    delete(org_id) {


        if ( window.confirm("Er du sikker på at du ønsker å slette denne bedriten?") ){
            orgService.deleteOrgByID(org_id)
                .then(response => {
                    console.log(response, "Slettet organisasjon");
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err, "Error ved sletting");
                });
        }
    }

    search(event) {
    console.log(event.target.value);
    this.org = this.orgbackup.filter(function(value){
        return value.name.toLowerCase().indexOf(event.target.value.toLowerCase())!=(-1);
    });
    this.forceUpdate();
  }


    componentDidMount(){

    }


    mounted() {

        let orgPromise = orgService.getAllOrg(this.props.match.params.id);
        orgPromise.then(orgData => {
            //console.log(orgData[0]);
            this.org = orgData;
            this.loaded = true;
            this.orgbackup=orgData;
        });
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
