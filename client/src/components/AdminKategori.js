import * as React from "react";
import { Component } from "react-simplified";
import { Loading } from "./widgets";
import {caseService, categoryService, orgService} from "../services";
import createHashHistory from "history/createHashHistory";
const history = createHashHistory();



class LoadingFirkant extends Component {
    render(){
        return (
            <div className="loading-animation">
                <img className="svgfixer" src='./images/805.svg' />
            </div>
        );
    }
}


export default class AdminKategori extends Component {
    category = [];
    loaded = false;
    openMap = false;
    cat = {};
    state = {
      description:""
    };

    province = "";

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

        if(this.loaded){
            console.log("cat: ", this.cat)
            return (
                <>
                    <div className="row">
                        <div className="col-sm-3">&nbsp;</div>
                        <div className="col-sm-6">
                    <div className="group btmspace-50 headerlayout">
                        <div className="one_half first"><h3>Kategorier</h3></div>
                        <button
                          type="button"
                          className="btn btn-primary btn-lg largebutton"
                          data-toggle="modal"
                          data-target="#exampleModal"
                        >
                          Legg til ny kategori
                        </button>
                    </div>


                    <table className="">
                        <thead>
                        <tr>

                            <th scope="col">Beskrivelse</th>
                            <th scope="col">&nbsp;</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.cat.map((item, i) => {
                            return(
                            <tr>

                                <td>{item.description}</td>
                                <td><button
                                type="button"
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target={"#"+item.category_id}>Rediger</button></td>
                                <td><button type="button" className="btn btn-danger" onClick ={() => this.delete(item.category_id)}>Slett</button></td>
                                <div
                                  className="modal fade"
                                  id={item.category_id}
                                  tabIndex="-1"
                                  role="dialog"
                                  aria-labelledby="exampleModalLabel2"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title text-dark"
                                          id="exampleModalLabel"
                                        >
                                        Rediger kategori
                                        </h5>

                                        <button
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                        >
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                      </div>

                                      <div className="modal-body">
                                        <label htmlFor="Kategori-name">Ny beskrivelse på kategori</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name = "description"
                                          defaultValue = {item.description}
                                          onChange={this.handleChange}
                                          required
                                        />
                                      </div>

                                      <div className="modal-footer">
                                        <div className="float-left" />
                                        <button
                                          type="button"
                                          className="btn btn-info"
                                          data-dismiss="modal"
                                        >
                                          Lukk
                                        </button>
                                        <input
                                          className="btn btn-primary"
                                          type="button"
                                          value="Endre"
                                          onClick={() => this.endreCategory(item.category_id)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </tr>

                            );
                        })}
                        </tbody>
                    </table>
                        </div>
                        <div className="col-sm-3">&nbsp;</div>
                    </div>
                    <form>
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title text-dark"
                                id="exampleModalLabel"
                              >
                              Legg til ny kategori
                              </h5>

                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>

                            <div className="modal-body">
                              <label htmlFor="Kategori-name">Beskrivelse på kategori</label>
                              <input
                                className="form-control"
                                type="text"
                                name = "description"
                                id="Kategori-name"
                                onChange={this.handleChange}
                                required
                              />
                            </div>
                            <div className="modal-footer">
                              <div className="float-left" />
                              <button
                                type="button"
                                className="btn btn-info"
                                data-dismiss="modal"
                              >
                                Lukk
                              </button>
                              <input
                                className="btn btn-primary"
                                type="button"
                                value="Lagre"
                                onClick={() => this.addCategory()}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>

                    </>

            );
        } else {
            return (
               <Loading/>

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

    addCategory(){
      if (!this.category) {
        console.log("Returning null!");
        return null;
      }

      const catdata = {
          description: this.state.description,
      };

        console.log("this category: ", catdata);

        categoryService
            .addCategory(catdata)
            .then(response => {
                console.log("this.catdata: ", this.catdata);
                window.location.reload();
            })
            .catch(
                (error: Error) =>
                    (this.message = error.message)
            );
     }

     endreCategory(categoryid){
       if(this.state.description==""){
         return window.alert("Ingenting er endret!");
       }

       const orgdata = {
           category_id: categoryid,
           description: this.state.description,
       };
       console.log("orgdata: ", orgdata)

       categoryService.updateCategoryByID(orgdata)
           .then(response => {
               console.log("1st response: ", response);
               window.location.reload();
           })
           .catch((error: Error) => (this.message = error.message));
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
