import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { BrowserRouter, Routes, Route, Link, Router } from 'react-router-dom'
class ListCategories extends Component {


    componentDidMount() {

        axios.get("https://localhost:44307/api/Categories")
            .then(response => {
                this.props.fill(response.data)
                console.log(response.data)
            }).catch(e => { console.log(e); })
    }

    render() {

        return (
            <div>
                <h2>List Categories</h2>
                <p><b>ID   NAME</b></p>
                {this.props.localCategories.categories.map((item, kk) => <p key={kk}>
                    {item.id}   {item.name}    <Link to={"/Categories/CategoryDetails/" + item.id}>Details</Link>
                </p>)}


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        localCategories: state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fill: (items) => dispatch({ type: "FILL", payload: items })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories)