import React, { useContext, useEffect, useState } from 'react';
import Menubar from '../../Components/Menubar/Menubar';
import {Card, Container, Button} from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import { isExpired, decodeToken } from "react-jwt";
import { Context } from '../../../Context/context';
import axios from 'axios';
import './Home.css';

const Home = (props) => {

    const context = useContext(Context);

    useEffect(() => {
        let s = window.location.href;
        if(s.indexOf("?") !== -1) {
            const token = s.split("?")[1];
            const decoded = decodeToken(token.substring(0, token.length - 1));
            console.log(decoded);
            //set user
            if(localStorage.getItem("email") === null && isExpired(token.substring(0, token.length - 1))) {
                window.location.pathname = "/";
            }
            context.setUser({id: decoded.id, email: decoded.email, dateOfBirth: decoded.dateOfBirth, name: decoded.name, aadhar: decoded.aadhar});
        } else {
            if(localStorage.getItem("email") === null) {
                window.location.pathname = "/";
            } else {
                if(window.accountId === '') {
                    console.log("login");
                    login()
                }
            }
        }
    }, []);

    const [values, setValues] = useState({
        totalElections: ['1', '2', '3', '4'],
        electionConducted: ['1'],
        ongoingElection: ['2', '3'],
        electionInvited: ['5', '6', '7', '8', '9']
    });

    useEffect(() => {
        //get all data from mongo db
        //convert to string and split and setValues
        let time = new Date().toISOString();
        let email = localStorage.getItem("email");
        axios.get(`http://localhost:5000/api/totalelection`,{
                params: {
                    email: email,
                    time: time
                }
            }).then((res)=>{
                console.log(res);
                //console.log(res.data.electionsize.toString().split(""))
                setValues({
                    ...values,
                    totalElections: res.data.electionSize.toString().split(""),
                    electionConducted: res.data.conductedSize.toString().split(""),
                    ongoingElection: res.data.live.toString().split(""),
                    electionInvited: res.data.invitedSize.toString().split("")
                })
            }).catch((err)=>{
                alert('Some Error Occurred');
            })
    }, [])

    return (
        <>
            <Menubar/>
            <Container>
                <Card style={{ width: '100%', marginTop: '30px', marginBottom: '80px', height: '100%', display: 'flex', backgroundColor: "#00111a"}}>
                    <Card.Body style = {{width: '100%'}}>
                        <Card.Img variant="top" style = {{borderRadius: '50%', overflow: 'hidden', float: 'right', height: '100px', width: '100px'}} src = 'https://store-images.s-microsoft.com/image/apps.25988.13510798883030072.52a047f9-3b10-4f05-a51b-80e15c987161.d42159fa-c6fc-4d4e-b895-e2544cc4db51' />
                        <Card.Title style = {{marginLeft: '20px'}}></Card.Title>
                        <Card.Img variant="top" style = {{overflow: 'hidden', float: 'left', height: '200px', width: '300px', marginRight: '20px'}} src='https://eci.gov.in/uploads/monthly_2018_09/eci200x200.png.0b64512a61d9374ccebae62e674b8879.png'></Card.Img>
                        <Card.Title style = {{marginLeft: '10px', marginBottom: '20px', marginTop: '30px'}}><span style = {{color: 'orange'}}>Email: {localStorage.getItem("email")}</span></Card.Title>
                        <Card.Title style = {{marginLeft: '10px', marginBottom: '20px'}}><span style = {{color: 'white'}}>Name: {localStorage.getItem("name")}</span></Card.Title>
                        <Card.Title style = {{marginLeft: '10px', marginBottom: '20px'}}><span style = {{color: 'green'}}>AADHAR No: {localStorage.getItem("aadhar")}</span></Card.Title>
                    </Card.Body>
                </Card>
            </Container>
            <div style = {{display: 'flex', marginTop: '20px'}}>
                <div className= "col">
                    <Card style={{ width: '18rem', margin: 'auto', height: '15rem', backgroundColor: '#000d1a', color: 'white'}}>
                        <Card.Body>
                            <Card.Title>Total Elections Conducted</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted" style = {{color: 'wheat'}}>Organized by Voting App</Card.Subtitle>
                            <Card.Text>
                                Elections conducted of the users, for the users and by the users.
                            </Card.Text>
                        </Card.Body>
                        <div className="numbers">
                            {
                                values.totalElections.map((c) => {
                                    return (
                                        <span className="numbers__window">
                                            <span className="numbers__window__digit numbers__window__digit--1" data-fake="8642519073">{c}</span>
                                        </span>
                                    );
                                })
                            }
                        </div>
                    </Card>
                </div>
                <div className= "col">
                    <Card style={{ width: '18rem', margin: 'auto', height: '15rem', backgroundColor: '#000d1a', color: 'white'}}>
                        <Card.Body>
                            <Card.Title>Elections You Conducted</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted" style = {{color: 'wheat'}}>Organized by You</Card.Subtitle>
                            <Card.Text>
                                You have conducted these elections. You can check them out at the conducted elections page. 
                            </Card.Text>
                        </Card.Body>
                        <div className="numbers">
                            {
                                values.electionConducted.map((c) => {
                                    return (
                                        <span className="numbers__window">
                                            <span className="numbers__window__digit numbers__window__digit--1" data-fake="8642519073">{c}</span>
                                        </span>
                                    );
                                })
                            }
                        </div>
                    </Card>
                </div>
                <div className= "col">
                    <Card style={{ width: '18rem', margin: 'auto', height: '15rem', backgroundColor: '#000d1a', color: 'white' }}>
                        <Card.Body>
                            <Card.Title>Elections Invited</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Cast your Vote</Card.Subtitle>
                            <Card.Text>
                                Cast a vote in the vote section for all the live elections you are invited for.
                            </Card.Text>
                        </Card.Body>
                        <div className="numbers">
                            {
                                values.electionInvited.map((c) => {
                                    return (
                                        <span className="numbers__window">
                                            <span className="numbers__window__digit numbers__window__digit--1" data-fake="8642519073">{c}</span>
                                        </span>
                                    );
                                })
                            }
                        </div>
                    </Card>
                </div>
                <div className= "col">
                    <Card style={{ width: '18rem', margin: 'auto', height: '15rem', backgroundColor: '#000d1a', color: 'white' }}>
                        <Card.Body>
                            <Card.Title>Ongoing Elections</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Organized by Voting App</Card.Subtitle>
                            <Card.Text>
                                These many elections are live on our app. You can also conduct one by going to conduct page.
                            </Card.Text>
                        </Card.Body>
                        <div className="numbers">
                            {
                                values.ongoingElection.map((c) => {
                                    return (
                                        <span className="numbers__window">
                                            <span className="numbers__window__digit numbers__window__digit--1" data-fake="8642519073">{c}</span>
                                        </span>
                                    );
                                })
                            }
                        </div>
                    </Card>
                </div>
            </div>
            <br/>
            {/*<Button variant="primary" style = {{margin: 'auto', marginTop: '20px', display: 'flex'}}>Conduct an Election</Button>*/}
            {/*<Carousel style = {{marginTop: '40px'}}>
                <Card>
                    <Card.Header as="h5" style={{ width: '25rem' }}>Ongoing Elections</Card.Header>
                    <Card.Body>
                        <Card.Title>Election Name</Card.Title>
                        <Card.Text>
                            Election Description
                        </Card.Text>
                        <Button variant="primary">Vote</Button>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header as="h5" style={{ width: '25rem' }}>Ongoing Elections</Card.Header>
                    <Card.Body>
                        <Card.Title>Election Name</Card.Title>
                        <Card.Text>
                            Election Description
                        </Card.Text>
                        <Button variant="primary">Vote</Button>
                    </Card.Body>
                </Card>
            </Carousel>*/}
        </>
    );
}

export default Home;