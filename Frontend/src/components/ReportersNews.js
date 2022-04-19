import axios from 'axios'
import React, { Component } from 'react'

export default class ReportersNews extends Component {

    constructor(props) {
        super(props)

        this.state = {
            displayData: [],
            resultMessage: ""
        }
    }

    componentDidMount() {

        axios.get("https://localhost:44307/api/Reporters")
            .then(response => {

                let reportersArray = response.data

                axios.get("https://localhost:44307/api/News").then(response => {

                    let newsArray = response.data
                    let resultingArray = []

                    for (let reporter of reportersArray) {

                        let reportersNews = []
                        for (let news of newsArray) {
                            if (news.reporterId == reporter.id) {
                                reportersNews.push(news.title)
                            }
                        }
                        resultingArray = [...resultingArray, { [reporter.name + " " + reporter.surname]: reportersNews }]

                    }

                    console.log(resultingArray)
                    this.setState({
                        ...this.state,
                        displayData: resultingArray
                    })





                }).catch(e => {
                    this.setState({
                        ...this.state,
                        resultMessage: e.message
                    })
                })




            }).catch(e => {
                this.setState({
                    ...this.state,
                    resultMessage: e.message
                })
            })
    }

    render() {
        return (
            <div>
                <h2>Reporter's News</h2>
                {this.state.displayData.map((element, key) => {
                    for (let [reporter, news] of Object.entries(element)) {
                        return <div key={key}>
                            <b> {reporter} </b>
                            <ol style={{ listStylePosition:"inside" }}>
                                {

                                    news.map((nnew,i) => {
                                        return <li key={i}>{nnew}</li>
                                    })
                                }</ol>
                        </div>
                    }

                }



                )}

            </div >
        )
    }
}
