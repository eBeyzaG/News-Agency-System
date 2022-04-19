import axios from 'axios'
import React, { Component } from 'react'

export default class FindAgencyWithYear extends Component {


    constructor(props) {
        super(props)
        this.state = {
            estYear: 0,
            resultMessage: "",
            agencies: []
        }
    }

    queryAgencies = (evt) => {


        axios.get("https://localhost:44307/api/Agencies")
            .then(response => {
                for (let agency of response.data) {
                    if (agency.establishmentYear == Number(this.state.estYear)) {
                        this.setState(
                            {
                                ...this.state,
                                agencies: [...this.state.agencies, agency]
                            }
                        )
                    }
                }
                this.setState({ ...this.state, resultMessage: response.statusText })
                console.log("ags:" + this.state.agencies)
              
            }).catch(e => { console.log(e); this.setState({ ...this.state, resultMessage: e.message }) })

    }

    handleChange = (evt) => {

        this.setState(
            {
                ...this.state,
                estYear: evt.target.value
            }
        )

    }

    render() {
        return (
            <div>
                <h2>Find Agency by Year</h2>
                <input type="number" onChange={this.handleChange} />
                <button onClick={this.queryAgencies}>Search</button>

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
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.agencies.map((agency, idx) => {
                            return <tr id={idx}>
                                <td style={{ border: "1px solid black" }}>
                                    {agency.id}
                                </td>
                                <td style={{ border: "1px solid black" }}>
                                    {agency.name}
                                </td >
                                <td style={{ maxWidth: "200px", border: "1px solid black" }}>
                                    {agency.establishmentYear}
                                </td>
                            </tr>
                        })
                        }
                    </tbody></table>



                <p>{this.state.resultMessage}</p>
            </div>
        )
    }
}
