import axios from 'axios'
import React, { Component } from 'react'

export default class DateByTitle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            news: [],
            resultMessage: "",
            date : ""
        }
    }

    componentDidMount() {
        
        axios.get("https://localhost:44307/api/News")
            .then(response => {
                this.setState({...this.state, news: response.data, message: response.statusText })
                console.log(response)
            }).catch(e => { console.log(e); this.setState({ ...this.state, message: e.message }) })
    }

    findDate = (evt) => {

        let idx = evt.target.selectedIndex
        let news_id = evt.target.options[idx].value
        for (let n of this.state.news){
                if(n.id == news_id){
                    this.setState({
                       ...this.state,
                       date : "This news was published on " + n.date 
                    })
                }
        }
    }



    render() {
        return (
            <div>
                <h2>Date of the News</h2>
                <label>Select title of the news</label> <br/>
                <select onChange={this.findDate}>
                <option value="" selected disabled hidden>Choose Title</option>
                {this.state.news.map((n, ii) => {
                            return <option key={ii} value={n.id}>{n.title}</option>
                        })}
                </select>

                <p>{this.state.date}</p>
                
                <p>{this.state.resultMessage}</p>
            </div>
        )
    }
}
