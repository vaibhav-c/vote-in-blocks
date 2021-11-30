import React, { useContext, useEffect } from 'react';
import Menubar from '../../Components/Menubar/Menubar';
import {Card, Container, Button} from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import { isExpired, decodeToken } from "react-jwt";
import { Context } from '../../../Context/context';
import './Home.css';

const Home = (props) => {

    const context = useContext(Context);
    

    useEffect(() => {
        let s = window.location.href;
        if(s.indexOf("?") !== -1) {
            const token = s.split("?")[1];
            const decoded = decodeToken(token.substring(0, token.length - 1));
            //console.log(decoded);
            //set user
            if(localStorage.getItem("email") === undefined && isExpired(token.substring(0, token.length - 1))) {
                window.location.href = "/";
            }
            context.setUser({email: decoded.email, dateOfBirth: decoded.dateOfBirth, name: decoded.name, aadhar: decoded.aadhar});
        }
    }, []);


    let ongoingElection = 0;
    let votedElection = 0;
    let electionConducted = 0;
    useEffect(() => {
        
    }, []);

    return (
        <>
            <Menubar/>
            <Container>
                <Card style={{ width: '100%', marginTop: '30px', marginBottom: '80px', height: '100%', display: 'flex', backgroundColor: "black"}}>
                    <Card.Body style = {{width: '100%'}}>
                        <Card.Img variant="top" style = {{borderRadius: '50%', overflow: 'hidden', float: 'right', height: '100px', width: '100px'}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL8c4Os_HcIVhcyJZno7LiC6YXxR5fHTlcEAcTffa7-vQqVoMv3g7t_DsQ8i2qmEIoU3M&usqp=CAU' />
                        <Card.Title style = {{marginLeft: '20px'}}></Card.Title>
                        <Card.Img variant="top" style = {{overflow: 'hidden', float: 'left', height: '200px', width: '300px', marginRight: '20px'}} src='https://images1.livehindustan.com/uploadimage/library/2021/07/02/16_9/16_9_6/aadhar_card__1625226505.jpg'></Card.Img>
                        <Card.Title style = {{marginLeft: '10px', marginBottom: '20px', marginTop: '30px'}}><span style = {{color: 'orange'}}>Email: {localStorage.getItem("email")}</span></Card.Title>
                        <Card.Title style = {{marginLeft: '10px', marginBottom: '20px'}}><span style = {{color: 'white'}}>Name: {localStorage.getItem("name")}</span></Card.Title>
                        <Card.Title style = {{marginLeft: '10px', marginBottom: '20px'}}><span style = {{color: 'green'}}>AADHAR No: {localStorage.getItem("aadhar")}</span></Card.Title>
                    </Card.Body>
                </Card>
            </Container>
            <div style = {{display: 'flex', marginTop: '20px'}}>
                <div className= "col">
                    <Card style={{ width: '18rem', margin: 'auto', backgroundColor: 'darkblue', color: 'white'}}>
                        <Card.Body>
                            <Card.Title>Elections Conducted</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted" style = {{color: 'wheat'}}>Organizer</Card.Subtitle>
                            <Card.Text>
                                You have conducted these elections using the app.
                            </Card.Text>
                        </Card.Body>
                        <div className="numbers">
                            <span className="numbers__window">
                                <span className="numbers__window__digit numbers__window__digit--1" data-fake="8642519073">{electionConducted / 100}</span>
                            </span>
                            <span className="numbers__window">
                                <span className="numbers__window__digit numbers__window__digit--2" data-fake="5207186394">{(electionConducted % 100) / 10}</span>
                            </span>
                            <span className="numbers__window">
                                <span className="numbers__window__digit numbers__window__digit--3" data-fake="8395216407">{electionConducted % 10}</span>
                            </span>
                        </div>
                    </Card>
                </div>
                <div className= "col">
                    <Card style={{ width: '18rem', margin: 'auto', backgroundColor: 'darkblue', color: 'white' }}>
                        <Card.Body>
                            <Card.Title>Elections Voted</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">You've Voted</Card.Subtitle>
                            <Card.Text>
                                You have voted in these elections. You can't vote again.
                            </Card.Text>
                        </Card.Body>
                        <div className="numbers">
                            <span className="numbers__window">
                                <span className="numbers__window__digit numbers__window__digit--1" data-fake="8642519073">{votedElection / 100}</span>
                            </span>
                            <span className="numbers__window">
                                <span className="numbers__window__digit numbers__window__digit--2" data-fake="5207186394">{(votedElection % 100) / 10}</span>
                            </span>
                            <span className="numbers__window">
                                <span className="numbers__window__digit numbers__window__digit--3" data-fake="8395216407">{votedElection % 10}</span>
                            </span>
                        </div>
                    </Card>
                </div>
                <div className= "col">
                    <Card style={{ width: '18rem', margin: 'auto', backgroundColor: 'darkblue', color: 'white' }}>
                        <Card.Body>
                            <Card.Title>Ongoing Elections</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">You're Invited</Card.Subtitle>
                            <Card.Text>
                                Vote in the given elections where you are invited to vote.
                            </Card.Text>
                        </Card.Body>
                        <div className="numbers">
                            <span className="numbers__window">
                                <span className="numbers__window__digit numbers__window__digit--1" data-fake="8642519073">{ongoingElection / 100}</span>
                            </span>
                            <span className="numbers__window">
                                <span className="numbers__window__digit numbers__window__digit--2" data-fake="5207186394">{(ongoingElection % 100) / 10}</span>
                            </span>
                            <span className="numbers__window">
                                <span className="numbers__window__digit numbers__window__digit--3" data-fake="8395216407">{ongoingElection % 10}</span>
                            </span>
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