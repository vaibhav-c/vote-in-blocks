import React from 'react';
import './Login.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Login from '../../Components/Login Form/Login';
import Register from '../../Components/Register Form/Register';

const LoginPage = (props) => {

    if(localStorage.getItem("email") !== undefined) {
        window.location.replace("/home"); 
    }

    return (
        <div className="containerx register">
            <div className="row">
                <div className="col-md-3 register-left">
                        <img src="https://cdn1.iconfinder.com/data/icons/election-15/64/online_voting-elections-democracy-computer-512.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>Write Something About the App!</p>
                </div>
                <div className="col-md-9 register-right">
                    <Tabs defaultActiveKey="login" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="login" title="Login">
                            <Login/>
                        </Tab>
                        <Tab eventKey="register" title="Register">
                            <Register/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>				                            
    )
}

export default LoginPage;