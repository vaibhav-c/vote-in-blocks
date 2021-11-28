import 'regenerator-runtime/runtime';
import React from 'react';
import './global.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Vote from './Frontend/Pages/Vote/Vote';
import Login from './Frontend/Pages/Login/Login';
import Home from './Frontend/Pages/Home/Home';
import Election from './Frontend/Pages/Election/Election';
import Results from './Frontend/Pages/Results/Results';
import Conducted from './Frontend/Pages/Conducted/Conducted';
import Details from './Frontend/Pages/Details/Details';
import { Provider } from './Context/context';
import Scrollbars from './Frontend/Components/Scrollbars/Scrollbars';

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {

    return (
        <Provider>
            <BrowserRouter>
                <Scrollbars style={{ width: '100%', height: '100vh' }}>
                <div className="App">
                    <Routes>
                    <Route exact path = "/" element = {<Login/>}/>
                    <Route exact path = "/home" element = {<Home/>}/>
                    <Route exact path = "/election" element = {<Election/>}/>
                    <Route exact path = "/vote" element = {<Vote/>}/>
                    <Route exact path = "/results" element = {<Results/>}/>
                    <Route exact path = "/conducted" element = {<Conducted/>}/>
                    <Route exact path = "/details" element = {<Details/>}/>
                    </Routes>
                </div>
                </Scrollbars>
            </BrowserRouter>
        </Provider>
    );
}
