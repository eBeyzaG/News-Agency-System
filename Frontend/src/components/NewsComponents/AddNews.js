import axios from 'axios'
import React, { Component } from 'react'

export default class AddNews extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addNews: {
                title: "",
                content: "",
                date: "",
                reporterId: 0,
                categoryId: 0,
            },
            reporters: [],
            categories: [],
            resultMessage: ""
        }
    }

    componentDidMount() {

        axios.get("https://localhost:44307/api/Reporters")
            .then(response => {
                this.setState({ ...this.state, reporters: response.data, message: response.statusText })

            }).catch(e => { console.log(e); this.setState({ ...this.state, message: e.message }) })


        axios.get("https://localhost:44307/api/Categories")
            .then(response => {
                this.setState({ ...this.state, categories: response.data, message: response.statusText })

            }).catch(e => { console.log(e); this.setState({ ...this.state, message: e.message }) })
    }

    handleChange = (evt) => {

        let { name, value } = evt.target
        this.setState(
            {
                ...this.state,
                addNews: {
                    ...this.state.addNews,
                    [name]: value
                }

            }
        )

    }

    createNews = (evt) => {

        for (const [key, value] of Object.entries(this.state.addNews)) {

            if (!value) {
                this.setState(
                    currentState =>
                        currentState.resultMessage = "Do not leave " + key + " empty"

                )
                return
            }

        }

        axios("https://localhost:44307/api/News",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                data: this.state.addNews
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
        console.log(selectedValue)
        let evtName = evt.target.name
        console.log(evtName)
        this.setState(
            {
                ...this.state,
                addNews: {
                    ...this.state.addNews,
                    [evtName]: selectedValue
                }

            }
        )

        console.log(this.state)
    }

    render() {
        return (
            <div>
                <h2>Add News</h2>
                <div>
                    <p>
                        <label>
                            Title<br />
                            <input type="text" name="title" onChange={this.handleChange}></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Content<br />
                            <textarea style={{ height: "100px", width: "200px" }} type="text" name="content" onChange={this.handleChange} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Date<br />
                            <input type="date" name="date" onChange={this.handleChange}></input>
                        </label>
                    </p>
                    <p>
                        <label>
                            Reporter ID <br />
                            <select name='reporterId' onChange={this.selectHandleChange}>
                                <option value="" selected disabled hidden>Choose Reporter</option>
                                {this.state.reporters.map((n, ii) => {
                                    return <option key={ii} value={n.id}> {n.id} {n.name} {n.surname}</option>
                                })}
                            </select> </label>
                    </p>
                    <p>
                        <label>
                            Category <br />
                            <select name='categoryId' onChange={this.selectHandleChange}>
                                <option value="" selected disabled hidden>Choose Category</option>
                                {this.state.categories.map((n, ii) => {
                                    return <option key={ii} value={n.id}> {n.id} {n.name}</option>
                                })}
                            </select>

                        </label>
                    </p>
                    <p>
                        <button onClick={this.createNews}>
                            Create News
                        </button>
                    </p>
                    <p>{this.state.resultMessage}</p>
                </div>



            </div>
        )
    }
}
