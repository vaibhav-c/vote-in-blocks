import React, { useState, useEffect } from 'react';
import Menubar from '../../Components/Menubar/Menubar';
import {Tab, Row, Col, Card} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import ResultsCard from '../../Components/Result Card/Result Card';
import axios from 'axios';

const Results = (props) => {

    if(localStorage.getItem("email") === null) {
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
    let n = 0;
    if(Object.keys(values.electionList).length !== 0) {
        fetchedCandidates = (
            values.electionList.map((election) => {
                if(election.resultsDeclared) {
                    n++;
                    return (
                        <Tab.Pane key = {election.name} eventKey={"#" + election.name}>
                            {
                            election.candidateDetails.map((candidate) => {
                                return (<ResultsCard name = {candidate.name} url = {candidate.url} candidateId = {candidate._id}/>);
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
    }
    if(n == 0){
        fetched = (<ListGroup.Item key = "none" action href="#none">
                        Nothing to Show
                    </ListGroup.Item>)
        fetchedCandidates = (
            <Tab.Pane key = "none" eventKey="#none">
                <Card style={{ width: '100%', backgroundColor: "white" }} >
                    <Card.Body style = {{display: 'flex', width: '100%'}}>
                        You haven't been invited to vote in any election the results of which are declared so nothing to show
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