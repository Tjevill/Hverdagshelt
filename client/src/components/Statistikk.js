import * as React from "react";
import { Component } from "react-simplified";
import {caseService, categoryService, orgService} from "../services";
import createHashHistory from "history/createHashHistory";
import jsPDF from 'jspdf';
import PDF, { Text, AddPage, Line, Image, Table, Html } from 'jspdf-react';
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

export default class Statistikk extends Component {

    loaded = false;
    openMap = false;
    cat = {};

    province = "";


    render() {
        const properties = { title: 'Hverdagshelt' }
        const columns = ["ID", "Navn", "Slektskap"]
        const rows = [
            [1, "Ole", "Nevø"],
            [2, "Dole", "Også nevø"],
            [3, "Skrue", "Onkel"],
        ]

            return (
                <React.Fragment>
                    <PDF
                        properties={properties}
                        preview={true}
                    >
                        <Text x={35} y={25} size={40}>Statistikk</Text>


                        <AddPage />
                        <Table
                            columns={columns}
                            rows={rows}
                        />
                        <AddPage format='a6' orientation='l' />
                        <Text x={10} y={10} color='red'>Sample</Text>
                        <Line lines={30} x={11} y={11} scale={11}/>
                        <AddPage />
                        <Html sourceById='page' />
                    </PDF>
                    <div id="page" style={{
                        visibility: "hidden",
                        width:"950px"
                    }}>
                        <h1>Source Html</h1>
                        <p>
                            <strong>lorem ipsumLorem </strong>Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and scrambled it to
                            make a type specimen book. It has survived not only five centuries, but also the
                            leap into electronic typesetting, remaining essentially unchanged. It was popularised
                            in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.
                        </p>
                    </div>
                </React.Fragment>
            );

    }


    componentDidMount(){

    }



    mounted() {

        // let catPromise = categoryService.getAllCategories(this.props.match.params.id);
        // catPromise.then(catData => {
        //     console.log(catData[0]);
        //     this.cat = catData;
        //     this.loaded = true;
        // });
    }

}

