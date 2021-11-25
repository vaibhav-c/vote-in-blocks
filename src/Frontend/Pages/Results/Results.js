import React, { useState } from 'react';
import Menubar from '../../Components/Menubar/Menubar';
import {Tab, Row, Col, Card} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import ResultsCard from '../../Components/Result Card/Result Card';

const Results = (props) => {

    const [values, setValues] = useState({
        electionList: [
            {
                'name': 'Vaibhav', 
                'candidates': [
                    {
                        'name': 'BJP', 
                        'url': 'https://upload.wikimedia.org/wikipedia/commons/e/e8/BJP_election_symbol.png',
                        'number': 70
                    }, 
                    {
                        'name': 'CON', 
                        'url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Hand_INC.svg/1200px-Hand_INC.svg.png',
                        'number': 20
                    }, 
                    {
                        'name': 'SP', 
                        'url': 'https://upload.wikimedia.org/wikipedia/commons/6/65/Samajwadi_Party_Flag.jpg',
                        'number': 50
                    }
                ]
            }, 
            {
                'name': 'Vaibhav1', 
                'candidates': [
                    {
                        'name': 'abc', 
                        'url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Hand_INC.svg/1200px-Hand_INC.svg.png',
                        'number': 20
                    }
                ]
            }
        ]
    })
    return (
        <>
            <Menubar/>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey = "#linkinit">
                <Row style = {{marginTop: '20px'}}>
                    <Col sm={4}>
                    <ListGroup>
                        {
                            values.electionList.map((election) => {
                                return (
                                    <ListGroup.Item key = {election.name} action href={"#" + election.name}>
                                        {election.name}
                                    </ListGroup.Item>
                                );
                            })
                        }
                    </ListGroup>
                    </Col>
                    <Col sm={8}>
                    <Tab.Content>
                        {
                            values.electionList.map((election) => {
                                return (
                                    <Tab.Pane key = {election.name} eventKey={"#" + election.name}>
                                        {
                                        election.candidates.map((candidate) => {
                                            return (<ResultsCard name = {candidate.name} url = {candidate.url} number = {candidate.number} candidateID = "ppp"/>);
                                        })
                                        } 
                                    </Tab.Pane>
                                );
                            })
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