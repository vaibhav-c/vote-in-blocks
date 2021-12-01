import React, { useState, useEffect } from 'react';
import Menubar from '../../Components/Menubar/Menubar';
import {Tab, Row, Col, Card} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import ResultsCard from '../../Components/Result Card/Result Card';
import axios from 'axios';

const Results = (props) => {

    if(localStorage.getItem("email") === undefined) {
        window.location.pathname = "/";
    } else {
        if(window.accountId === '') {
            console.log("login");
            login()
        }
    }

    let email = localStorage.getItem("email");

    const [values, setValues] = useState({
        electionList: []
    })

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
    if(Object.keys(values.electionList).length !== 0) {
        fetchedCandidates = (
            values.electionList.map((election) => {
                if(election.resultsDeclared) {
                    return (
                        <Tab.Pane key = {election.name} eventKey={"#" + election.name}>
                            {
                            election.candidateDetails.map((candidate) => {
                                return (<ResultsCard name = {candidate.name} url = {candidate.url} number = {candidate.number} candidateID = "ppp"/>);
                            })
                            } 
                        </Tab.Pane>
                    );
                }
            })
        )

        fetched = (
            values.electionList.map((election) => {
                if(election.resultsDeclared) {
                    return (
                        <ListGroup.Item key = {election.name} action href={"#" + election.name}>
                            {election.name}
                        </ListGroup.Item>
                    );
                }
        }));
    } else {
        fetched = <></>
        fetchedCandidates = <></>
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
                                    <Card.Title style = {{marginLeft: '20px'}}>Select from the list of finished elections and check the result.</Card.Title>
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

export default Results;