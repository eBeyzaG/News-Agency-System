import axios from 'axios'
import React, { Component } from 'react'

export default class CreateCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: {
                name: ""
            },
            resultMessage: ""
        }
    }



    handleChange = (evt) => {

        let { name, value } = evt.target
        this.setState(
            {
                ...this.state,
                category: {
                    ...this.state.category,
                    [name]: value
                }

            }
        )

    }

    createCategory = (evt) => {

        for (const [key, value] of Object.entries(this.state.category)) {

            if (!value) {
                this.setState(
                    currentState =>
                        currentState.resultMessage = "Do not leave " + key + " empty"

                )
                return
            }

        }

        axios("https://localhost:44307/api/Categories",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                data: this.state.category
            }
        ).then(response => {
            console.log(response)
            this.setState({ ...this.state, resultMessage: "Created Successfully" })

        })
            .catch(err => {
                this.setState({ ...this.state, resultMessage: err.message })
            })
    }

    

    
    render() {
        return (
            <div>
                <h2>Add Category</h2>
                <div>
                    <p>
                        <label>
                            Category Name<br />
                            <input type="text" name="name" onChange={this.handleChange}></input>
                        </label>
                    </p>
                    <p>
                        <button onClick={this.createCategory}>
                            Create Category
                        </button>
                    </p>
                    <p>{this.state.resultMessage}</p>
                </div>



            </div>
        )
    }
}
