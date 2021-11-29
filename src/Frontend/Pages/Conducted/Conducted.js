import React, { useState } from 'react';
import Menubar from '../../Components/Menubar/Menubar';
import {Tab, Row, Col, Form, Button, Container} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import ConductedCard from '../../Components/Conducted Card/Conducted Card';

const Vote = (props) => {

    if(localStorage.getItem("email") === undefined) {
        window.location.pathname = "/";
    } else {
        if(window.accountId === '') {
            console.log("login");
            login()
        }
    }

    const [values, setValues] = useState({
        electionList: [
            {
                'name': 'Vaibhav', 
                'status': 'Ongoing',
                'declared': false,
                'candidates': [
                    {
                        'name': 'BJP', 
                        'url': 'https://upload.wikimedia.org/wikipedia/commons/e/e8/BJP_election_symbol.png'
                    }, 
                    {
                        'name': 'CON', 
                        'url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Hand_INC.svg/1200px-Hand_INC.svg.png'
                    }, 
                    {
                        'name': 'SP', 
                        'url': 'https://upload.wikimedia.org/wikipedia/commons/6/65/Samajwadi_Party_Flag.jpg'
                    }
                ]
            }, 
            {
                'name': 'Vaibhav1',
                'status': 'Finished', 
                'declared': true,
                'candidates': [
                    {
                        'name': 'abc', 
                        'url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Hand_INC.svg/1200px-Hand_INC.svg.png'
                    }
                ]
            }
        ]
    })
    return (
        <>
            <Menubar/>
            <Container>
                <Tab.Container id="list-group-tabs-example" defaultActiveKey = "#">
                    <Row style = {{marginTop: '20px'}}>
                        <Col sm={12}>
                        <Tab.Content>
                            {
                                values.electionList.map((election) => {
                                    return (
                                        
                                        <Tab.Pane style = {{marginBottom: '15px'}} key = {election.name} eventKey="#">
                                            <ConductedCard name = {election.name} declared = {props.declared} candidateID = "ppp" status = {election.status}/>
                                        </Tab.Pane>
                                    );
                                })
                            }
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </>
    );
}

export default Vote;