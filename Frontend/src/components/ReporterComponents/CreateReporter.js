import axios from 'axios'
import React, { Component } from 'react'

export default class CreateReporter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addReporter: {
                name : "",
                surname : "",
                agencyId : 0
            },
            agencies: [],
            resultMessage: ""
        }
    }

    componentDidMount() {

        axios.get("https://localhost:44307/api/Agencies")
            .then(response => {
                this.setState({ ...this.state, agencies: response.data, message: response.statusText })

            }).catch(e => { console.log(e); this.setState({ ...this.state, message: e.message }) })


    }

    handleChange = (evt) => {

        let { name, value } = evt.target
        this.setState(
            {
                ...this.state,
                addReporter: {
                    ...this.state.addReporter,
                    [name]: value
                }

            }
        )

    }

    createReporter = (evt) => {

        for (const [key, value] of Object.entries(this.state.addReporter)) {
            if (!value) {
                this.setState(
                    currentState =>
                        currentState.resultMessage = "Do not leave " + key + " empty"
                )
                return
            }

        }

        axios("https://localhost:44307/api/Reporters",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                data: this.state.addReporter
            }
        ).then(response => {
            console.log(response)
            this.setState({ ...this.state, resultMessage: "Created Successfully" })

        })
            .catch(err => {
                this.setState({ ...this.state, resultMessage: err.message })
            })
    }

    selectHandleChange = (evt) => {

        let idx = evt.target.selectedIndex
        let selectedValue = evt.target.options[idx].value
        let evtName = evt.target.name
        this.setState(
            {
                ...this.state,
                addReporter: {
                    ...this.state.addReporter,
                    [evtName]: selectedValue
                }

            }
        )

        console.log(this.state)
    }

    render() {
        return (
            <div>
                <h2>Add Reporter</h2>
                <div>
                    <p>
                        <label>
                            Name<br />
                            <input type="text" name="name" onChange={this.handleChange}></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Surname<br />
                            <input  type="text" name="surname" onChange={this.handleChange} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Agency  <br />
                            <select name='agencyId' onChange={this.selectHandleChange}>
                                <option value="" selected disabled hidden>Choose Agency</option>
                                {this.state.agencies.map((n, ii) => {
                                    return <option key={ii} value={n.id}> {n.id} {n.name} </option>
                                })}
                            </select> </label>
                    </p>
                   
                    <p>
                        <button onClick={this.createReporter}>
                            Create Reporter
                        </button>
                    </p>
                    <p>{this.state.resultMessage}</p>
                </div>



            </div>
        )
    }
}
