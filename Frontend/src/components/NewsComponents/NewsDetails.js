import axios from 'axios'
import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />
}

class NewsDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            news: {
                category: { name: "" },
                reporter: { name: "" }
            },
            resultMessage: "",
            reporters: [],
            categories: []
        }
    }

    componentDidMount() {
        let { id } = this.props.params
        axios.get("https://localhost:44307/api/News/" + id)
            .then(response => {
                this.setState({
                    news: {
                        ...response.data,
                        category: "",
                        reporter: ""
                    }, resultMessage: response.statusText
                })
                this.getReporter(this.state.news.reporterId)
                this.getCategory(this.state.news.categoryId)

            }).catch(e => { console.log(e); this.setState({ ...this.state, resultMessage: e.message }) })
        axios.get("https://localhost:44307/api/Reporters")
            .then(response => {
                this.setState({ ...this.state, reporters: response.data, message: response.statusText })

            }).catch(e => { console.log(e); this.setState({ ...this.state, message: e.message }) })


        axios.get("https://localhost:44307/api/Categories")
            .then(response => {
                this.setState({ ...this.state, categories: response.data, message: response.statusText })

            }).catch(e => { console.log(e); this.setState({ ...this.state, message: e.message }) })


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
                news: {
                    ...this.state.news,
                    [evtName]: selectedValue
                }

            }
        )

        console.log(this.state)
    }

    getReporter(reporterId) {

        if(!reporterId){
            this.setState({
                ...this.state,
                news: {
                    ...this.state.news,
                    reporter: {
                        id: 0,
                        name: "",
                        surname: "",
                        agencyId : 0
                    }
                }
            })
            return
        }


        axios.get("https://localhost:44307/api/Reporters/" + reporterId)
            .then(response => {
                this.setState({
                    ...this.state,
                    news: {
                        ...this.state.news,
                        reporter: response.data
                    }
                })
            }).catch(e => { console.log(e); this.setState({ ...this.state, resultMessage: e.message }) })

    }

    getCategory(categoryId) {
        axios.get("https://localhost:44307/api/Categories/" + categoryId)
            .then(response => {
                this.setState(this.setState({
                    ...this.state,
                    news: {
                        ...this.state.news,
                        category: response.data
                    }
                }))
            }).catch(e => { console.log(e); this.setState({ ...this.state, resultMessage: e.message }) })
    }

    handleChange = (evt) => {

        let { name, value } = evt.target
        this.setState(
            (currentState => {
                currentState.news[name] = value
            })
        )
        console.log(this.state)

    }

    editNews = (evt) => {
        for (const [key, value] of Object.entries(this.state.news)) {

            if (!value) {
                this.setState(
                    currentState =>
                        currentState.resultMessage = "Do not leave " + key + " empty"

                )
                console.log(key + " empty")
                return
            }

        }

        axios("https://localhost:44307/api/News/" + this.state.news.id,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                data: this.state.news
            }
        ).then(response => {
            console.log(response)
            this.setState({ ...this.state, resultMessage: "Edited Successfully" })
        })
            .catch(err => {
                this.setState({ ...this.state, resultMessage: err.message })
            })
    }

    deleteNews = (evt) => {
        axios("https://localhost:44307/api/News/" + this.state.news.id,
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
                <h2>News Details</h2>
                <p>
                    <label><b>ID: </b> </label>
                    <input name='id' defaultValue={this.state.news.id} />
                </p>
                <p>
                    <label><b>Title:</b> </label>
                    <input name='title' defaultValue={this.state.news.title} onChange={this.handleChange} />
                </p>
                <p>
                    <label><b>Content:</b> </label>
                    <textarea name='content' defaultValue={this.state.news.content} onChange={this.handleChange} />
                </p>
                <p>
                    <label><b>Date:</b> </label>
                    <input name='date' type="date" defaultValue={this.state.news.date} onChange={this.handleChange} />
                </p>
                <p>
                    <label>
                        <b>Reporter: </b>
                        
                        {this.state.news.reporter.name + " " + this.state.news.reporter.surname}<br/>
                        <select name='reporterId' onChange={this.selectHandleChange}>
                            <option value="" selected disabled hidden>Change Reporter</option>
                            {this.state.reporters.map((n, ii) => {
                                return <option key={ii} value={n.id}> {n.id} {n.name} {n.surname}</option>
                            })}
                        </select> </label>
                </p>
                <p>
                    <label>
                        <b>Category: </b>
                        {this.state.news.category.name}
                        <br></br>
                        <select name='categoryId' onChange={this.selectHandleChange}>
                            <option value={this.state.news.category} selected disabled hidden>Change Category</option>
                            {this.state.categories.map((n, ii) => {
                                return <option key={ii} value={n.id}> {n.id} {n.name}</option>
                            })}
                        </select>

                    </label>
                </p>

                <button onClick={this.editNews}>EDIT NEWS</button>
                {'                      '}
                <button onClick={this.deleteNews}>DELETE NEWS</button>
                <p>{this.state.resultMessage}</p>
            </div>
        )
    }
}
export default withParams(NewsDetails)