import React, { useState, useEffect } from 'react';
import Menubar from '../../Components/Menubar/Menubar';
import {Tab, Row, Col, Card} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import VoteCard from '../../Components/Vote Card/Vote Card';
import { login, logout } from "../../../utils";
import axios from 'axios';
import Election from '../../Components/Election Card/Election Result Card';
import ResultsCard from '../../Components/Result Card/Result Card';

const Result = (props) => {

    const [values, setValues] = useState({
        electionList: [],
        current: ''
    })

    if(localStorage.getItem("email") === null) {
        window.location.pathname = "/";
    } else {
        if(window.accountId === '') {
            console.log("login");
            login()
        }
    }

    let email = localStorage.getItem("email");
    let id = localStorage.getItem("id");

    const changeCurrent = (election) => {
        setValues({
            ...values,
            current: election
        });
        console.log(values);
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/votingelection`,{
                params: {
                    email: email
                }
            }).then((res)=>{
                if(res.data.success) {
                    let currentTime = new Date().toISOString();
                    let elections = res.data.conducted;
                    let finalElection = []
                    elections.map((election) =>{
                        if(election.resultsDeclared) {
                            finalElection.push(election);
                        }
                    });
                    
                    setValues({
                        ...values,
                        electionList: finalElection,
                        current: finalElection[0]
                    });
                    console.log(res.data.conducted)
                } else {
                    alert('Some Error Occurred');
                }
                
            }).catch((err)=>{
                alert(err.response.data.error);
            })
    }, []);
    
    return (
        <>
            <Menubar/>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey = "#linkinit">
                <Row style = {{marginTop: '20px'}}>
                    <Col sm={4}>
                    <ListGroup>
                        {Object.keys(values.electionList).length !== 0? (
                            values.electionList.map((election) => {
                                return (
                                    <ListGroup.Item key = {election._id} action href={"#"+election._id} onClick = {() => changeCurrent(election)}>
                                        {election.name}
                                    </ListGroup.Item>
                                )
                            })) : (
                            <ListGroup.Item key = "none" action href="#none">
                                Nothing to Show
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                    </Col>
                    <Col sm={8}>
                    <Tab.Content>
                        {Object.keys(values.electionList).length !== 0 ? <Election election = {values.current}/> : (
                            <Tab.Pane key = "none" eventKey="#none">
                                <Card style={{ width: '100%', backgroundColor: "white" }} >
                                    <Card.Body style = {{display: 'flex', width: '100%'}}>
                                        You haven't been invited to vote in any elections
                                    </Card.Body>
                                </Card>
                            </Tab.Pane>
                        )}
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
}

export default Result;