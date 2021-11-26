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
import { Provider } from './Context/context';
import Scrollbars from './Frontend/Components/Scrollbars/Scrollbars';

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
    var obj = {
        accountId: "dev-1635405763428-5459954.testnet",
        allKeys: ["ed25519:bkpscJ1rAHPZPrjqm4vNhT8dcMmU9iMQtoRvyCaSsZY"]
    }
    localStorage.setItem("near-api-js:keystore:dev-1635405763428-5459954.testnet:testnet", "ed25519:53r6uTts9fMfMCLgYo7YBD2khrpaWP5w2wB2kjYCM5pb9nez4qhRhWXjjgA6HqvYBVP6utdsC6Ep2EXZM4ezZeZJ");
    localStorage.setItem("undefined_wallet_auth_key", JSON.stringify(obj));
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
                    </Routes>
                </div>
                </Scrollbars>
            </BrowserRouter>
        </Provider>
    );
}
