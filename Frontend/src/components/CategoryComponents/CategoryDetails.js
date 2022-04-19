import axios from 'axios'
import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />
}


class CategoryDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            category: {
            },
            resultMessage: "",
        }
    }

    componentDidMount() {

        let { id } = this.props.params

        axios.get("https://localhost:44307/api/Categories/" + id)
            .then(response => {
                this.setState({
                    category: response.data, resultMessage: response.statusText
                })

            }).catch(e => { console.log(e); this.setState({ ...this.state, resultMessage: e.message }) })
    }

    editCategory = (evt) => {
        for (const [key, value] of Object.entries(this.state.category)) {

            if (!value) {
                this.setState(
                    currentState =>
                        currentState.resultMessage = "Do not leave " + key + " empty"

                )
                return
            }

        }

        for (const [key, value] of Object.entries(this.state.category)) {

            if (!value) {
                this.setState(
                    currentState =>
                        currentState.resultMessage = "Do not leave " + key + " empty"

                )
                return
            }

        }


        axios("https://localhost:44307/api/Categories/" + this.state.category.id,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                data: this.state.category
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
                currentState.category[name] = value
            })
        )

    }
    deleteCategory = (evt) => {
        axios("https://localhost:44307/api/Categories/" + this.state.category.id,
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

                <h2>Category Details</h2>
                <div>
                    <p>
                        <label>
                            Name<br />
                            <input defaultValue={this.state.category.name} name="name" onChange={this.handleChange}></input>
                        </label>
                    </p>
                    <p>
                        <button onClick={this.editCategory}>
                            Edit Category
                        </button>
                        <button onClick={this.deleteCategory}>
                            Delete Category
                        </button>
                    </p>
                    <p>{this.state.resultMessage}</p>
                </div>

            </div>
        )
    }
}

export default withParams(CategoryDetails)