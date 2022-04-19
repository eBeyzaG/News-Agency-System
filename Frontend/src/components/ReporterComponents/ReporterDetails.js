import axios from 'axios'
import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />
}

class ReporterDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reporter: {
                agency: { name: "" }
            },
            resultMessage: "",
            agencies: []
        }
    }

    componentDidMount() {
        let { id } = this.props.params
        axios.get("https://localhost:44307/api/Reporters/" + id)
            .then(response => {
                this.setState({
                    reporter: {
                        ...response.data,
                        agency: "",
                    }, resultMessage: response.statusText
                })
                console.log(response.data)
                this.getAgency(response.data.agencyId)

            }).catch(e => { console.log(e); this.setState({ ...this.state, resultMessage: e.message }) })
        
            axios.get("https://localhost:44307/api/Agencies")
            .then(response => {
                this.setState({ ...this.state, agencies: response.data, message: response.statusText })

            }).catch(e => { console.log(e); this.setState({ ...this.state, message: e.message }) })




    }


    selectHandleChange = (evt) => {

        let idx = evt.target.selectedIndex
        let selectedValue = evt.target.options[idx].value
        let evtName = evt.target.name
        this.setState(
            {
                ...this.state,
                reporter: {
                    ...this.state.reporter,
                    [evtName]: selectedValue
                }

            }
        )

        console.log(this.state)
    }

    getAgency(agencyId) {
        if (!agencyId){
            this.setState({
                ...this.state,
                reporter: {
                    ...this.state.reporter,
                    agency: {
                        id: 0,
                        name: ""
                    }
                }
            })
            return
        }

        axios.get("https://localhost:44307/api/Agencies/" + agencyId)
            .then(response => {
                this.setState({
                    ...this.state,
                    reporter: {
                        ...this.state.reporter,
                        agency: response.data
                    }
                })
            }).catch(e => { console.log(e); this.setState({ ...this.state, resultMessage: e.message }) })

    }



    handleChange = (evt) => {

        let { name, value } = evt.target
        this.setState(
            (currentState => {
                currentState.reporter[name] = value
            })
        )
        console.log(this.state)
    }

    editReporter = (evt) => {
        for (const [key, value] of Object.entries(this.state.reporter)) {

            if (!value) {
                this.setState(
                    currentState =>
                        currentState.resultMessage = "Do not leave " + key + " empty"

                )
                console.log(key + " empty")
                return
            }

        }

        axios("https://localhost:44307/api/Reporters/" + this.state.reporter.id,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                data: this.state.reporter
            }
        ).then(response => {
            console.log(response)
            this.setState({ ...this.state, resultMessage: "Edited Successfully" })
        })
            .catch(err => {
                this.setState({ ...this.state, resultMessage: err.message })
            })
    }

    deleteReporter = (evt) => {
        axios("https://localhost:44307/api/Reporters/" + this.state.reporter.id,
            {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                }
            }
        ).then(response => {
            console.log(response)
            this.setState({ ...this.state, resultMessage: "Deleted Successfully" })
        })
            .catch(err => {
                this.setState({ ...this.state, resultMessage: err.message })
            })
    }


    render() {
        return (
            <div>
                <h2>Reporter Details</h2>
                <p>
                    <label><b>ID: </b> </label>
                    <input name='id' defaultValue={this.state.reporter.id} />
                </p>
                <p>
                    <label><b>Name:</b> </label>
                    <input name='name' defaultValue={this.state.reporter.name} onChange={this.handleChange} />
                </p>
                <p>
                    <label><b>Surname:</b> </label>
                    <input name='surname' defaultValue={this.state.reporter.surname} onChange={this.handleChange} />
                </p>
                <p>
                    <label>
                        <b>Agency: </b>
                        {this.state.reporter.agency.name}<br />
                        <select name='agencyId' onChange={this.selectHandleChange}>
                            <option value="" selected disabled hidden>Change Agency</option>
                            {this.state.agencies.map((n, ii) => {
                                return <option key={ii} value={n.id}> {n.id} {n.name}</option>
                            })}
                        </select> </label>
                </p>


                <button onClick={this.editReporter}>EDIT REPORTER</button>
                {'                      '}
                <button onClick={this.deleteReporter}>DELETE REPORTER</button>
                <p>{this.state.resultMessage}</p>
            </div>
        )
    }
}
export default withParams(ReporterDetails)