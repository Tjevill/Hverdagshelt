//@flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, NavLink } from "react-router-dom";
import { caseService, categoryService,userService} from "../services";
import createHashHistory from "history/createHashHistory";
import { Alert,Card, NavBar, ListGroup, Row, Column, Button, Form} from './widgets';

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
  for (var x = 1; x < array.length+1; x++) {
    result.push(x);
  }
  return result;
}

export default class IssueOverview extends Component <{ match: { params: { name: string, id: number } } }>{
  caseofCat = [];
  categories = [];
  cases = [];
  casesbyKommune= [];
  cateside  = [];
  fylker = [];
  kommuner = [];
  kommune = "";
  Meldning = "";
  categoryid = "";
  categoryname ="";

  handleChangeFylke = event =>{
    console.log("Fylke valgt: " + event.target.value);
      userService
        .getProvince(event.target.value)
        .then(response => {
            this.kommuner = response;
            console.log("kommuner: ", this.kommuner);
            this.forceUpdate();
        })
        .catch((error: Error) => Alert.danger(error.message));
  }

  handleChangeKommune = event => {
        let meldning;
        this.kommune = event.target.value;
        console.log("Kommune valgt:",this.kommune);
        console.log("Tilsvarende category_id1: ",this.categoryid);
        let id = this.categoryid;
        console.log("Tilsvarende category_id2: ",id);
        caseService
          .searchCaseByProv(event.target.value)
          .then(response => {
              this.casesbyKommune = response;
              this.cases = response;
              if(this.categoryname!=="All"){
                console.log("hahaha",response);
                this.caseofCat = response.filter(element=>
                    element.category_id == this.category_id);
              }
              console.log("new cases by kommune :",this.caseofCat);
              if(this.caseofCat.length===0){
                this.Meldning = ("Ingen sak under kategori " + this.props.match.params.name + " kommune " + this.kommune);
              }else{
                this.Meldning = ("Antall sak under kategori " + this.props.match.params.name + " kommune " +this.kommune+" er "+this.caseofCat.length);
              }
              this.forceUpdate();
          })
          .catch((error: Error) => console.log("feilfeilfeil"));
   }

   checkName(){
    if(this.kommune!==""){
      console.log("kommune er  valgt");
      caseService
        .searchCaseByProv(this.kommune)
        .then(response => {
          this.categoryname = this.props.match.params.name;
          this.category_id = this.categories.find(element=>
            element.description === this.categoryname).category_id;
          console.log("now the id is",this.category_id);
          this.caseofCat = response.filter(element=>
            element.category_id == this.category_id);
          console.log("new cases by kommune 2 :",this.caseofCat);
          if(this.caseofCat.length===0){
            this.Meldning = ("Ingen sak under kategori " + this.props.match.params.name + " kommune " + this.kommune);
          }else{
            this.Meldning = ("Antall sak under kategori " + this.props.match.params.name + " kommune " +this.kommune+" er "+this.caseofCat.length);
          }
          this.forceUpdate();
        })
        .catch((error: Error) => console.log("feilfeilfeil"));
     }else{
       console.log("kommune er ikke valgt")
       caseService
         .searchCaseByCat(this.props.match.params.name)
         .then(cases => {
             this.caseofCat = cases;
             this.categoryname = this.props.match.params.name;
             this.category_id = this.categories.find(element=>
                 element.description === this.categoryname).category_id;
             console.log("checkname :"+this.props.match.params.name+"  id:"+this.category_id+" length:"+this.caseofCat.length);
             if(this.caseofCat.length==0){
               this.Meldning = ("Ingen sak enda ");
             }else{
               this.Meldning = "Antall sak under kategori "+this.props.match.params.name+" er "+this.caseofCat.length;
             }
             this.forceUpdate();
           })
         .catch((error: Error) => Alert.danger(error.message));
     }
   }

   nullstillKommune(){
     this.kommune = "";
     this.fylker = [];
     window.location.reload();
     history.push('/Issues/'+this.props.match.params.name+'/1');
   }



  render(){
    let lists;
    let sidebuttons;
    if(this.props.match.params.name=="All"){
      /* console.log(this.props.match.params.name);*/
      this.cateside = this.cases.slice((this.props.match.params.id-1)*15,(this.props.match.params.id-1)*15+15);
      this.Meldning = ("Antall saker er "+ this.cases.length);
      lists = (
        <tbody>
        {this.cateside.map(casen =>(
          <tr>
          <th>{casen.case_id}</th>
          <td onClick={()=>history.push('/case/'+casen.case_id)}>{casen.headline}</td>
          <td>{casen.timestamp.slice(0,16).replace("T", " ")}</td>
          </tr>
        ))}
        </tbody>
      );

      sidebuttons =(
        <div>
        {(count(sliceArray(this.cases, 15))).map(sidetall => (
            <button type="button" class="btn btn-outline-dark" onClick={() => history.push('/Issues/All/'+sidetall)}>{sidetall} </button>
        ))}
        </div>
      );
      if(this.kommune!=""){
        this.Meldning = "Antall sak under kommune "+this.kommune+" er "+this.cases.length;
      }

     } else {

       lists = (
         <tbody>
         {this.caseofCat.map(casen =>(
           <tr>
           <th>{casen.case_id}</th>
           <td onClick={()=>history.push('/case/'+casen.case_id)}>{casen.headline}</td>
           <td>{casen.timestamp.slice(0,16).replace("T", " ")}</td>
           </tr>
         ))}
         </tbody>);

       sidebuttons = (
        <div>
        {(count(sliceArray(this.caseofCat, 15))).map(sidetall => (
            <button type="button" class="btn btn-outline-dark" onClick={() => history.push('/Issues/'+this.props.match.params.name+'/'+sidetall)}>{sidetall}</button>
        ))}
        </div>);
     };


    return (
    <>
      <div className="jumbotron">
        <div className="container text-center">
          <div className="btn-group" role="group" aria-label="First group">
              <a href="#/Issues/All/1" className="btn btn-primary btn-lg active" role="button" aria-pressed="true" >Alle</a>
                {this.categories.map(categori =>(
                  <a href={"#/Issues/"+categori.description+"/1"}  onClick={() =>{this.checkName()}} className="btn btn-primary btn-lg active" role="button" aria-pressed="true" >{categori.description}</a>
                ))}
          </div><br/><br/>
          <div class="form-row">
            <div class="form-group col-6">
              <label for="inputFylke">Velg Fylke</label>
                <select id="fylke" name="fylke" class="form-control" onChange={this.handleChangeFylke}>
                  <option selected>Alle </option>
                  {this.fylker.map(fylke => {
                      return(<option value={fylke.ID}>{fylke.navn}</option>)
                  })}
                </select>
            </div>
            <div class="form-group col-6">
              <label for="inputKommune">Velg Kommune</label>
                <select id="kommune" name="kommune" class="form-control" onChange={this.handleChangeKommune}>
                  <option selected>Alle </option>
                  {this.kommuner.map(kommune => {
                      return(<option value={kommune.Name}>{kommune.navn}</option>)
                  })}
                </select>
            </div>
            <div class="col align-self-center">
            <button type="button" class="btn btn-secondary" onClick={() => this.nullstillKommune()}>Nullstill kommune</button>

              </div>
          </div>
          {this.Meldning}
        </div>
      </div>


      <div className="container">
        <h2 class="display-4">Saker</h2>
        <Router history={history}>
          <table class="table table-hover">
            <thead>
              <tr >
                <th scope="col">ID</th>
                <th scope="col">Tittel</th>
                <th scope="col">Tid</th>
              </tr>
            </thead>
              {lists}
            </table>
        </Router>
      <br/><br/>
      </div>

      <div id='toolbar'>
        <div className='wrapper text-center'>
          <div class="btn-group">
            {sidebuttons}
        </div>
        </div>
      </div>
    </>
    );
  }

  componentDidMount(){
    //console.log("mounted IssuesOverview");
    caseService
      .getAllCases()
        .then(cases => {
            this.cases = cases;
            this.forceUpdate();
          })
      .catch((error: Error) => Alert.danger(error.message));

    categoryService
      .getAllCategories()
      .then(categories =>{
          this.categories = categories;
          this.forceUpdate();
        })
      .catch((error: Error) => Alert.danger(error.message));

      caseService
        .searchCaseByCat(this.props.match.params.name)
        .then(cases => {
            this.caseofCat = cases;
            this.categoryname = this.props.match.params.name;
            console.log("name :"+this.props.match.params.name);
            this.forceUpdate();
          })
        .catch((error: Error) => Alert.danger(error.message));

    userService
      .getDistricts()
      .then(fylker => {
          this.fylker = fylker;
          this.forceUpdate();
      })
      .catch((error: Error) => Alert.danger(error.message));
    };




}
