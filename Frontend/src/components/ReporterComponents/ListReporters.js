import axios from 'axios'
import React, { Component } from 'react'

import { BrowserRouter, Routes, Route, Link, Router } from 'react-router-dom'

export default class ListReporters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reporters: [],
            message: "",
            agencies: [],
        }
    }

    componentDidMount() {

        axios.get("https://localhost:44307/api/Reporters")
            .then(response => {
                this.setState({...this.state, reporters: response.data, message: response.statusText })
                console.log(response)
            }).catch(e => { console.log(e); this.setState({ ...this.state, message: e.message }) })

            
        axios.get("https://localhost:44307/api/Agencies")
        .then(response => {
            this.setState({...this.state, agencies: response.data, message: response.statusText })
            console.log(response)
        }).catch(e => { console.log(e); this.setState({ ...this.state, message: e.message }) })

    }


    render() {
        return (
            <div style={{textAlign: "center", margin: "auto", display: "block", maxWidth: "90%"}}>
                <h2>LIST REPORTERS</h2>
                <table style={{width: "100%", border: "1px solid black"}}>
                    <thead>
                        <tr >
                            <th >
                                ID
                            </th><th>
                                Name
                            </th><th>
                                Surname
                            </th><th>
                                Agency
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reporters.map((reporter, ii) => {
                            for(let agency of this.state.agencies){
                                if (agency.id == reporter.agencyId){
                                    reporter.agency = agency.name
                                }
                            }
                            return <tr id={ii}>
                                <td style={{border: "1px solid black"}}>
                                <Link to={"/Reporters/ReporterDetails/" + reporter.id}>{reporter.id}</Link><br/>
                                </td>
                                <td style={{border: "1px solid black"}}>
                                    {reporter.name}
                                </td >
                                <td style={{maxWidth:"200px", border: "1px solid black"}}>
                                    {reporter.surname}
                                </td>
                                <td style={{border: "1px solid black"}}>
                                    {reporter.agency}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>

                <p>{this.state.message}</p>
            </div>
        )
    }
}
