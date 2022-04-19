import React, { Component } from 'react'
import { Provider } from 'react-redux';


import { BrowserRouter, Routes, Route, Link, Router } from 'react-router-dom'
import ListNews from '../components/NewsComponents/ListNews';
import Home from '../components/Home';
import AddNews from './NewsComponents/AddNews';
import ListCategories from './CategoryComponents/ListCategories';
import DateByTitle from './DateByTitle';
import FindAgencyWithYear from './FindAgencyWithYear';
import ReporterCountByAgency from './ReporterCountByAgency';
import CreateAgency from './AgencyComponents/CreateAgency';

import store from '../reducers/CategoryStore';
import NewsDetails from './NewsComponents/NewsDetails';
import ListAgencies from './AgencyComponents/ListAgencies';
import AgencyDetails from './AgencyComponents/AgencyDetails';
import ReportersNews from './ReportersNews';
import CreateCategory from './CategoryComponents/CreateCategory';
import CategoryDetails from './CategoryComponents/CategoryDetails';
import ListReporters from './ReporterComponents/ListReporters';
import CreateReporter from './ReporterComponents/CreateReporter';
import ReporterDetails from './ReporterComponents/ReporterDetails';

export default class MenuComponent extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/News/ListNews/*" element={<ListNews />} />
                        <Route exact path="/News/AddNews" element={<AddNews />} />
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/Categories/ListCategories" element={<Provider store={store}>
                            <ListCategories />
                        </Provider>} />
                        <Route exact path="/DateByTitle" element={ <DateByTitle/>}/>
                        <Route exact path="/FindAgencyWithYear" element= {<FindAgencyWithYear />}/>
                        <Route exact path="/ReporterCountByAgency" element = {<ReporterCountByAgency/>} />
                        <Route exact path="/Agencies/CreateAgency" element = {<CreateAgency />} />
                        <Route exact path="/News/NewsDetails/:id" element = {<NewsDetails />}/>
                        <Route exact path="/Agencies/AgencyDetails/:id" element = {<AgencyDetails />}/>
                        <Route exact path="/Categories/CategoryDetails/:id" element = {<CategoryDetails />}/>
                        <Route exact path="/Reporters/ReporterDetails/:id" element = {<ReporterDetails />}/>
                        <Route exact path="/Agencies/ListAgencies" element = {<ListAgencies/>}/>
                        <Route exact path="/ReportersNews" element={<ReportersNews />}/> 
                        <Route exact path="/Categories/CreateCategory" element={<CreateCategory />}/> 
                        <Route exact path="/Reporters/ListReporters" element={<ListReporters />}/> 
                        
                        <Route exact path="/Reporters/CreateReporter" element={<CreateReporter />}/>
                    </Routes>
                    <Link to="/">Home</Link><br/><br/>
                    <Link to="/News/ListNews">List News</Link>
                    <br/>
                    <Link to="/News/AddNews">Add News</Link><br/><br/>
                    <Link to="/Agencies/ListAgencies">List Agencies</Link><br/>
                    <Link to="/Agencies/CreateAgency">Add Agency</Link><br/><br/>
                    
                    <Link to="/Categories/ListCategories">List Categories</Link><br/>
                    <Link to="/Categories/CreateCategory">Add Category</Link>
                    <br/><br/>

                    <Link to="/Reporters/ListReporters">List Reporters</Link><br/>
                    <Link to="/Reporters/CreateReporter">Add Reporter</Link><br/><br/>

                    <Link to="/DateByTitle">Find Date by Title</Link><br/>
                    <Link to="/FindAgencyWithYear">Find Agencies with Year</Link><br/>
                    <Link to="/ReporterCountByAgency">Reporter Count per Agency</Link><br/>
                    <Link to="/ReportersNews">News of Reporter</Link>
                    

                </BrowserRouter>
            </div>

        )
    }
}
