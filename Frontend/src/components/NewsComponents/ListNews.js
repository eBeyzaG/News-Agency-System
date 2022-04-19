import axios from 'axios'
import React, { Component } from 'react'

import { BrowserRouter, Routes, Route, Link, Router } from 'react-router-dom'
import NewsDetails from './NewsDetails'

export default class ListNews extends Component {
    constructor(props) {
        super(props)
        this.state = {
            news: [],
            message: "",
            categories: [],
            reporters: []
        }
    }

    componentDidMount() {

        axios.get("https://localhost:44307/api/News")
            .then(response => {
                this.setState({...this.state, news: response.data, message: response.statusText })
                console.log(response)
            }).catch(e => { console.log(e); this.setState({ ...this.state, message: e.message }) })

            
        axios.get("https://localhost:44307/api/Reporters")
        .then(response => {
            this.setState({...this.state, reporters: response.data, message: response.statusText })
            console.log(response)
        }).catch(e => { console.log(e); this.setState({ ...this.state, message: e.message }) })

        
        axios.get("https://localhost:44307/api/Categories")
            .then(response => {
                this.setState({...this.state, categories: response.data, message: response.statusText })
                console.log(response)
            }).catch(e => { console.log(e); this.setState({ ...this.state, message: e.message }) })
    }


    render() {
        return (
            <div style={{textAlign: "center", margin: "auto", display: "block", maxWidth: "90%"}}>
                <h2>LIST NEWS</h2>
                <table style={{width: "100%", border: "1px solid black"}}>
                    <thead>
                        <tr >
                            <th >
                                ID
                            </th><th>
                                Title
                            </th><th>
                                Content
                            </th><th>
                                Date
                            </th>
                            <th>
                                Reporter
                            </th><th>
                                Category
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.news.map((news, ii) => {
                            for(let category of this.state.categories){
                                if (category.id == news.categoryId){
                                    news.category = category.name
                                }
                            }
                            for(let reporter of this.state.reporters){
                                if (reporter.id == news.reporterId){
                                    news.reporter = reporter.name + reporter.surname
                                }
                            }
                            return <tr id={ii}>
                                <td style={{border: "1px solid black"}}>
                                <Link to={"/News/NewsDetails/" + news.id}>{news.id}</Link><br/>
                                </td>
                                <td style={{border: "1px solid black"}}>
                                    {news.title}
                                </td >
                                <td style={{maxWidth:"200px", border: "1px solid black"}}>
                                    {news.content}
                                </td>
                                <td style={{border: "1px solid black"}}>
                                    {news.date}
                                </td>
                                <td style={{border: "1px solid black"}}>
                                    {news.reporterId} {news.reporter}
                                </td>
                                <td style={{border: "1px solid black"}}>
                                    {news.categoryId} {news.category}
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
