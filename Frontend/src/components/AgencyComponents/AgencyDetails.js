import axios from 'axios'
import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />
}


class AgencyDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            agency: {
            },
            resultMessage: "",
        }
    }

    componentDidMount() {

        let { id } = this.props.params

        axios.get("https://localhost:44307/api/Agencies/" + id)
            .then(response => {
                this.setState({
                    agency: response.data, resultMessage: response.statusText
                })

            }).catch(e => { console.log(e); this.setState({ ...this.state, resultMessage: e.message }) })
    }

    editAgency = (evt) => {

        for (const [key, value] of Object.entries(this.state.category)) {

            if (!value) {
                this.setState(
                    currentState =>
                        currentState.resultMessage = "Do not leave " + key + " empty"

                )
                return
            }

        }

        console.log(this.state.editedAgency)
        axios("https://localhost:44307/api/Agencies/" + this.state.agency.id,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                data: this.state.agency
            }
        ).then(response => {
            console.log(response)
            this.setState({ ...this.state, resultMessage: "Edited Successfully" })
        })
            .catch(err => {
                this.setState({ ...this.state, resultMessage: err.message })
            })
    }

    handleChange = (evt) => {

        let { name, value } = evt.target
        this.setState(
            (currentState => {
                currentState.agency[name] = value
            })
        )
        console.log(this.state)

    }
    deleteAgency = (evt) => {
        axios("https://localhost:44307/api/Agencies/" + this.state.agency.id,
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

                <h2>Agency Details</h2>
                <div>
                    <p>
                        <label>
                            Name<br />
                            <input defaultValue={this.state.agency.name} type="text" name="name" onChange={this.handleChange}></input>
                        </label>
                    </p>

                    <p>
                        <label>
                            Establishment Year <br />
                            <input defaultValue={this.state.agency.establishmentYear} type="number" name="establishmentYear" onChange={this.handleChange}></input>
                        </label>
                    </p>
                    <p>
                        <button onClick={this.editAgency}>
                            Edit Agency
                        </button>
                        <button onClick={this.deleteAgency}>
                            Delete Agency
                        </button>
                    </p>
                    <p>{this.state.resultMessage}</p>
                </div>

            </div>
        )
    }
}

export default withParams(AgencyDetails)