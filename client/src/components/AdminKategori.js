import * as React from "react";
import { Component } from "react-simplified";
import {caseService, categoryService, orgService} from "../services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();



class LoadingFirkant extends Component {
    render(){
        return (
            <div className="loading-animation">
                <img className="svgfixer" src='./images/35.svg' />
            </div>
        );
    }
}


export default class AdminKategori extends Component {

    loaded = false;
    openMap = false;
    cat = {};

    province = "";


    render() {
        if(this.loaded){
            console.log("cat: ", this.cat)
            return (
                <div id="cat-page">
                    <div className="row">
                        <div className="col-sm-3">&nbsp;</div>
                        <div className="col-sm-6">
                    <div className="group btmspace-50 headerlayout">
                        <div className="one_half first"><h3>Kategorier</h3></div>
                        <div className="one_half"><button type="button" className="btn btn-primary btn-lg largebutton" onClick={() => { history.push('/admin/kategori/ny') }}>Legg til kategori</button></div>
                    </div>


                    <table className="">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Beskrivelse</th>
                            <th scope="col">&nbsp;</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.cat.map((item, i) => {
                            return(
                            <tr>
                                <th scope="row">{i+1}</th>
                                <td>{item.description}</td>
                                <td><button type="button" className="btn btn-primary" onClick={() => { history.push('/admin/kategori/rediger/' + item.category_id) }}>Rediger</button></td>
                                <td><button type="button" className="btn btn-danger" onClick ={() => this.delete(item.category_id)}>Slett</button></td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                        </div>
                        <div className="col-sm-3">&nbsp;</div>
                    </div>
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


    delete(category_id) {

        if ( window.confirm("Er du sikker på at du ønsker å slette denne kategorien?") ){
            categoryService.deleteCategoryByID(category_id)
                .then(response => {
                    console.log(response, "Slettet kategorien med ID " + category_id);
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err, "Error ved sletting");
                    alert("Noe galt skjedde under slettingen");
                });
        }
    }


    componentDidMount(){

    }


    mounted() {

        let catPromise = categoryService.getAllCategories(this.props.match.params.id);
        catPromise.then(catData => {
            console.log(catData[0]);
            this.cat = catData;
            this.loaded = true;
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
