import axios from 'axios'
import React, { Component } from 'react'

import { BrowserRouter, Routes, Route, Link, Router } from 'react-router-dom'
export default class ListAgencies extends Component {

    constructor(props) {
        super(props)
        this.state = {
            agencies: [],
            message: "",
            categories: [],
            reporters: [],
            editedAgency: {
            }
        }
    }
    componentDidMount() {

        axios.get("https://localhost:44307/api/Agencies")
            .then(response => {
                this.setState({ ...this.state, agencies: response.data, message: response.statusText })
                console.log(response)
            }).catch(e => { console.log(e); this.setState({ ...this.state, message: e.message }) })
    }

   
    

    render() {
        return (
            <div style={{ textAlign: "center", margin: "auto", display: "block", maxWidth: "90%" }}>
                <h2>LIST AGENCIES</h2>
                <table style={{ width: "100%", border: "1px solid black" }}>
                    <thead>
                        <tr >
                            <th >
                                ID
                            </th><th>
                                Name
                            </th><th>
                                Establishment Year
                            </th>
                            <th>
                                Details
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.agencies.map((agency, ii) => {

                            return <tr id={ii}>
                                <td style={{ border: "1px solid black" }}>
                                    {agency.id}

                                </td>
                                <td style={{ border: "1px solid black" }}>
                                    {agency.name} 
                                </td >
                                <td style={{ maxWidth: "200px", border: "1px solid black" }}>
                                 { agency.establishmentYear} 

                                </td>
                                <td>
                                <Link to={"/Agencies/AgencyDetails/" + agency.id}>Details</Link>
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
