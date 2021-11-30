import React, { useState, useEffect } from 'react';
import Menubar from '../../Components/Menubar/Menubar';
import {Tab, Row, Col, Card} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import VoteCard from '../../Components/Vote Card/Vote Card';
import { login, logout } from "../../../utils";
import axios from 'axios';

const Vote = (props) => {

    const [values, setValues] = useState({
        electionList: []
    })

    if(window.accountId === '') {
        console.log("login");
        login()
    }

    let email = localStorage.getItem("email");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/votingelection`,{
                params: {
                    email: email
                }
            }).then((res)=>{
                if(res.data.success) {
                    setValues({
                        ...values,
                        electionList: res.data.conducted
                    });
                    console.log(res.data.conducted)
                } else {
                    alert('Some Error Occurred');
                }
                
            }).catch((err)=>{
                console.log(err.response);
            })
    }, []);
    
    let fetched;
    let fetchedCandidates;
    let currentTime = new Date().toISOString();
    let n = 0;

    if(Object.keys(values.electionList).length !== 0) {
        fetchedCandidates = (
            values.electionList.map((election) => {
                if(currentTime.localeCompare(election.startTime) === 1 && currentTime.localeCompare(election.endTime) === -1) {
                    return (
                        <Tab.Pane key = {election.name} eventKey={"#" + election.name}>
                            {
                            election.candidateDetails.map((candidate) => {
                                return (<VoteCard name = {candidate.name} url = {candidate.url} number = {candidate.number} candidateID = "ppp"/>);
                            })
                            } 
                        </Tab.Pane>
                    );
                }
            })
        )

        fetched = (
            values.electionList.map((election) => {
                if(currentTime.localeCompare(election.startTime) === 1 && currentTime.localeCompare(election.endTime) === -1) {
                    n++;
                    return (
                        <ListGroup.Item key = {election.name} action href={"#" + election.name}>
                            {election.name}
                        </ListGroup.Item>
                    );

                }
        }));
    } else {
        fetched = (<ListGroup.Item key = "none" action href="#none">
                        Nothing to Show
                    </ListGroup.Item>)
        fetchedCandidates = (
            <Tab.Pane key = "none" eventKey="#none">
                <Card style={{ width: '100%', backgroundColor: "white" }} >
                    <Card.Body style = {{display: 'flex', width: '100%'}}>
                        You haven't been invited to vote in any elections
                    </Card.Body>
                </Card>
            </Tab.Pane>
        )
    }

    if(n === 0) {
        fetched = (<ListGroup.Item key = "none" action href="#none">
                        Nothing to Show
                    </ListGroup.Item>)
        fetchedCandidates = (
            <Tab.Pane key = "none" eventKey="#none">
                <Card style={{ width: '100%', backgroundColor: "white" }} >
                    <Card.Body style = {{display: 'flex', width: '100%'}}>
                        You haven't been invited to vote in any elections
                    </Card.Body>
                </Card>
            </Tab.Pane>
        )
    }

    
    return (
        <>
            <Menubar/>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey = "#linkinit">
                <Row style = {{marginTop: '20px'}}>
                    <Col sm={4}>
                    <ListGroup>
                        {
                            fetched
                        }
                    </ListGroup>
                    </Col>
                    <Col sm={8}>
                    <Tab.Content>
                        {
                            fetchedCandidates
                        }
                        <Tab.Pane eventKey="#linkinit">
                            <Card style={{ width: '100%' }}>
                                <Card.Body style = {{display: 'flex', width: '100%'}}>
                                    <Card.Title style = {{marginLeft: '20px'}}>Select from the list of ongoing elections and click on the Vote Button to Vote.</Card.Title>
                                </Card.Body>
                            </Card>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
}

export default Vote;